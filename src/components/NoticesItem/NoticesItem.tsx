import { useDispatch, useSelector } from "react-redux"
import toast from "react-hot-toast"
import clsx from "clsx"

import { AppDispatch } from "@store/store"
import { fetchNoticeById } from "@store/notices/operations"
import { selectFavoritesIds, selectIsLoggedIn } from "@store/users/selectors"
import { Notice } from "@store/notices/types"
import { openModal } from "@store/ui/slice"

import { toggleFavorite } from "@utils/handleFavoriteToggle"
import { formatNumberShort } from "@utils/formatNumberShort"
import { formatDate } from "@utils/formatDate"
import { formatPrice } from "@utils/formatPrice"

type Props = {
  notice: Notice
  context?: "favorites" | "viewed" | "default"
}

const NoticesItem: React.FC<Props> = ({ notice, context = "default" }) => {
  const dispatch = useDispatch<AppDispatch>()
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const favoritesIds = useSelector(selectFavoritesIds)

  const isFavorite = favoritesIds.includes(notice._id)
  const isDefault = context === "default"
  const isProfileFavorites = context === "favorites"
  const isProfileViewed = context === "viewed"

  const handleLearnMore = async () => {
    if (!isLoggedIn) {
      dispatch(openModal({ name: "attention" }))
      return
    }
    try {
      await dispatch(fetchNoticeById(notice._id)).unwrap()
      dispatch(openModal({ name: "notice" }))
    } catch (error) {
      toast.error(error as string)
    }
  }

  const handleFavoriteToggle = () => {
    if (!isLoggedIn) {
      dispatch(openModal({ name: "attention" }))
      return
    }
    toggleFavorite(dispatch, notice._id, isFavorite)
  }

  return (
    <li className="rounded-2xl bg-white p-6">
      <img
        src={notice.imgURL}
        alt={notice.title}
        className="mb-6 h-44.5 w-full rounded-2xl object-cover"
      />
      <div className="mb-2 flex items-center justify-between">
        <h3 title={notice.title} className="line-clamp-1 text-base font-bold break-all lg:text-lg">
          {notice.title}
        </h3>
        <span className="flex items-center gap-1">
          <svg className="fill-primary h-4 w-4">
            <use href="/sprite.svg#icon-eye-fill" />
          </svg>
          {formatNumberShort(notice.popularity)}
        </span>
      </div>
      <ul className="mb-4 flex items-center justify-between gap-3.5 lg:gap-4">
        <li className="flex flex-col gap-0.5 text-xs/tight">
          <span className="text-[10px] text-black/50">Name:</span>
          <span title={notice.name} className="line-clamp-1 break-all">
            {notice.name}
          </span>
        </li>
        <li className="flex flex-col gap-0.5 text-xs/tight">
          <span className="text-[10px] text-black/50">Birthday:</span>
          <span className="line-clamp-1">{formatDate(notice.birthday)}</span>
        </li>
        <li className="flex flex-col gap-0.5 text-xs/tight">
          <span className="text-[10px] text-black/50">Sex:</span>
          <span className="line-clamp-1">{notice.sex}</span>
        </li>
        <li className="flex flex-col gap-0.5 text-xs/tight">
          <span className="text-[10px] text-black/50">Species:</span>
          <span className="line-clamp-1"> {notice.species}</span>
        </li>
        <li className="flex flex-col gap-0.5 text-xs/tight">
          <span className="text-[10px] text-black/50">Category:</span>
          <span className="line-clamp-1">{notice.category}</span>
        </li>
      </ul>

      <p className="mb-6 line-clamp-2 min-h-9 text-sm/tight">{notice.comment}</p>

      <span className="mb-3 inline-block text-base font-bold lg:text-lg">
        {formatPrice(notice)}
      </span>

      <div className="flex h-11.5 items-center gap-2.5 lg:h-12">
        <button
          onClick={handleLearnMore}
          className="bg-primary hover:bg-primary-hover flex h-full w-full cursor-pointer items-center justify-center rounded-4xl text-white transition-all duration-200 ease-in"
        >
          Learn more
        </button>

        {!isProfileViewed && (
          <button
            onClick={handleFavoriteToggle}
            className="bg-secondary group hover:bg-secondary-hover flex h-full w-11.5 shrink-0 cursor-pointer items-center justify-center rounded-full transition-all duration-200 ease-in lg:w-12"
          >
            <svg
              className={clsx(
                "stroke-primary h-4.5 w-4.5 transition-all duration-200 ease-in",
                isFavorite && isDefault ? "fill-primary" : "fill-none",
              )}
            >
              {isDefault && <use href="/sprite.svg#icon-heart" />}
              {isProfileFavorites && <use href="/sprite.svg#icon-trash" />}
            </svg>
          </button>
        )}
      </div>
    </li>
  )
}

export default NoticesItem
