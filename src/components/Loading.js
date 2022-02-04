import HeadComponent from "./HeadComponent";

export default function Loading() {
  return (
    <>
      <HeadComponent title="Instagram" />
      <div className="w-full min-h-screen grid place-items-center">
        <img
          src="https://cdn.icon-icons.com/icons2/2248/PNG/512/instagram_icon_138461.png"
          alt=""
          className="w-14 object-cover"
        />
      </div>
    </>
  );
}
