export const Spinner = () => (
  <div className="py-24 flex justify-center" role="status">
    <div className="h-8 w-8 rounded-full border-4 border-jd-50 border-t-jd animate-spin" />
  </div>
);
export const CardSkeletons = ({ n = 6 }) => (
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: n }, (_, i) => <div key={i} className="h-[26rem] rounded-3xl bg-white animate-pulse" />)}
  </div>
);
