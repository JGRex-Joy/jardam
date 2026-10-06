export default function Rows({ rows, dashed = false }) {
  return (
    <dl className="mt-3">
      {rows.map(([k, v]) => (
        <div key={k} className={`flex justify-between gap-3 py-1.5 border-b ${dashed ? "border-dashed border-gray-300" : "border-gray-200"}`}>
          <dt className="text-gray-500">{k}</dt><dd className="font-semibold text-right break-words">{v}</dd>
        </div>
      ))}
    </dl>
  );
}
