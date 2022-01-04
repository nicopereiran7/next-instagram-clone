export default function InputForm({ type, placeholder }) {
  return (
    <input type={type} placeholder={placeholder} className="py-[8px] px-2 bg-gray-100 text-[12px] focus:outline-none mb-2 w-full border-solid border-[1px] border-neutral-300" />
  )
}