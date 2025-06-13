import { useSelector } from "react-redux"
import clsx from "clsx"

import { selectUser } from "@store/users/selectors"
import { formatName } from "@utils/formatName"
import { isNonEmptyString } from "@utils/isNonEmptyString "
import { DEFAULT_AVATAR_URL } from "@constants/defaultUserData"

const UserBlock = () => {
  const user = useSelector(selectUser)
  if (!user) return null

  const isNotDefaultAvatar = user.avatar !== DEFAULT_AVATAR_URL
  const isAvatar = isNonEmptyString(user.avatar)
  const isPhone = isNonEmptyString(user.phone)

  return (
    <div className="mb-10 flex flex-col items-center">
      <div className="bg-primary absolute top-5 left-5 flex h-10 items-center gap-1 rounded-4xl px-3.5 text-white lg:top-10 lg:left-10">
        <span>{formatName(user.name, 13)}</span>
        <svg className="size-4.5 fill-white stroke-white">
          <use href="/sprite.svg#icon-user" />
        </svg>
      </div>

      <div className="bg-secondary group/avatar relative m-auto mb-7 flex size-23 items-center justify-center rounded-full lg:size-27">
        {isAvatar && isNotDefaultAvatar ? (
          <img src={user.avatar} alt={user.name} className="size-full rounded-full object-cover" />
        ) : (
          <svg className="fill-primary size-10 stroke-none lg:size-12.5">
            <use href="/sprite.svg#icon-user" />
          </svg>
        )}
      </div>

      <div className="flex w-full flex-col gap-5 lg:gap-3.5">
        <h3 className="text-base font-bold lg:text-lg">My information</h3>
        <ul className="grid gap-2.5 lg:grid-cols-2 lg:gap-3.5 xl:grid-cols-1">
          <li className="border-primary flex h-10.5 items-center truncate rounded-4xl border px-3 lg:h-13">
            {user.name}
          </li>
          <li className="border-primary flex h-10.5 items-center truncate rounded-4xl border px-3 lg:h-13">
            {user.email}
          </li>
          <li
            className={clsx(
              "flex h-10.5 items-center truncate rounded-4xl border px-3 lg:h-13",
              isPhone ? "border-primary" : "border-black/15",
            )}
          >
            {isPhone ? user.phone : "+380"}
          </li>
        </ul>
      </div>
    </div>
  )
}

export default UserBlock
