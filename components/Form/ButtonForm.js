export default function ButtonForm({ name, type }) {
  return (
    <button
      className="bg-[#3799F7] text-white border-none my-2 py-[4px] w-full rounded-sm"
      type={type}
    >
      {name}
    </button>
  );
}
