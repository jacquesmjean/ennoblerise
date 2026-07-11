import CollectionManager from '@/components/portal/CollectionManager';
import ContractGenerator from '@/components/portal/ContractGenerator';
import { collections } from '@/lib/portal';

export default function Page() {
  return <CollectionManager config={collections.contracts} extra={<ContractGenerator />} />;
}
