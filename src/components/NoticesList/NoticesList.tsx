import { useSelector } from "react-redux"
import { selectNotices } from "@store/notices/selectors"
import NoticesItem from "@components/NoticesItem/NoticesItem"

const NoticesList = () => {
  const notices = useSelector(selectNotices)

  if (!notices.length) return <p>No notices found.</p>

  return (
    <ul className="mb-11 grid gap-5 lg:mb-15 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-8 xl:gap-y-10">
      {notices.map((notice) => (
        <NoticesItem key={notice._id} notice={notice} />
      ))}
    </ul>
  )
}

export default NoticesList
