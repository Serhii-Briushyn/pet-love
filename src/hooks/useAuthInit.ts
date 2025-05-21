import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCurrentUserFull, setAuthHeader } from "@store/users/operations"
import { selectToken } from "@store/users/selectors"
import { AppDispatch } from "@store/store"
import toast from "react-hot-toast"

export const useAuthInit = () => {
  const dispatch = useDispatch<AppDispatch>()
  const token = useSelector(selectToken)

  useEffect(() => {
    const initAuth = async () => {
      try {
        if (token) {
          setAuthHeader(token)
          await dispatch(getCurrentUserFull()).unwrap()
        }
      } catch (error) {
        toast.error(error as string)
      }
    }

    initAuth()
  }, [token, dispatch])
}
