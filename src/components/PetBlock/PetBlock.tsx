import clsx from "clsx"
import PetBanner from "@components/PetBanner/PetBanner"

type PetBlockProps = {
  page: "register" | "login" | "add"
}

const getPetImgSet = (page: string) => ({
  mobile: {
    "1x": `/images/pet-block/${page}/pet-mobile-img.png`,
    "2x": `/images/pet-block/${page}/pet-mobile-img@2x.png`,
  },
  tablet: {
    "1x": `/images/pet-block/${page}/pet-tablet-img.png`,
    "2x": `/images/pet-block/${page}/pet-tablet-img@2x.png`,
  },
  desktop: {
    "1x": `/images/pet-block/${page}/pet-desktop-img.png`,
    "2x": `/images/pet-block/${page}/pet-desktop-img@2x.png`,
  },
})

const PetBlock: React.FC<PetBlockProps> = ({ page }) => {
  const isAuth = page === "login" || page === "register"
  const isAdd = page === "add"

  const images = getPetImgSet(page)

  const containerClass = clsx(
    "bg-primary relative flex w-full items-end rounded-4xl bg-auto bg-bottom-right bg-no-repeat lg:bg-position-[bottom_right_26px] xl:h-full xl:flex-1/2 xl:bg-bottom",
    {
      "bg-auth h-70 lg:h-76": isAuth,
      "bg-add h-53 justify-center lg:h-62": isAdd,
    },
  )

  const imageClass = clsx({
    "lg:mr-22.5 lg:ml-auto xl:mr-5": isAuth,
    "bg-top": isAdd,
  })

  return (
    <div className={containerClass}>
      <picture className={imageClass}>
        <source
          media="(min-width: 1280px)"
          srcSet={`${images.desktop["1x"]} 1x, ${images.desktop["2x"]} 2x`}
        />
        <source
          media="(min-width: 768px)"
          srcSet={`${images.tablet["1x"]} 1x, ${images.tablet["2x"]} 2x`}
        />
        <source
          media="(max-width: 767px)"
          srcSet={`${images.mobile["1x"]} 1x, ${images.mobile["2x"]} 2x`}
        />
        <img src={images.mobile["1x"]} alt="Pet" loading="lazy" />
      </picture>
      {isAuth && <PetBanner page={page} />}
    </div>
  )
}

export default PetBlock
