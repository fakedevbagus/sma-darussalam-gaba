/** Skeleton loading halus saat navigasi route */
export default function Loading() {
  return (
    <div className="min-h-[70vh] max-w-[1280px] mx-auto px-6 pt-40 pb-16" aria-busy="true" aria-label="Memuat halaman">
      <div className="animate-pulse space-y-8">
        <div className="h-4 w-40 rounded-full bg-primary-100/80" />
        <div className="h-10 w-3/4 max-w-xl rounded-2xl bg-primary-100/80" />
        <div className="h-4 w-2/3 max-w-lg rounded-full bg-slate-200/70" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {[0, 1, 2, 3, 4, 5].map(i => (
            <div key={i} className="rounded-[28px] bg-white border border-[#ece4d4] p-6 shadow-card">
              <div className="h-28 rounded-2xl bg-gradient-to-br from-primary-50 to-softblue" />
              <div className="h-4 w-3/4 rounded-full bg-slate-200/80 mt-4" />
              <div className="h-3 w-1/2 rounded-full bg-slate-100 mt-2.5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}