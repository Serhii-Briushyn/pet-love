import { useSelector } from "react-redux"
import { selectNews } from "@store/news/selectors"
import NewsItem from "@components/NewsItem/NewsItem"

const NewsList = () => {
  const news = useSelector(selectNews)

  if (!news.length) return <p>No news found.</p>

  return (
    <ul className="mb-11 grid gap-5 lg:mb-15 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-8 xl:gap-y-10">
      {news.map((item) => (
        <NewsItem key={item._id} item={item} />
      ))}
    </ul>
  )
}

export default NewsList
