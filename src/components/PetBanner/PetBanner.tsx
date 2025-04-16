type PetBannerProps = {
  page: "register" | "login"
}

const PetBanner: React.FC<PetBannerProps> = ({ page }) => {
  const bannerImg =
    page === "register"
      ? "/images/cat-img.png"
      : page === "login"
        ? "/images/dog-img.png"
        : undefined

  const bannerAlt = page === "register" ? "Cat" : "Dog"

  const name = page === "register" ? "Jack" : "Rich"

  const date = page === "register" ? "18.10.2021" : "21.09.2020"

  const description =
    page === "register"
      ? "Jack is a gray Persian cat with green eyes. He loves to be pampered and groomed, and enjoys playing with toys."
      : "Rich would be the perfect addition to an active family that loves to play and go on walks. I bet he would love having a doggy playmate too!"

  return (
    <div className="tablet:flex desktop:left-15 desktop:bottom-24 absolute bottom-8 left-8 hidden w-76 gap-2 rounded-[20px] bg-white p-4">
      <div className="bg-secondary flex h-15 w-15 shrink-0 items-center justify-center rounded-full">
        <img className="h-auto w-8" src={bannerImg} alt={bannerAlt} />
      </div>

      <div>
        <div className="flex items-center justify-between">
          <p className="text-primary text-base font-bold">{name}</p>
          <p className="text-xs font-medium">
            <span className="text-black/50">Birthday:</span> {date}
          </p>
        </div>
        <p className="text-xs font-medium">{description}</p>
      </div>
    </div>
  )
}

export default PetBanner
