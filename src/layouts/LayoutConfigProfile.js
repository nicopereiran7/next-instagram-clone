import LayoutBasic from "./LayoutBasic";

export default function LayoutConfigProfile({ children }) {
  return (
    <LayoutBasic>
      <div className="flex bg-white w-full my-4">
        <div>sidebar</div>
        <div>{children}</div>
      </div>
    </LayoutBasic>
  );
}
