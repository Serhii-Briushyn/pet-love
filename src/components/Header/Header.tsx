import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import clsx from "clsx";

import Logo from "components/Logo/Logo";
import AuthNav from "components/AuthNav/AuthNav";
import UserNav from "components/UserNav/UserNav";
import Nav from "components/Nav/Nav";
import { selectIsLoggedIn } from "store/auth/selectors";
import BurgerMenu from "components/BurgerMenu/BurgerMenu";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollYRef = useRef(0);
  const { pathname } = useLocation();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollYRef.current && currentScrollY > 100) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isMainPage = pathname === "/";
  const isHomePage = pathname === "/home";
  const isDefaultPage = !isMainPage && !isHomePage;

  const headerStyles = clsx(
    "container top-0 right-1/2 translate-x-1/2 z-50 w-full pb-2 tablet:pt-8 transition-all duration-300 ease-out",
    {
      hidden: isMainPage,
      "absolute bg-transparent pt-7 px-10 tablet:px-16 desktop:px-24":
        isHomePage,
      "fixed bg-light pt-6 px-5 tablet:px-8 desktop:px-16": isDefaultPage,
      "translate-y-0": isDefaultPage && showHeader,
      "-translate-y-full": isDefaultPage && !showHeader,
    }
  );

  const burgerIconStyles = clsx("h-full w-full", {
    "stroke-white": isHomePage,
    "stroke-black": !isHomePage,
  });

  return (
    <>
      <header className={headerStyles}>
        <div className="container flex items-center justify-between h-10 w-full m-auto tablet:h-12.5">
          <Logo page={isHomePage ? "home" : "default"} />

          <div className="max-desktop:hidden absolute right-1/2 translate-x-1/2">
            <Nav isInverted={isHomePage} />
          </div>

          <div className="flex items-center gap-4">
            <div className="max-tablet:hidden">
              {isLoggedIn ? (
                <UserNav isInverted={isHomePage} variant="header" />
              ) : (
                <AuthNav isInverted={isHomePage} />
              )}
            </div>
            <button
              className="desktop:hidden h-8 w-8 cursor-pointer"
              onClick={() => setOpen(true)}
            >
              <svg className={burgerIconStyles}>
                <use href="/sprite.svg#icon-menu" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <BurgerMenu
        isOpen={open}
        onClose={() => setOpen(false)}
        isInverted={!isHomePage}
        isLoggedIn={isLoggedIn}
      />
    </>
  );
};

export default Header;
