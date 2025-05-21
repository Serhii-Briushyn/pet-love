import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import toast from "react-hot-toast"

import { AppDispatch } from "@store/store"
import { fetchNotices } from "@store/notices/operations"
import {
  selectCurrentPage,
  selectFilters,
  selectSorting,
  selectTotalPages,
} from "@store/notices/selectors"
import { setPage } from "@store/notices/slice"

import Title from "@components/Title/Title"
import NoticesFilters from "@components/NoticesFilters/NoticesFilters"
import NoticesList from "@components/NoticesList/NoticesList"
import Pagination from "@components/Pagination/Pagination"

const NoticesPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const page = useSelector(selectCurrentPage)
  const totalPages = useSelector(selectTotalPages)
  const filters = useSelector(selectFilters)
  const sorting = useSelector(selectSorting)

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchNotices({ page, filters, sorting })).unwrap()
      } catch (error) {
        toast.error(error as string)
      }
    }
    fetchData()
  }, [dispatch, page, filters, sorting])

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <section className="container m-auto flex flex-col px-5 pt-28.5 pb-20 lg:px-8 lg:pt-42 xl:px-16 xl:pt-44.5">
      <Title title="Find your favorite pet" className="mb-6 lg:mb-11 xl:mb-15" />
      <NoticesFilters />
      <NoticesList />
      {totalPages > 1 && (
        <Pagination currentPage={page} totalPages={totalPages} onChange={handlePageChange} />
      )}
    </section>
  )
}

export default NoticesPage
