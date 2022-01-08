export default function GridPost({ data }) {
  return (
    <div className="grid gap-1 sm:gap-[20px] grid-cols-2 sm:grid-cols-3 px-1 sm:px-0">
      {data.map((item, index) => (
        <div key={index} className="w-full">
          <img
            src={item.link}
            alt={item.title}
            className="w-full object-cover aspect-1 hover:cursor-pointer"
          />
        </div>
      ))}
    </div>
  );
}
