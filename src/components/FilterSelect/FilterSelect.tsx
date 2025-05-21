import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import clsx from "clsx"

import { capitalizeFirstLetter } from "@utils/capitalizeFirstLetter"

type FilterSelectProps = {
  text: string
  value: string
  options: string[]
  onChange: (value: string) => void
}

const FilterSelect: React.FC<FilterSelectProps> = ({ text, value, options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const toggleOpen = () => setIsOpen((prev) => !prev)

  const handleSelect = (val: string) => {
    onChange(val)
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const optionClass =
    "hover:text-primary mb-2 w-full cursor-pointer truncate text-black/60 transition-all duration-200 ease-in last:mb-0"

  return (
    <div className="relative w-full lg:h-12 lg:max-w-47.5" ref={wrapperRef}>
      <button
        type="button"
        onClick={toggleOpen}
        className="hover:border-primary focus:border-primary flex h-full w-full cursor-pointer items-center justify-between rounded-4xl border border-transparent bg-white px-3 transition-all duration-200 ease-in lg:px-3.5"
      >
        {value ? capitalizeFirstLetter(value) : text}
        <svg
          className={clsx(
            "h-4.5 w-4.5 fill-none stroke-black transition-all duration-200 ease-in",
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
            className="custom-scrollbar absolute z-10 mt-1 max-h-45 w-full overflow-y-auto rounded-2xl bg-white p-3 lg:p-3.5"
          >
            <li
              onClick={() => handleSelect("")}
              className={clsx(optionClass, { "text-primary": value === "" })}
            >
              Show all
            </li>
            {options.map((opt, index) => (
              <li
                key={`${opt}-${index}`}
                onClick={() => handleSelect(opt)}
                className={clsx(optionClass, { "text-primary": value === opt })}
              >
                {capitalizeFirstLetter(opt)}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

export default FilterSelect
