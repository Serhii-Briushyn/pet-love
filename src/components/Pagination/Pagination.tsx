import clsx from "clsx"

import { getPaginationPages } from "@utils/getPaginationPages"
import { useScreenType } from "@utils/getScreenType"

type PaginationProps = {
  currentPage: number
  totalPages: number
  onChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onChange }) => {
  const screen = useScreenType()

  if (totalPages <= 1) return null

  const isMobile = screen === "mobile"

  const pages = getPaginationPages(currentPage, totalPages, isMobile)

  const base =
    "flex h-10 w-10 items-center justify-center rounded-full border font-bold transition-all duration-200 ease-in lg:h-11 lg:w-11 lg:text-lg"

  const active = "border-primary bg-primary pointer-events-none text-white"

  const defaultBtn = "hover:border-primary cursor-pointer border-black/5 dark:border-white/40"

  const arrow =
    "group hover:border-primary cursor-pointer border-black/20 disabled:pointer-events-none disabled:border-black/5 dark:border-white/40 disabled:dark:dark:border-white/10"

  const icon = clsx(
    "h-5 w-5 fill-black group-disabled:fill-black/50 lg:h-6 lg:w-6 dark:fill-white dark:group-disabled:fill-white/50",
  )

  return (
    <div className="flex items-center justify-between lg:justify-center lg:gap-6">
      <div className="flex items-center sm:gap-1.5">
        <button
          onClick={() => onChange(1)}
          disabled={currentPage === 1}
          className={clsx(base, arrow)}
        >
          <span className="relative flex h-5 w-[27px] lg:h-6 lg:w-[31px]">
            <svg className={clsx(icon, "absolute left-0")}>
              <use href="/sprite.svg#icon-chevron-left" />
            </svg>
            <svg className={clsx(icon, "absolute right-0")}>
              <use href="/sprite.svg#icon-chevron-left" />
            </svg>
          </span>
        </button>

        <button
          onClick={() => onChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={clsx(base, arrow)}
        >
          <svg className={icon}>
            <use href="/sprite.svg#icon-chevron-left" />
          </svg>
        </button>
      </div>

      <div className="flex items-center sm:gap-2.5">
        {pages.map((p, idx) =>
          typeof p === "string" ? (
            <span
              key={`dots-${idx}`}
              className={clsx(base, "pointer-events-none border-black/5 dark:border-white/40")}
            >
              ...
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onChange(p)}
              className={clsx(base, p === currentPage ? active : defaultBtn)}
            >
              {p}
            </button>
          ),
        )}
      </div>

      <div className="flex items-center sm:gap-1.5">
        <button
          onClick={() => onChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={clsx(base, arrow)}
        >
          <svg className={icon}>
            <use href="/sprite.svg#icon-chevron-right" />
          </svg>
        </button>

        <button
          onClick={() => onChange(totalPages)}
          disabled={currentPage === totalPages}
          className={clsx(base, arrow)}
        >
          <span className="relative flex h-5 w-[27px] lg:h-6 lg:w-[31px]">
            <svg className={clsx(icon, "absolute right-0")}>
              <use href="/sprite.svg#icon-chevron-right" />
            </svg>
            <svg className={clsx(icon, "absolute left-0")}>
              <use href="/sprite.svg#icon-chevron-right" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  )
}

export default Pagination
