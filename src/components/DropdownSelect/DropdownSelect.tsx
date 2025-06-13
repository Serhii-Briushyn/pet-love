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
    "flex h-full w-full cursor-pointer items-center justify-between rounded-4xl border bg-white px-3 transition-all duration-200 ease-in lg:px-3.5",
    {
      "hover:border-primary focus:border-primary border-transparent": isFilter,
      "hover:border-primary border-black/15": isSpecies && !error,
      "border-primary": isSpecies && value && !error,
      "text-black/50": isSpecies && !value && !error,
      "border-red": isSpecies && error,
    },
  )

  const listClass = clsx(
    "custom-scrollbar absolute z-10 w-full overflow-y-auto rounded-2xl bg-white p-3 lg:p-3.5",
    {
      "top-full mt-1 max-h-45": isFilter,
      "bottom-full mb-1 max-h-24 border border-black/15 lg:max-h-36": isSpecies,
    },
  )

  const itemClass =
    "hover:text-primary mb-2 w-full cursor-pointer truncate text-black/60 transition-all duration-200 ease-in last:mb-0"

  return (
    <div className={wrapperClass} ref={wrapperRef}>
      <button type="button" onClick={toggleOpen} className={buttonClass}>
        {capitalizeFirstLetter(value) || placeholder}
        <svg
          className={clsx(
            "size-4.5 fill-none stroke-black transition-all duration-200 ease-in lg:size-5",
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
                className={clsx(itemClass, { "text-primary": value === "" })}
              >
                Show all
              </li>
            )}

            {options.map((opt, index) => (
              <li
                key={`${opt}-${index}`}
                onClick={() => handleSelect(opt)}
                className={clsx(itemClass, { "text-primary": value === opt })}
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
