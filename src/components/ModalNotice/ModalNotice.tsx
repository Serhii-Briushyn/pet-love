import { useDispatch, useSelector } from "react-redux"

import { AppDispatch } from "@store/store"
import { selectFavoritesIds } from "@store/users/selectors"
import { selectSelectedNotice } from "@store/notices/selectors"
import { capitalizeFirstLetter } from "@utils/capitalizeFirstLetter"
import { formatDate } from "@utils/formatDate"
import { toggleFavorite } from "@utils/handleFavoriteToggle"
import { formatPrice } from "@utils/formatPrice"

const ModalNotice = () => {
  const dispatch = useDispatch<AppDispatch>()
  const notice = useSelector(selectSelectedNotice)
  const favoritesIds = useSelector(selectFavoritesIds)

  if (!notice) return null

  const isFavorite = favoritesIds.includes(notice._id)

  const handleFavoriteToggle = () => {
    toggleFavorite(dispatch, notice._id, isFavorite)
  }

  const hasContact = notice.user.phone || notice.user.email

  const contactHref = notice?.user.phone
    ? `tel:${notice.user.phone}`
    : notice?.user.email
      ? `mailto:${notice.user.email}`
      : "#"

  return (
    <div className="dark:bg-dark-secondary flex flex-col items-center rounded-4xl bg-white px-7 py-10 sm:w-83 lg:w-118 lg:p-10">
      <div className="relative mb-5 h-30 w-30 lg:mb-4 lg:h-37.5 lg:w-37.5">
        <img
          src={notice.imgURL}
          alt={notice.title}
          className="h-full w-full rounded-full object-cover"
        />
        <span className="bg-secondary text-primary absolute top-0 left-0 rounded-4xl px-3.5 py-2 text-xs lg:text-sm">
          {capitalizeFirstLetter(notice.category)}
        </span>
      </div>

      <div className="mb-6 flex flex-col items-center gap-2.5 text-center lg:mb-5">
        <h2 className="text-base font-bold lg:text-lg">{notice.title}</h2>
        <span className="flex items-center gap-1 text-sm">
          <svg className="fill-primary h-4 w-4">
            <use href="/sprite.svg#icon-eye-fill" />
          </svg>
          {notice.popularity} viewed
        </span>
      </div>

      <ul className="mb-4 flex justify-center gap-3.5 text-center lg:gap-4">
        <li className="flex flex-col gap-0.5 text-xs/tight">
          <span className="text-[10px] text-black/50 dark:text-white/50">Name:</span>
          <span>{notice.name}</span>
        </li>
        <li className="flex flex-col gap-0.5 text-xs/tight">
          <span className="text-[10px] text-black/50 dark:text-white/50">Birthday:</span>
          <span>{formatDate(notice.birthday)}</span>
        </li>
        <li className="flex flex-col gap-0.5 text-xs/tight">
          <span className="text-[10px] text-black/50 dark:text-white/50">Sex:</span>
          <span>{notice.sex}</span>
        </li>
        <li className="flex flex-col gap-0.5 text-xs/tight">
          <span className="text-[10px] text-black/50 dark:text-white/50">Species:</span>
          <span> {notice.species}</span>
        </li>
      </ul>

      <p className="mb-8 text-center text-sm">{notice.comment}</p>
      <span className="mb-5 inline-block text-base font-bold lg:text-lg">
        {formatPrice(notice)}
      </span>

      <div className="flex flex-wrap items-center justify-center gap-2.5">
        <button
          onClick={handleFavoriteToggle}
          className="bg-primary group hover:bg-primary-hover flex h-11 w-33 cursor-pointer items-center justify-center gap-2 rounded-4xl text-base text-white transition-all duration-200 ease-in lg:h-12 lg:w-40"
        >
          {isFavorite ? "Remove" : "Add to"}
          <svg
            className={`h-4.5 w-4.5 stroke-white transition-all duration-200 ease-in ${isFavorite ? "fill-white group-hover:fill-transparent" : "fill-transparent group-hover:fill-white"}`}
          >
            <use href="/sprite.svg#icon-heart" />
          </svg>
        </button>

        <a
          href={hasContact ? contactHref : undefined}
          onClick={(e) => {
            if (!hasContact) e.preventDefault()
          }}
          className={`group flex h-11 w-33 items-center justify-center gap-2 rounded-4xl text-base transition-all duration-200 ease-in lg:h-12 lg:w-40 ${
            hasContact
              ? "hover:bg-secondary-hover bg-secondary text-primary cursor-pointer"
              : "cursor-not-allowed border-gray-300 bg-gray-100 text-gray-400"
          }`}
        >
          Contact
        </a>
      </div>
    </div>
  )
}

export default ModalNotice
