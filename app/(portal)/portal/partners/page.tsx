import CollectionManager from '@/components/portal/CollectionManager';
import { collections } from '@/lib/portal';

export default function Page() {
  return (
    <div className="space-y-14">
      <CollectionManager config={collections.partners} />
      <CollectionManager config={collections.chapters} />
    </div>
  );
}
