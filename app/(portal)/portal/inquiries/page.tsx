import CollectionManager from '@/components/portal/CollectionManager';
import { collections } from '@/lib/portal';

export default function Page() {
  return <CollectionManager config={collections.inquiries} />;
}
