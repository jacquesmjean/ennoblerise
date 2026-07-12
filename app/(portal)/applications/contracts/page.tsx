import CollectionManager from '@/components/applications/CollectionManager';
import ContractGenerator from '@/components/applications/ContractGenerator';
import { collections } from '@/lib/applications';

export default function Page() {
  return <CollectionManager config={collections.contracts} extra={<ContractGenerator />} />;
}
