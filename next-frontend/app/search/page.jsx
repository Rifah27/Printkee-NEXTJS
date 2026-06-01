import { Suspense } from 'react';
import SearchContent from './SearchContent';

export const dynamic = 'force-dynamic';

export default async function SearchPage({ searchParams }) {
  const query = searchParams?.q || '';
  const category = searchParams?.cat || '';
  
  let results = [];
  
  if (query || category) {
    const params = new URLSearchParams();
    if (query) params.append('q', query);
    if (category) params.append('cat', category);
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5030/api'}/search?${params.toString()}`);
      if (res.ok) {
        results = await res.json();
      }
    } catch (err) {
      console.error("Search API error:", err);
    }
  }

  return (
    <Suspense fallback={<div className="container py-20 text-center text-slate-600">Loading search results…</div>}>
      <SearchContent initialResults={results} query={query} category={category} />
    </Suspense>
  );
}
