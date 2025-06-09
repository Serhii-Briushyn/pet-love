import { useDispatch } from "react-redux"
import clsx from "clsx"

import { AppDispatch } from "@store/store"
import { openModal } from "@store/ui/slice"

type LogOutProps = {
  variant?: "header" | "menu" | "settings"
  isHome?: boolean
}

const LogOutBtn: React.FC<LogOutProps> = ({ variant, isHome }) => {
  const dispatch = useDispatch<AppDispatch>()

  const isMenu = variant === "menu"
  const isHeader = variant === "header"
  const isSettings = variant === "settings"

  const isMenuLight = isMenu && isHome
  const isMenuColor = isMenu && !isHome
  const isHeaderLight = isHeader && !isHome
  const isHeaderColor = isHeader && isHome

  const buttonClass = clsx(
    "h-10.5 cursor-pointer items-center justify-center rounded-4xl font-bold uppercase transition-all duration-200 ease-in lg:h-12",
    {
      "bg-secondary text-primary hover:bg-secondary-hover flex w-full lg:w-37": isMenuColor,
      "bg-primary hover:bg-primary-hover flex w-full text-white lg:w-42": isMenuLight,
      "bg-secondary text-primary hover:bg-secondary-hover hidden w-34 lg:flex": isHeaderColor,
      "bg-primary hover:bg-primary-hover hidden w-34 text-white lg:flex": isHeaderLight,
      "bg-secondary text-primary hover:bg-secondary-hover mt-5 flex w-28.5 lg:w-34": isSettings,
    },
  )

  return (
    <>
      <button className={buttonClass} onClick={() => dispatch(openModal({ name: "approved" }))}>
        Log out
      </button>
    </>
  )
}

export default LogOutBtn
