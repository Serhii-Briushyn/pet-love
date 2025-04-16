import { Outlet } from "react-router"

const Layout = () => {
  return (
    <div className="font-display bg-dark-primary dark:bg-dark-primary relative min-h-screen font-medium text-black dark:text-white">
      <Outlet />
    </div>
  )
}

export default Layout
