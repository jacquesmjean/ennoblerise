import CollectionManager from '@/components/applications/CollectionManager';
import { collections } from '@/lib/applications';

export default function Page() {
  return (
    <div className="space-y-14">
      <CollectionManager config={collections.partners} />
      <CollectionManager config={collections.chapters} />
    </div>
  );
}
