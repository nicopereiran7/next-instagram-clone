export default function Footer() {
  return (
    <div className="flex items-center justify-center flex-wrap px-2">
      <FooterLink name="Meta"/>
      <FooterLink name="Informacion" />
      <FooterLink name="Blog" />
      <FooterLink name="Empleo" />
      <FooterLink name="Ayuda" />
      <FooterLink name="API" />
      <FooterLink name="Privacidad" />
      <FooterLink name="Condiciones" />
      <FooterLink name="Cuentas Destacada" />
      <FooterLink name="Hashtags" />
      <FooterLink name="Ubicaciones" />
      <FooterLink name="Instagram Lite" />
    </div>
  )
}

const FooterLink = ({ name }) => {
  return <a href="#" className="text-[12px] py-1 px-2 text-[#8e8e8e]">{name}</a>
}