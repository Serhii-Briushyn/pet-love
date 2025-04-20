import clsx from "clsx";
import PetBanner from "components/PetBanner/PetBanner";
import { useScreenType } from "utils/useScreenType";

type PetBlockProps = {
  page: "register" | "login" | "add";
};

const PetBlock: React.FC<PetBlockProps> = ({ page }) => {
  const screen = useScreenType();

  if (!screen) return null;

  const img1x = `/images/pet-block/${page}/pet-${screen}-img.png`;
  const img2x = `/images/pet-block/${page}/pet-${screen}-img@2x.png`;

  const backgroundStyle = {
    backgroundImage: `
    image-set(
      url("/images/pet-block/${page}/bg-${screen}.png") 1x,
      url("/images/pet-block/${page}/bg-${screen}@2x.png") 2x
    )
  `,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center bottom",
    backgroundSize: "auto",
  };

  const containerClass = clsx(
    "bg-primary desktop:h-full desktop:basis-box relative flex w-full items-end rounded-4xl",
    {
      "tablet:h-[248px] h-[213px]": page === "add",
      "tablet:h-[302px] h-70": page === "register" || page === "login",
    }
  );

  const showBanner = page !== "add";

  return (
    <div className={containerClass} style={backgroundStyle}>
      <img
        className="tablet:ml-auto tablet:mr-22.5 desktop:mr-5"
        src={img1x}
        srcSet={`${img1x} 1x, ${img2x} 2x`}
        alt="Pet"
        loading="lazy"
      />
      {showBanner && <PetBanner page={page} />}
    </div>
  );
};

export default PetBlock;
