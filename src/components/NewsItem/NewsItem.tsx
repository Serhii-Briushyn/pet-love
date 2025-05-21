import { News } from "@store/news/types"
import { formatDate } from "@utils/formatDate"

type Props = {
  item: News
}

const NewsItem: React.FC<Props> = ({ item }) => {
  const { title, text, date, url, imgUrl } = item

  return (
    <li className="flex flex-col gap-5 lg:gap-7">
      {imgUrl && (
        <img
          src={imgUrl}
          alt={title}
          className="h-47.5 w-full rounded-2xl object-cover lg:h-56.5"
          loading="lazy"
        />
      )}

      <div>
        <h3 className="mb-3 line-clamp-2 text-base font-bold lg:mb-3.5 lg:min-h-14 lg:text-xl">
          {title}
        </h3>
        <p className="mb-5 line-clamp-4 lg:mb-7 lg:min-h-24">{text}</p>
        <div className="flex items-center justify-between">
          <span className="text-black/50">{formatDate(date, "/")}</span>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary-hover cursor-pointer underline transition-all duration-200 ease-in"
          >
            Read more
          </a>
        </div>
      </div>
    </li>
  )
}

export default NewsItem
