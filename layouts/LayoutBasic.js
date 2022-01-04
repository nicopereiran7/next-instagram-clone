import NavBar from "../components/NavBar";

export default function LayoutBasic({ children }) {
  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-100">
      {/* navbar */}
      <NavBar />
      {/* main-content */}
      <div className="flex justify-center">
        <div className="max-w-[975px] w-full">{children}</div>
      </div>
    </div>
  );
}
