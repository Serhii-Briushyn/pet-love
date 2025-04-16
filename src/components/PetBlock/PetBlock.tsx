import clsx from "clsx"
import PetBanner from "components/PetBanner/PetBanner"
import { getImagePath } from "utils/getPetImagePath"
import { useScreenType } from "utils/useScreenType"

type PetBlockProps = {
  page: "register" | "login" | "add"
}

const PetBlock: React.FC<PetBlockProps> = ({ page }) => {
  const screen = useScreenType()

  if (!screen) return null

  const bg1x = getImagePath({ page, screen, size: "1x", type: "bg", folder: "pet-block" })
  const bg2x = getImagePath({ page, screen, size: "2x", type: "bg", folder: "pet-block" })

  const img1x = getImagePath({ page, screen, size: "1x", type: "img", folder: "pet-block" })
  const img2x = getImagePath({ page, screen, size: "2x", type: "img", folder: "pet-block" })

  const backgroundStyle = {
    backgroundImage: `
    image-set(
      url(${bg1x}) 1x,
      url(${bg2x}) 2x
    )
  `,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center bottom",
    backgroundSize: "auto",
  }

  const containerClass = clsx(
    "bg-primary desktop:h-full desktop:basis-section relative flex w-full items-end rounded-4xl",
    page === "add" ? "tablet:h-[248px] h-[213px]" : "tablet:h-[302px] h-70",
  )

  const showBanner = page === "register" || page === "login"

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
  )
}

export default PetBlock
