import { Link } from "react-router"
import clsx from "clsx"

type LogoProps = {
  isHome?: boolean
}

const Logo: React.FC<LogoProps> = ({ isHome = false }) => {
  const textClass = clsx("flex items-end text-xl leading-none font-bold lg:text-3xl", {
    "text-white": isHome,
    "text-black": !isHome,
  })

  const iconClass = clsx("h-4 w-4 lg:h-6 lg:w-6", {
    "fill-white": isHome,
    "fill-primary": !isHome,
  })

  return (
    <Link to="/">
      <div className={textClass}>
        pet
        <svg className={iconClass}>
          <use href="/sprite.svg#icon-heart" />
        </svg>
        love
      </div>
    </Link>
  )
}

export default Logo
