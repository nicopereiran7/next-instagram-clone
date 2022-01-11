export default function AvatarProfile({ userAuth }) {
  return (
    <img
      src={userAuth?.avatar || "/assets/avatar.png"}
      alt=""
      className="w-full h-full object-cover rounded-full transition ease-in-out duration-300 transform hover:scale-110"
      id="dropdownButton"
      data-dropdown-toggle="dropdown"
    />
  );
}
