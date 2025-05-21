import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import toast from "react-hot-toast"

import { AppDispatch } from "@store/store"
import { fetchNews } from "@store/news/operations"
import { selectCurrentPage, selectKeyword, selectTotalPages } from "@store/news/selectors"
import { setKeyword, setPage } from "@store/news/slice"

import Title from "@components/Title/Title"
import SearchField from "@components/SearchField/SearchField"
import NewsList from "@components/NewsList/NewsList"
import Pagination from "@components/Pagination/Pagination"

const NewsPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const page = useSelector(selectCurrentPage)
  const totalPages = useSelector(selectTotalPages)
  const keyword = useSelector(selectKeyword)

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchNews({ page, keyword })).unwrap()
      } catch (error) {
        toast.error(error as string)
      }
    }
    fetchData()
  }, [dispatch, page, keyword])

  const onSearchHandler = (val: string) => {
    dispatch(setKeyword(val))
    dispatch(setPage(1))
  }

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <section className="container m-auto flex flex-col px-5 pt-28.5 pb-20 lg:px-8 lg:pt-42 xl:px-16 xl:pt-44.5">
      <div className="mb-6 flex flex-col gap-5 lg:mb-11 lg:flex-row lg:justify-between xl:mb-15 xl:items-center">
        <Title title="News" />
        <SearchField variant="news" value={keyword} onSearch={onSearchHandler} />
      </div>
      <NewsList />
      {totalPages > 1 && (
        <Pagination currentPage={page} totalPages={totalPages} onChange={handlePageChange} />
      )}
    </section>
  )
}

export default NewsPage
