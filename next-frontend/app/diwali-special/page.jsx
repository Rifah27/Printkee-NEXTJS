import Link from 'next/link';

export default function DiwaliPage() {
  return (
    <section className="container py-20">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.22em] text-brand-600">Diwali Special</p>
          <h1 className="mt-4 text-4xl font-semibold text-slate-900">Festival-ready branding that delivers impact.</h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">Launch your seasonal campaigns with premium prints, gift sets, and limited-edition merchandise through a refined storefront experience.</p>
          <Link href="/contact" className="mt-8 inline-flex rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700">Request a festival quote</Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="card p-8">
            <p className="text-3xl font-semibold text-slate-900">Custom gifts</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">Branded drinkware, apparel, and office gifts ready for your Diwali collection.</p>
          </div>
          <div className="card p-8">
            <p className="text-3xl font-semibold text-slate-900">Fast delivery</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">Align with campaign timelines using the same backend stock and order inquiries.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
