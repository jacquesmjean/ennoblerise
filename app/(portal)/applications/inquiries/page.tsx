import CollectionManager from '@/components/applications/CollectionManager';
import { collections } from '@/lib/applications';

export default function Page() {
  return <CollectionManager config={collections.inquiries} />;
}
