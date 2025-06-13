import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import clsx from "clsx"

import { selectUser } from "@store/users/selectors"
import { formatName } from "@utils/formatName"
import { DEFAULT_AVATAR_URL } from "@constants/defaultUserData"

type UserBarProps = {
  isHome?: boolean
}

const UserBar: React.FC<UserBarProps> = ({ isHome }) => {
  const user = useSelector(selectUser)

  if (!user) return

  const isDefaultAvatar = user.avatar === DEFAULT_AVATAR_URL

  const textClass = clsx("hidden text-xl font-bold lg:inline", {
    "text-white": isHome,
    "text-black": !isHome,
  })

  return (
    <NavLink to="/profile" className="group contents items-center gap-2 lg:flex">
      <div className="bg-secondary flex size-10 items-center justify-center overflow-hidden rounded-full lg:size-12">
        {user.avatar && !isDefaultAvatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="h-full w-full object-cover transition-all duration-200 ease-in group-hover:scale-110"
          />
        ) : (
          <svg className="fill-primary size-5 transition-all duration-200 ease-in group-hover:scale-125 lg:size-6">
            <use href="/sprite.svg#icon-user" />
          </svg>
        )}
      </div>
      <span className={textClass}>{formatName(user.name)}</span>
    </NavLink>
  )
}

export default UserBar
