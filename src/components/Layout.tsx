import { Outlet } from "react-router"
import { useSelector } from "react-redux"
import { selectIsLoading } from "@store/ui/selectors"
import Loader from "./Loader/Loader"
import Header from "./Header/Header"
import ModalManager from "./ModalManager/ModalManager"

const Layout = () => {
  const isLoading = useSelector(selectIsLoading)

  return (
    <div className="font-manrope dark:bg-dark-primary bg-light relative h-full min-h-screen min-w-80 text-sm font-medium lg:text-base">
      {isLoading && <Loader />}
      <Header />
      <Outlet />
      <ModalManager />
    </div>
  )
}

export default Layout
