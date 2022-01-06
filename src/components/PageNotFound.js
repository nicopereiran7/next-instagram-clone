import LayoutBasic from "../layouts/LayoutBasic";
import HeadComponent from "./HeadComponent";

export default function PageNotFound({ details }) {
  return (
    <LayoutBasic>
      <HeadComponent title="Pagina No Encontrada - Instagram" />

      <div className="w-full grid place-items-center min-h-[80vh]">
        {details}
      </div>
    </LayoutBasic>
  );
}
