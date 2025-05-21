import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import clsx from "clsx"

import { selectUser } from "@store/users/selectors"
import { formatName } from "@utils/formatName"

type UserBarProps = {
  isHome?: boolean
}

const UserBar: React.FC<UserBarProps> = ({ isHome }) => {
  const user = useSelector(selectUser)

  if (!user) return

  const textClass = clsx("hidden text-xl font-bold lg:inline", {
    "text-white": isHome,
    "text-black": !isHome,
  })

  return (
    <NavLink to="profile" className="group contents items-center gap-2 lg:flex">
      <div className="bg-secondary flex h-10 w-10 items-center justify-center overflow-hidden rounded-full lg:h-12 lg:w-12">
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="h-full w-full object-cover transition-all duration-200 ease-in group-hover:scale-110"
          />
        ) : (
          <svg className="fill-primary h-5 w-5 transition-all duration-200 ease-in group-hover:scale-125 lg:h-6 lg:w-6">
            <use href="/sprite.svg#icon-user" />
          </svg>
        )}
      </div>
      <span className={textClass}>{formatName(user.name)}</span>
    </NavLink>
  )
}

export default UserBar
