import { Outlet } from "react-router";
import { useSelector } from "react-redux";
import Header from "./Header/Header";
import Loader from "./Loader/Loader";
import { selectIsLoading } from "store/ui/selectors";

const Layout = () => {
  const isLoading = useSelector(selectIsLoading);

  return (
    <div className="font-manrope min-w-80 dark:bg-dark-primary bg-light text-sm tablet:text-base relative min-h-screen font-medium">
      {isLoading && <Loader />}
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
