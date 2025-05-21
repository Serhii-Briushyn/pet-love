import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import clsx from "clsx"

import { AppDispatch } from "@store/store"
import { selectIsLoggedIn } from "@store/users/selectors"
import { openModal } from "@store/ui/slice"
import { useHideOnScroll } from "@hooks/useHideOnScroll"

import Logo from "@components/Logo/Logo"
import Nav from "@components/Nav/Nav"
import UserNav from "@components/UserNav/UserNav"
import AuthNav from "@components/AuthNav/AuthNav"

const Header = () => {
  const dispatch = useDispatch<AppDispatch>()
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const { pathname } = useLocation()

  const showHeader = useHideOnScroll(100)

  const isHome = pathname === "/"
  const isDefault = !isHome

  const containerClass = clsx(
    "top-0 right-1/2 z-50 container w-full translate-x-1/2 pt-7 pb-5 transition-all duration-300 ease-out lg:py-8",
    {
      "absolute bg-transparent px-10 lg:px-16 xl:px-24": isHome,
      "bg-light fixed px-5 lg:px-8 xl:px-16": isDefault,
      "translate-y-0": isDefault && showHeader,
      "-translate-y-full": isDefault && !showHeader,
    },
  )

  const iconClass = clsx("h-full w-full", {
    "stroke-white": isHome,
    "stroke-black": isDefault,
  })

  return (
    <>
      <header className={containerClass}>
        <div className="flex h-10 w-full items-center justify-between lg:h-12">
          <Logo isHome={isHome} />

          <Nav variant="header" isHome={isHome} />

          <div className="flex items-center gap-3 lg:gap-4 xl:contents">
            {isLoggedIn ? (
              <UserNav variant="header" isHome={isHome} />
            ) : (
              <AuthNav variant="header" isHome={isHome} />
            )}
            <button
              className="h-8 w-8 cursor-pointer xl:hidden"
              onClick={() => dispatch(openModal({ name: "menu" }))}
            >
              <svg className={iconClass}>
                <use href="/sprite.svg#icon-menu" />
              </svg>
            </button>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
