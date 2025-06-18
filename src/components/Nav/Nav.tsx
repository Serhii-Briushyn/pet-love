import { useDispatch } from "react-redux"
import { NavLink } from "react-router-dom"
import clsx from "clsx"

import { AppDispatch } from "@store/store"
import { closeModal } from "@store/ui/slice"

type NavigationProps = {
  variant: "header" | "menu"
  isHome?: boolean
}

const Nav: React.FC<NavigationProps> = ({ variant, isHome }) => {
  const dispatch = useDispatch<AppDispatch>()
  const closeMenu = () => dispatch(closeModal())

  const isHeader = variant === "header"
  const isMenu = variant === "menu"
  const isColorStyle = (isMenu && !isHome) || (isHeader && isHome)
  const isLightStyle = (isMenu && isHome) || (isHeader && !isHome)

  const containerClass = clsx("absolute gap-2.5", {
    "right-1/2 hidden translate-x-1/2 flex-row xl:flex": isHeader,
    "top-1/2 flex -translate-y-2/3 flex-col": isMenu,
  })

  const getLinkClasses = (isActive: boolean) =>
    clsx(
      "flex h-12 w-30 items-center justify-center rounded-4xl border transition-all duration-200 ease-in",
      {
        "border-white/100 text-white": isActive && isColorStyle,
        "border-white/40 text-white hover:border-white": !isActive && isColorStyle,
        "border-primary text-black dark:text-white": isActive && isLightStyle,
        "hover:border-primary border-black/15 text-black dark:border-white/40 dark:text-white":
          !isActive && isLightStyle,
      },
    )

  return (
    <nav className={containerClass}>
      <NavLink
        className={({ isActive }) => getLinkClasses(isActive)}
        onClick={isMenu ? closeMenu : undefined}
        to="/news"
        end
      >
        News
      </NavLink>
      <NavLink
        className={({ isActive }) => getLinkClasses(isActive)}
        onClick={isMenu ? closeMenu : undefined}
        to="/notices"
        end
      >
        Find pet
      </NavLink>
      <NavLink
        className={({ isActive }) => getLinkClasses(isActive)}
        onClick={isMenu ? closeMenu : undefined}
        to="/friends"
        end
      >
        Our friends
      </NavLink>
    </nav>
  )
}

export default Nav
