import CollectionManager from '@/components/portal/CollectionManager';
import GrantWriter from '@/components/portal/GrantWriter';
import { collections } from '@/lib/portal';

export default function Page() {
  return <CollectionManager config={collections.grants} extra={<GrantWriter />} />;
}
