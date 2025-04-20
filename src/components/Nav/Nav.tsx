import clsx from "clsx";
import { NavLink } from "react-router-dom";
type NavigationProps = {
  isInverted?: boolean;
  onClose?: () => void;
};

const Nav: React.FC<NavigationProps> = ({ isInverted = false, onClose }) => {
  const baseStyles =
    "flex items-center justify-center rounded-main h-12 px-[15px] border tablet:h-12.5 transition-all duration-200 ease-in";

  const variantStyles = clsx({
    "hover:border-primary border-black/15 text-black": !isInverted,
    "border-white/40 text-white hover:border-white": isInverted,
  });

  const getLinkClasses = (isActive: boolean) =>
    clsx(baseStyles, variantStyles, {
      "border-primary": isActive && !isInverted,
      "border-white": isActive && isInverted,
    });

  return (
    <nav className="max-desktop:w-30 desktop:flex-row flex flex-col gap-2.5">
      <NavLink
        className={({ isActive }) => getLinkClasses(isActive)}
        onClick={onClose}
        to="/news"
      >
        News
      </NavLink>
      <NavLink
        className={({ isActive }) => getLinkClasses(isActive)}
        onClick={onClose}
        to="/notices"
      >
        Find pet
      </NavLink>
      <NavLink
        className={({ isActive }) => getLinkClasses(isActive)}
        onClick={onClose}
        to="/friends"
      >
        Our friends
      </NavLink>
    </nav>
  );
};

export default Nav;
