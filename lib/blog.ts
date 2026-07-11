import fs from 'fs';
import path from 'path';

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

const blogDir = path.join(process.cwd(), 'content', 'blog');

export function getAllPosts(): BlogPostMeta[] {
  const index = JSON.parse(
    fs.readFileSync(path.join(blogDir, 'index.json'), 'utf-8')
  ) as BlogPostMeta[];
  return index;
}

export function getPost(slug: string): BlogPost | null {
  const file = path.join(blogDir, `${slug}.json`);
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, 'utf-8')) as BlogPost;
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
