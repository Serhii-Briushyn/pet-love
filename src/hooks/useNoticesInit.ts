import { useEffect } from "react"
import { useDispatch } from "react-redux"
import toast from "react-hot-toast"

import { fetchCities } from "@store/cities/operations"
import { fetchCategories, fetchSexOptions, fetchSpeciesOptions } from "@store/notices/operations"
import { AppDispatch } from "@store/store"

export const useNoticesInit = () => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    Promise.all([
      dispatch(fetchCategories()).unwrap(),
      dispatch(fetchSexOptions()).unwrap(),
      dispatch(fetchSpeciesOptions()).unwrap(),
      dispatch(fetchCities()).unwrap(),
    ]).catch((error) => toast.error(error as string))
  }, [dispatch])
}
