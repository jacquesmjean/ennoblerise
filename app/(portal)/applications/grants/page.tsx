import CollectionManager from '@/components/applications/CollectionManager';
import GrantWriter from '@/components/applications/GrantWriter';
import { collections } from '@/lib/applications';

export default function Page() {
  return <CollectionManager config={collections.grants} extra={<GrantWriter />} />;
}
