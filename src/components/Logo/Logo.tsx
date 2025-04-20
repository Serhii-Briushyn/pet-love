import clsx from "clsx";
import { Link } from "react-router";
type LogoProps = {
  page?: "home" | "main" | "default";
};

const Logo: React.FC<LogoProps> = ({ page = "default" }) => {
  const isHomePage = page === "home";
  const isMainPage = page === "main";
  const isDefault = page === "default";

  const textClasses = clsx("flex items-end leading-none font-bold", {
    "text-[50px] text-white tablet:text-[100px]": isMainPage,
    "text-xl text-white tablet:text-[28px]": isHomePage,
    "text-xl text-black tablet:text-[28px]": isDefault,
  });

  const iconClasses = clsx({
    "fill-primary h-11 w-11 animate-pulse tablet:w-[82px] tablet:h-[82px]":
      isMainPage,
    "fill-white h-[17px] w-[17px] tablet:h-[23px] tablet:w-[23px]": isHomePage,
    "fill-primary h-[17px] w-[17px] tablet:h-[23px] tablet:w-[23px]": isDefault,
  });

  return (
    <Link to="/home">
      <div className={textClasses}>
        pet
        <svg className={iconClasses}>
          <use href="/sprite.svg#icon-heart" />
        </svg>
        love
      </div>
    </Link>
  );
};

export default Logo;
