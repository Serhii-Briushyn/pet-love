import { Link } from "react-router-dom"

const NotFoundPage = () => {
  return (
    <div className="container m-auto p-5 pt-22 lg:p-8 lg:pt-28.5 xl:h-200">
      <div className="bg-primary flex h-full items-center justify-center rounded-4xl py-61 lg:py-55 xl:p-0">
        <div className="flex flex-col items-center gap-5 lg:gap-10">
          <div className="flex items-center gap-2 lg:gap-0">
            <span className="text-[120px] leading-none font-extrabold text-white lg:text-[300px]">
              4
            </span>
            <picture>
              <source
                media="(min-width: 768px)"
                srcSet="/images/not-found/cat-img-tab.png 1x, /images/not-found/cat-img-tab@2x.png 2x"
              />
              <source
                media="(max-width: 767px)"
                srcSet="/images/not-found/cat-img-mob.png 1x, /images/not-found/cat-img-mob@2x.png 2x"
              />
              <img
                src="/images/not-found/cat-img-mob.png"
                alt="Pet"
                loading="lazy"
                className="size-27 rounded-full bg-white/10 lg:size-69"
              />
            </picture>
            <span className="text-[120px] leading-none font-extrabold text-white lg:text-[300px]">
              4
            </span>
          </div>
          <div className="flex flex-col items-center gap-5">
            <p className="text-base font-bold tracking-tight text-white lg:text-2xl">
              Ooops! This page not found :(
            </p>
            <Link
              to="/"
              className="bg-secondary hover:bg-secondary-hover text-primary flex h-10.5 w-38 cursor-pointer items-center justify-center rounded-4xl font-bold tracking-tight transition-all duration-200 ease-in lg:h-12 lg:w-41"
            >
              To home page
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
