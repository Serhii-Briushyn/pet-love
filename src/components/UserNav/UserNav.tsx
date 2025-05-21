import LogOutBtn from "@components/LogOutBtn/LogOutBtn"
import UserBar from "@components/UserBar/UserBar"

type UserProps = {
  isHome?: boolean
  variant?: "header" | "menu"
}

const UserNav: React.FC<UserProps> = ({ isHome, variant }) => {
  return (
    <div className="contents items-center gap-2 lg:flex">
      <LogOutBtn isHome={isHome} variant={variant} />
      {variant === "header" && <UserBar isHome={isHome} />}
    </div>
  )
}

export default UserNav
