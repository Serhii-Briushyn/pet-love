import { ReactNode } from "react"
import { useSelector } from "react-redux"
import { Navigate } from "react-router"
import { selectIsLoggedIn } from "store/auth/selectors"

interface RestrictedRouteProps {
  children: ReactNode
  redirectTo?: string
}

const PrivateRoute = ({ children, redirectTo = "/login" }: RestrictedRouteProps) => {
  const isLoggedIn = useSelector(selectIsLoggedIn)

  return isLoggedIn ? children : <Navigate to={redirectTo} />
}

export default PrivateRoute
