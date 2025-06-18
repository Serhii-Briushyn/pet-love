import { useState } from "react"
import { useSelector } from "react-redux"
import clsx from "clsx"

import { selectFavorites, selectViewed } from "@store/users/selectors"
import NoticesItem from "@components/NoticesItem/NoticesItem"

const MyNotices = () => {
  const [activeTab, setActiveTab] = useState<"favorites" | "viewed">("favorites")

  const favorites = useSelector(selectFavorites)
  const viewed = useSelector(selectViewed)

  const isFavorites = activeTab === "favorites"
  const isViewed = activeTab === "viewed"

  const notices = isFavorites ? favorites : viewed

  const baseBtnClasses =
    "h-10.5 min-w-30 rounded-4xl border border-transparent px-3 tracking-tight transition-all duration-200 ease-in lg:h-12 lg:min-w-36 dark:text-white"

  const activeBtnClasses =
    "hover:border-primary dark:bg-dark-secondary cursor-pointer bg-white text-black dark:border-white/40 dark:text-white"

  return (
    <div className="flex w-full flex-col overflow-hidden xl:max-h-screen xl:pt-10">
      <div className="mb-5 flex gap-2 xl:mb-8">
        <button
          className={clsx(baseBtnClasses, {
            "bg-primary text-white": isFavorites,
            [activeBtnClasses]: !isFavorites,
          })}
          onClick={() => setActiveTab("favorites")}
        >
          My favorite pets
        </button>
        <button
          className={clsx(baseBtnClasses, {
            "bg-primary text-white": isViewed,
            [activeBtnClasses]: !isViewed,
          })}
          onClick={() => setActiveTab("viewed")}
        >
          Viewed
        </button>
      </div>
      {!notices.length ? (
        <div className="flex w-full items-center justify-center pt-15 lg:pt-40">
          {isFavorites ? (
            <p className="max-w-115 text-center">
              Oops,{" "}
              <span className="text-primary font-bold">looks like there aren't any furries</span> on
              our adorable page yet. Do not worry! View your pets on the "find your favorite pet"
              page and add them to your favorites.
            </p>
          ) : (
            <p className="text-center">No notices yet</p>
          )}
        </div>
      ) : (
        <ul className="profile-scrollbar grid h-max gap-5 lg:grid-cols-2 xl:max-h-246 xl:gap-6 xl:overflow-y-auto xl:pr-1">
          {notices.map((notice) => (
            <NoticesItem key={notice._id} notice={notice} context={activeTab} />
          ))}
        </ul>
      )}
    </div>
  )
}

export default MyNotices
