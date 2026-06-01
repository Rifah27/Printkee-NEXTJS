import ProductGrid from '../../components/ProductGrid';

export default function SearchContent({ initialResults = [], query = '', category = '' }) {
  const results = initialResults;

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
