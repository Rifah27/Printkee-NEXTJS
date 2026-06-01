"use client";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { api } from '../../lib/api';
import ProductGrid from '../../components/ProductGrid';

export default function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const category = searchParams.get('cat') || '';
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!query && !category) return;

    const params = { search: query };
    if (category) params.category = category;

    api
      .get('/product/all', { params })
      .then((res) => setResults(res.data.items || []))
      .catch((err) => {
        console.error('Search API error:', err);
        setResults([]);
      });
  }, [query, category]);

  return (
    <section className="container py-20">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.22em] text-brand-600">Search</p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-900">Search results</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">Showing products and categories matching your query.</p>
      </div>
      {results.length ? (
        <ProductGrid products={results} />
      ) : (
        <p className="text-slate-600">No results found for {query || category ? `${query || category}` : 'your search'}.</p>
      )}
    </section>
  );
}
