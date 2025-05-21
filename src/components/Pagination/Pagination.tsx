import { getPaginationPages } from "@utils/getPaginationPages"
import { useScreenType } from "@utils/getScreenType"
import clsx from "clsx"

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
    "w-10 h-10 flex items-center justify-center rounded-full border font-bold transition-all duration-200 ease-in lg:w-11 lg:h-11 lg:text-lg"

  const active = "border-primary bg-primary text-white pointer-events-none"

  const defaultBtn = "border-black/5 cursor-pointer hover:border-primary"

  const arrow =
    "border-black/20 group cursor-pointer hover:border-primary disabled:border-black/5 disabled:pointer-events-none"

  const icon = "w-5 h-5 fill-black group-disabled:fill-black/50 lg:w-6 lg:h-6"

  return (
    <div className="flex items-center justify-between lg:justify-center lg:gap-6">
      <div className="mobile:gap-1.5 flex items-center">
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

      <div className="mobile:gap-2.5 flex items-center">
        {pages.map((p, idx) =>
          typeof p === "string" ? (
            <span key={`dots-${idx}`} className={clsx(base, "pointer-events-none border-black/5")}>
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

      <div className="mobile:gap-1.5 flex items-center">
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
