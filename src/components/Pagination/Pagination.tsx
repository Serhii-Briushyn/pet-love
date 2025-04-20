import clsx from "clsx";
import { useScreenType } from "utils/useScreenType";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onChange,
}) => {
  const screen = useScreenType();

  if (totalPages <= 1) return null;

  const isMobile = screen === "mobile";

  const getPages = () => {
    const pages: (number | string)[] = [];

    const visibleCount = isMobile ? 2 : 3;

    if (totalPages <= visibleCount + 1) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= totalPages - visibleCount) {
        pages.push(currentPage);
        for (let i = 1; i < visibleCount; i++) {
          const next = currentPage + i;
          if (next <= totalPages) pages.push(next);
        }
        if (currentPage + visibleCount <= totalPages) {
          pages.push("...");
        }
      } else {
        if (totalPages - visibleCount > 1) {
          pages.push("...");
        }
        for (let i = visibleCount - 1; i >= 0; i--) {
          const page = totalPages - i;
          pages.push(page);
        }
      }
    }

    return pages;
  };

  const pages = getPages();

  const base =
    "w-10 h-10 flex items-center justify-center rounded-full border font-bold transition-all duration-200 ease-in tablet:w-11 tablet:h-11 tablet:text-lg";

  const active = "border-primary bg-primary text-white pointer-events-none";

  const defaultBtn = "border-black/5 cursor-pointer hover:border-primary";

  const arrow =
    "border-black/20 group cursor-pointer hover:border-primary disabled:border-black/5 disabled:pointer-events-none";

  const icon =
    "w-5 h-5 fill-black group-disabled:fill-black/50 tablet:w-6 tablet:h-6";

  return (
    <div className="flex justify-between items-center tablet:justify-center tablet:gap-6">
      <div className="flex items-center mobile:gap-1.5">
        <button
          onClick={() => onChange(1)}
          disabled={currentPage === 1}
          className={clsx(base, arrow)}
        >
          <span className="relative flex w-[27px] h-5 tablet:w-[31px] tablet:h-6">
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

      <div className="flex items-center mobile:gap-2.5">
        {pages.map((p, idx) =>
          typeof p === "string" ? (
            <span
              key={`dots-${idx}`}
              className={clsx(base, "border-black/5 pointer-events-none")}
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
          )
        )}
      </div>

      <div className="flex items-center mobile:gap-1.5">
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
          <span className="relative flex w-[27px] h-5 tablet:w-[31px] tablet:h-6">
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
  );
};

export default Pagination;
