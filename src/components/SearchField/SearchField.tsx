import { useState, useEffect } from "react"
import clsx from "clsx"

type SearchFieldProps = {
  variant: "notices" | "news"
  value: string
  onSearch: (value: string) => void
}

const SearchField: React.FC<SearchFieldProps> = ({ variant, value, onSearch }) => {
  const [inputValue, setInputValue] = useState(value)

  useEffect(() => {
    setInputValue(value)
  }, [value])

  const handleClear = () => {
    if (value) {
      onSearch("")
    } else {
      setInputValue("")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(inputValue.trim())
  }

  const isNews = variant === "news"
  const isNotices = variant === "notices"

  const inputClass = clsx(
    "hover:border-primary focus:border-primary h-10.5 w-full rounded-4xl border pr-15 pl-3 transition-all duration-200 ease-in outline-none lg:h-12 lg:pl-3.5",
    {
      "border-black/15 lg:w-60": isNews,
      "shrink-0 border-transparent bg-white placeholder:text-black lg:w-66": isNotices,
    },
  )

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center">
      <input
        type="text"
        placeholder="Search"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className={inputClass}
      />
      <div className="absolute top-1/2 right-3 flex -translate-y-1/2 items-center gap-1">
        {inputValue && (
          <button
            type="button"
            onClick={handleClear}
            className="cursor-pointer transition-all duration-200 ease-in hover:scale-120"
            aria-label="Clear search"
          >
            <svg className="h-4.5 w-4.5 fill-amber-200 stroke-black">
              <use href="/sprite.svg#icon-close" />
            </svg>
          </button>
        )}
        <button
          type="submit"
          className="cursor-pointer transition-all duration-200 ease-in hover:scale-120"
          aria-label="Search"
        >
          <svg className="h-4.5 w-4.5 fill-none stroke-black">
            <use href="/sprite.svg#icon-search" />
          </svg>
        </button>
      </div>
    </form>
  )
}

export default SearchField
