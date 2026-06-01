import { Suspense } from 'react';
import SearchContent from './SearchContent';

export const dynamic = 'force-dynamic';

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="container py-20 text-center text-slate-600">Loading search results…</div>}>
      <SearchContent />
    </Suspense>
  );
}
