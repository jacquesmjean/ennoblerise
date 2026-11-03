import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

export type BlogPostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readMinutes: number;
};

export type BlogPost = BlogPostMeta & {
  author: string;
  heroImage?: string;
  body: string;
};

/**
 * Posts live in Mission Control. A post published there appears here within
 * the revalidation window, with no deploy. The JSON files under content/blog
 * remain as the fallback and the seed, so the site still renders if the
 * database is unreachable at build time.
 */
const blogDir = path.join(process.cwd(), 'content', 'blog');

function readIndexFile(): BlogPostMeta[] {
  try {
    return JSON.parse(fs.readFileSync(path.join(blogDir, 'index.json'), 'utf-8')) as BlogPostMeta[];
  } catch {
    return [];
  }
}

function readPostFile(slug: string): BlogPost | null {
  const file = path.join(blogDir, `${slug}.json`);
  if (!/^[a-z0-9-]+$/.test(slug) || !fs.existsSync(file)) return null;
  try {
    return JSON.parse(fs.readFileSync(file, 'utf-8')) as BlogPost;
  } catch {
    return null;
  }
}

type PublicRow = {
  slug: string;
  title: string;
  excerpt: string | null;
  category: string | null;
  author: string | null;
  hero_image: string | null;
  body: string | null;
  date: string;
  read_minutes: number | null;
  language: string | null;
};

function db() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

function fromRow(r: PublicRow): BlogPost {
  return {
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt ?? '',
    category: r.category ?? 'Insights',
    date: r.date,
    readMinutes: r.read_minutes ?? 5,
    author: r.author ?? '',
    heroImage: r.hero_image ?? undefined,
    body: r.body ?? '',
  };
}

async function fetchPublished(language = 'en'): Promise<BlogPost[]> {
  const client = db();
  if (!client) return [];
  try {
    const { data, error } = await client
      .from('blog_posts_public')
      .select('slug,title,excerpt,category,author,hero_image,body,date,read_minutes,language')
      .eq('language', language)
      .order('date', { ascending: false })
      .limit(200);
    if (error || !data) return [];
    return (data as PublicRow[]).map(fromRow);
  } catch {
    return [];
  }
}

/** Newest first. Database wins over the file with the same slug. */
export async function getAllPosts(language = 'en'): Promise<BlogPostMeta[]> {
  const live = await fetchPublished(language);
  const seen = new Set(live.map((p) => p.slug));
  const files = readIndexFile().filter((p) => !seen.has(p.slug));
  const all = [...live.map(({ slug, title, excerpt, category, date, readMinutes }) => ({ slug, title, excerpt, category, date, readMinutes })), ...files];
  return all.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export async function getPost(slug: string, language = 'en'): Promise<BlogPost | null> {
  const client = db();
  if (client && /^[a-z0-9-]+$/.test(slug)) {
    try {
      const { data } = await client
        .from('blog_posts_public')
        .select('slug,title,excerpt,category,author,hero_image,body,date,read_minutes,language')
        .eq('slug', slug)
        .eq('language', language)
        .maybeSingle();
      if (data) return fromRow(data as PublicRow);
    } catch {
      /* fall through to the file */
    }
  }
  return readPostFile(slug);
}

/** Minimal, dependency-free markdown → HTML for our trusted, self-authored content. */
export function markdownToHtml(md: string): string {
  const esc = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const inline = (s: string) =>
    s
      .replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, '<img src="$2" alt="$1" loading="lazy" />')
      .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
      .replace(/\*\*\*([^*]+)\*\*\*/g, '<strong><em>$1</em></strong>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(/_([^_]+)_/g, '<em>$1</em>');

  const blocks = md.replace(/\r\n/g, '\n').split(/\n{2,}/);
  const html = blocks
    .map((block) => {
      const b = block.trim();
      if (!b) return '';
      if (b.startsWith('### ')) return `<h3>${inline(esc(b.slice(4)))}</h3>`;
      if (b.startsWith('## ')) return `<h2>${inline(esc(b.slice(3)))}</h2>`;
      if (b.startsWith('# ')) return `<h2>${inline(esc(b.slice(2)))}</h2>`;
      if (b.startsWith('> '))
        return `<blockquote>${inline(esc(b.replace(/^> ?/gm, '')))}</blockquote>`;
      if (/^[-*•✅] /m.test(b)) {
        const items = b
          .split('\n')
          .filter((l) => /^[-*•✅] /.test(l.trim()))
          .map((l) => `<li>${inline(esc(l.trim().replace(/^[-*•✅] /, '')))}</li>`)
          .join('');
        if (items) return `<ul>${items}</ul>`;
      }
      if (/^\d+\. /m.test(b)) {
        const items = b
          .split('\n')
          .filter((l) => /^\d+\. /.test(l.trim()))
          .map((l) => `<li>${inline(esc(l.trim().replace(/^\d+\. /, '')))}</li>`)
          .join('');
        if (items) return `<ol>${items}</ol>`;
      }
      return `<p>${inline(esc(b)).replace(/\n/g, '<br/>')}</p>`;
    })
    .join('\n');

  return html;
}
