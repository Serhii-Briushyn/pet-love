import { format, parse } from "date-fns"
import { DayPicker } from "react-day-picker"
import { AnimatePresence, motion } from "framer-motion"
import "react-day-picker/dist/style.css"
import clsx from "clsx"

import { useDropdown } from "@hooks/useDropdown"

type DateInputProps = {
  value: string
  onChange: (value: string) => void
  error?: string
}

const DateInput: React.FC<DateInputProps> = ({ value, onChange, error }) => {
  const { isOpen, toggleOpen, wrapperRef } = useDropdown()

  const selected = value ? parse(value, "yyyy-MM-dd", new Date()) : undefined
  const formattedDate = value ? format(value, "dd.MM.yyyy") : ""

  const handleSelect = (date?: Date) => {
    if (date) onChange(format(date, "yyyy-MM-dd"))
  }

  const buttonClass = clsx(
    "dark:bg-dark-secondary hover:border-primary focus:border-primary flex h-full w-full cursor-pointer items-center justify-between rounded-4xl border bg-white px-3 transition-all duration-200 ease-in lg:px-3.5",
    {
      "text-black/50 dark:text-white/50": !value,
      "border-black/15 dark:border-white/40": !error,
      "border-red": error,
    },
  )

  return (
    <div ref={wrapperRef} className="relative h-full w-full flex-1/2">
      <button type="button" onClick={toggleOpen} className={buttonClass}>
        {formattedDate || "Choose date"}
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
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="dark:bg-dark-secondary absolute bottom-full z-10 mb-1 rounded-2xl border border-black/15 bg-white p-2 dark:border-white/40"
          >
            <DayPicker
              mode="single"
              selected={selected}
              onSelect={handleSelect}
              captionLayout="dropdown"
              disabled={{ after: new Date() }}
              classNames={{
                day: "hover:bg-primary no-hover-if-disabled rounded-full hover:text-white",
                chevron: "fill-primary",
                selected: "bg-primary border-primary text-white",
                today: "text-primary",
                dropdowns: "flex cursor-pointer gap-2 text-sm outline-none lg:text-base",
                dropdown:
                  "dark:bg-dark-secondary cursor-inherit custom-scrollbar absolute z-10 w-max cursor-pointer p-2 text-sm opacity-0 lg:text-base",
                caption_label: "relative inline-flex items-center whitespace-nowrap outline-none",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {error && <p className="text-red text-[10px] lg:text-xs">{error}</p>}
    </div>
  )
}
export default DateInput
