type PetBannerProps = {
  page: "register" | "login"
}

const petData = {
  register: {
    img1x: "/images/cat-img.png",
    img2x: "/images/cat-img@2x.png",
    alt: "Cat",
    name: "Jack",
    date: "18.10.2021",
    description:
      "Jack is a gray Persian cat with green eyes. He loves to be pampered and groomed, and enjoys playing with toys.",
  },
  login: {
    img1x: "/images/dog-img.png",
    img2x: "/images/dog-img@2x.png",
    alt: "Dog",
    name: "Rich",
    date: "21.09.2020",
    description:
      "Rich would be the perfect addition to an active family that loves to play and go on walks. I bet he would love having a doggy playmate too!",
  },
}

const PetBanner: React.FC<PetBannerProps> = ({ page }) => {
  const pet = petData[page]

  return (
    <div className="absolute bottom-8 left-8 hidden w-76 gap-2 rounded-3xl bg-white p-4 lg:flex xl:bottom-24 xl:left-15">
      <div className="bg-secondary flex h-15 w-15 shrink-0 items-center justify-center rounded-full">
        <img
          className="h-auto w-8"
          src={pet.img1x}
          srcSet={`${pet.img1x} 1x, ${pet.img2x} 2x`}
          alt={pet.alt}
        />
      </div>

      <div>
        <div className="flex items-center justify-between">
          <p className="text-primary text-base font-bold">{pet.name}</p>
          <p className="text-xs font-medium">
            <span className="text-black/50">Birthday:</span> {pet.date}
          </p>
        </div>
        <p className="text-xs font-medium">{pet.description}</p>
      </div>
    </div>
  )
}

export default PetBanner
