import { useDispatch } from "react-redux"
import { NavLink } from "react-router-dom"
import clsx from "clsx"

import { AppDispatch } from "@store/store"
import { closeModal } from "@store/ui/slice"

type AuthNavProps = {
  variant: "header" | "menu" | "modal"
  isHome?: boolean
}

const AuthNav: React.FC<AuthNavProps> = ({ variant, isHome }) => {
  const dispatch = useDispatch<AppDispatch>()
  const closeMenu = () => dispatch(closeModal())

  const isHeader = variant === "header"
  const isMenu = variant === "menu"
  const isModal = variant === "modal"
  const isColorStyle = (isHeader && !isHome) || (isMenu && isHome)
  const isLightStyle = (isHeader && isHome) || (isMenu && !isHome)

  const containerClass = clsx("gap-2", {
    "hidden lg:flex": isHeader,
    "flex w-full flex-col justify-center lg:flex-row": isMenu,
    "flex flex-wrap justify-center": isModal,
  })

  const linkClass =
    "lg:h-12 flex h-10 cursor-pointer items-center justify-center rounded-4xl font-bold transition-all duration-200 ease-in"

  const loginClass = clsx(linkClass, "text-white", {
    "bg-primary hover:bg-primary-hover w-33 lg:w-35": isModal,
    "bg-primary hover:bg-primary-hover w-full lg:w-30": isColorStyle,
    "hover:bg-secondary hover:text-primary border-secondary w-full border bg-transparent lg:w-30":
      isLightStyle,
  })
  const registerClass = clsx(linkClass, "bg-secondary hover:bg-secondary-hover text-primary", {
    "w-33 lg:w-35": isModal,
    "w-full lg:w-37": isHeader || isMenu,
  })

  return (
    <div className={containerClass}>
      <NavLink
        className={loginClass}
        to="/login"
        onClick={isMenu || isModal ? closeMenu : undefined}
      >
        Login
      </NavLink>
      <NavLink
        className={registerClass}
        to="/register"
        onClick={isMenu || isModal ? closeMenu : undefined}
      >
        Register
      </NavLink>
    </div>
  )
}

export default AuthNav
