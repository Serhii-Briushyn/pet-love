import { Navigate } from "react-router"
import { useSelector } from "react-redux"
import { selectIsLoggedIn } from "store/auth/selectors"
import { ReactNode } from "react"

interface RestrictedRouteProps {
  children: ReactNode
  redirectTo?: string
}

const RestrictedRoute = ({ children, redirectTo = "/" }: RestrictedRouteProps) => {
  const isLoggedIn = useSelector(selectIsLoggedIn)

  return !isLoggedIn ? <>{children}</> : <Navigate to={redirectTo} />
}

export default RestrictedRoute
