import { motion, AnimatePresence } from "framer-motion"
import clsx from "clsx"

import { capitalizeFirstLetter } from "@utils/capitalizeFirstLetter"
import { useDropdown } from "@hooks/useDropdown"

type DropdownSelectProps = {
  variant: "filter" | "species"
  placeholder: string
  value: string
  options: string[]
  onChange: (value: string) => void
  error?: string
}

const DropdownSelect: React.FC<DropdownSelectProps> = ({
  variant,
  placeholder,
  value,
  options,
  onChange,
  error,
}) => {
  const { isOpen, toggleOpen, close, wrapperRef } = useDropdown()

  const handleSelect = (val: string) => {
    onChange(val)
    close()
  }

  const isFilter = variant === "filter"
  const isSpecies = variant === "species"

  const wrapperClass = clsx("relative w-full", {
    "h-10.5 lg:h-12 lg:max-w-47.5": isFilter,
    "h-full flex-1/2": isSpecies,
  })

  const buttonClass = clsx(
    "dark:bg-dark-secondary hover:border-primary focus:border-primary flex h-full w-full cursor-pointer items-center justify-between rounded-4xl border bg-white px-3 transition-all duration-200 ease-in lg:px-3.5",
    {
      "border-transparent dark:border-white/40": isFilter,
      "text-black/50 dark:text-white/50": isSpecies && !value,
      "border-black/15 dark:border-white/40": isSpecies && !error,
      "border-red": error,
    },
  )

  const listClass = clsx(
    "custom-scrollbar dark:bg-dark-secondary absolute z-10 w-full overflow-y-auto rounded-2xl border bg-white p-3 lg:p-3.5 dark:border-white/40",
    {
      "top-full mt-1 max-h-45 border-transparent": isFilter,
      "bottom-full mb-1 max-h-24 border-black/15 lg:max-h-36": isSpecies,
    },
  )

  const itemClass =
    "hover:text-primary mb-2 w-full cursor-pointer truncate  transition-all duration-200 ease-in last:mb-0"

  return (
    <div className={wrapperClass} ref={wrapperRef}>
      <button type="button" onClick={toggleOpen} className={buttonClass}>
        {capitalizeFirstLetter(value) || placeholder}
        <svg
          className={clsx(
            "size-4.5 fill-none stroke-black transition-all duration-200 ease-in lg:size-5 dark:stroke-white",
            { "rotate-180": isOpen },
          )}
        >
          <use href="/sprite.svg#icon-chevron-down" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={listClass}
          >
            {isFilter && (
              <li
                onClick={() => handleSelect("")}
                className={clsx(
                  itemClass,
                  value === "" ? "text-primary" : "text-black/60 dark:text-white/60",
                )}
              >
                Show all
              </li>
            )}

            {options.map((opt, index) => (
              <li
                key={`${opt}-${index}`}
                onClick={() => handleSelect(opt)}
                className={clsx(
                  itemClass,
                  value === opt ? "text-primary" : "text-black/60 dark:text-white/60",
                )}
              >
                {capitalizeFirstLetter(opt)}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      {isSpecies && error && <p className="text-red text-[10px] lg:text-xs">{error}</p>}
    </div>
  )
}

export default DropdownSelect
