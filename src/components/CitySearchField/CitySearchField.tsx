import { FC, useState, useEffect, useMemo, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import toast from "react-hot-toast"

import { CityOption } from "@store/cities/types"
import { filterCitiesByLabel } from "@helpers/filterCitiesByLabel"
import { findExactCityMatch } from "@helpers/findExactCityMatch"
import { useDebouncedValue } from "@hooks/useDebouncedValue"

type CitySearchFieldProps = {
  cities?: CityOption[]
  value: string
  onSearch: (value: string) => void
}

const CitySearchField: FC<CitySearchFieldProps> = ({ cities = [], value, onSearch }) => {
  const [inputValue, setInputValue] = useState("")
  const [isDropdownOpen, setDropdownOpen] = useState(false)
  const [lastSubmittedValue, setLastSubmittedValue] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const debouncedInput = useDebouncedValue(inputValue, 200)

  useEffect(() => {
    const matched = cities.find((city) => city.value === value)
    setInputValue(matched?.label || "")
  }, [value, cities])

  const filteredCities = useMemo(() => {
    if (!cities.length) return []
    return filterCitiesByLabel(cities, debouncedInput)
  }, [debouncedInput, cities])

  const handleSelect = (city: CityOption) => {
    setInputValue(city.label)
    setDropdownOpen(false)
  }

  const handleSubmit = useCallback(() => {
    const matched = findExactCityMatch(cities, inputValue)
    if (!matched) {
      toast.error("Please select a city from the list")
      return
    }
    if (matched.value === lastSubmittedValue) return

    setLastSubmittedValue(matched.value)
    onSearch(matched.value)
  }, [cities, inputValue, lastSubmittedValue, onSearch])

  const handleClear = () => {
    if (value) {
      onSearch("")
      setLastSubmittedValue(null)
    } else {
      setInputValue("")
    }
  }

  const showDropdown = isDropdownOpen && inputValue.trim().length > 0

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}
      className="relative"
    >
      <div className="relative flex items-center">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search city"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
          className="hover:border-primary focus:border-primary dark:bg-dark-secondary h-10.5 w-full shrink-0 rounded-4xl border border-transparent bg-white pr-15 pl-3 transition-all duration-200 ease-in outline-none placeholder:text-black lg:h-12 lg:w-56.5 lg:pl-3.5 dark:border-white/40 dark:placeholder:text-white"
        />

        <div className="absolute top-1/2 right-3 flex -translate-y-1/2 items-center gap-1 lg:right-3.5">
          {inputValue && (
            <button
              type="button"
              onClick={handleClear}
              className="cursor-pointer transition-transform hover:scale-110"
              aria-label="Clear input"
            >
              <svg className="h-5 w-5 fill-none stroke-black dark:stroke-white">
                <use href="/sprite.svg#icon-close" />
              </svg>
            </button>
          )}
          <button
            type="submit"
            className="cursor-pointer transition-transform hover:scale-110"
            aria-label="Submit search"
          >
            <svg className="h-5 w-5 fill-none stroke-black dark:stroke-white">
              <use href="/sprite.svg#icon-search" />
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showDropdown && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="custom-scrollbar dark:bg-dark-secondary absolute z-10 mt-1 max-h-45 w-full overflow-y-auto rounded-2xl bg-white p-3 lg:p-3.5 dark:border dark:border-white/40"
          >
            {filteredCities.length > 0 ? (
              filteredCities.map((city) => (
                <li
                  key={city.value}
                  role="option"
                  aria-selected={city.value === value}
                  title={city.label}
                  className="hover:text-primary mb-2 w-full cursor-pointer truncate text-black/60 transition-all duration-200 ease-in last:mb-0 dark:text-white/60"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleSelect(city)
                  }}
                >
                  {city.label}
                </li>
              ))
            ) : (
              <li className="text-black/60 italic select-none dark:text-white/60">
                No results found
              </li>
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </form>
  )
}

export default CitySearchField
