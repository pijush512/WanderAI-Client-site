export default function SkeletonLoader() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4 animate-pulse">
      <div className="h-48 bg-slate-200 dark:bg-slate-800 rounded-2xl w-full"></div>
      <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-md w-3/4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-slate-100 dark:bg-slate-900 rounded w-full"></div>
        <div className="h-4 bg-slate-100 dark:bg-slate-900 rounded w-5/6"></div>
        <div className="h-4 bg-slate-100 dark:bg-slate-900 rounded w-4/6"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
        ))}
      </div>
    </div>
  );
}