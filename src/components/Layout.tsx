import { Outlet } from "react-router"
import { useSelector } from "react-redux"
import { selectIsLoading } from "@store/ui/selectors"
import Loader from "./Loader/Loader"
import Header from "./Header/Header"
import ModalManager from "./ModalManager/ModalManager"
import StyleSwitcher from "./StyleSwitcher/StyleSwitcher"

const Layout = () => {
  const isLoading = useSelector(selectIsLoading)

  return (
    <div className="font-manrope dark:bg-dark-primary bg-light relative h-full min-h-screen min-w-80 text-sm font-medium text-black lg:text-base dark:text-white">
      {isLoading && <Loader />}
      <Header />
      <Outlet />
      <ModalManager />
      <StyleSwitcher />
    </div>
  )
}

export default Layout
