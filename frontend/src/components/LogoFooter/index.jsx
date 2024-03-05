import Logo from "../../assets/logo-e-rede.png";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

export function LogoFooter() {
  return (
    <div className="flex flex-col gap-5 pb-5">
      <div className="flex gap-5">
        <img src={Logo} alt="" className="h-7" />
        <section className="text-[10px]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis necessitatibus repellat,
          voluptatem! Nobis, ab!Perspiciatis necessitatibus Perspiciatis necessitatibus
        </section>
      </div>

      <section className="flex text-base gap-6">
        <FaFacebook />
        <FaInstagram />
        <FaWhatsapp />
      </section>
    </div>
  );
}