import clsx from "clsx";
import { NavLink } from "react-router-dom";

type AuthProps = {
  isInverted?: boolean;
  onClose?: () => void;
};

const AuthNav: React.FC<AuthProps> = ({ isInverted = false, onClose }) => {
  const baseStyles =
    "flex justify-center items-center h-10.5 w-full rounded-main font-bold uppercase tablet:h-12.5 transition-all duration-200 ease-in";

  const loginStyles = clsx(
    baseStyles,
    "bg-primary text-white tablet:w-[119px]",
    {
      "hover:bg-primary-hover": !isInverted,
      "border border-secondary hover:bg-secondary hover:text-primary":
        isInverted,
    }
  );

  const registerStyles = clsx(
    baseStyles,
    "bg-secondary text-primary tablet:w-[149px] hover:bg-secondary-hover"
  );

  return (
    <div className="tablet:flex-row flex w-full flex-col justify-center gap-2">
      <NavLink className={loginStyles} to="/login" onClick={onClose}>
        Login
      </NavLink>
      <NavLink className={registerStyles} to="/register" onClick={onClose}>
        Register
      </NavLink>
    </div>
  );
};

export default AuthNav;
