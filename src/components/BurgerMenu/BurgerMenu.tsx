import { useSelector } from "react-redux"
import clsx from "clsx"

import AuthNav from "@components/AuthNav/AuthNav"
import Nav from "@components/Nav/Nav"
import UserNav from "@components/UserNav/UserNav"
import { selectIsLoggedIn } from "@store/users/selectors"

type BurgerMenuProps = {
  isHome: boolean
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ isHome }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const containerClass = clsx(
    "relative flex h-full w-55 items-end justify-center px-5 py-10 lg:w-94",
    {
      "dark:bg-dark-primary bg-white": isHome,
      "bg-primary": !isHome,
    },
  )

  return (
    <div className={containerClass}>
      <Nav variant="menu" isHome={isHome} />
      {isLoggedIn ? (
        <UserNav variant="menu" isHome={isHome} />
      ) : (
        <AuthNav variant="menu" isHome={isHome} />
      )}
    </div>
  )
}

export default BurgerMenu
