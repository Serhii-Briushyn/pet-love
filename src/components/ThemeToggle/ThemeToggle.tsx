import clsx from "clsx"
import { useEffect, useState } from "react"

const THEME_KEY = "petLoveTheme"

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(THEME_KEY)
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const initialDark = saved === "dark" || (!saved && prefersDark)

    applyTheme(initialDark)
  }, [])

  const applyTheme = (isDark: boolean) => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
    setIsDarkMode(isDark)
    localStorage.setItem(THEME_KEY, isDark ? "dark" : "light")
  }

  const handleToggle = (mode: "dark" | "light") => applyTheme(mode === "dark")

  const buttonClass = "group flex flex-1/2 items-center justify-center"
  const iconClass = "size-8 transition-all duration-200 ease-in"

  return (
    <div className="flex w-full items-center gap-3">
      <button
        className={clsx(buttonClass, isDarkMode && "cursor-pointer")}
        onClick={() => handleToggle("light")}
      >
        <svg
          className={clsx(
            iconClass,
            "text-yellow",
            isDarkMode && "opacity-40 group-hover:scale-110 group-hover:opacity-100",
          )}
        >
          <use href="/sprite.svg#icon-moon" />
        </svg>
      </button>
      <button
        className={clsx(buttonClass, !isDarkMode && "cursor-pointer")}
        onClick={() => handleToggle("dark")}
      >
        <svg
          className={clsx(
            iconClass,
            "text-blue",
            !isDarkMode && "opacity-40 group-hover:scale-110 group-hover:opacity-100",
          )}
        >
          <use href="/sprite.svg#icon-sun" />
        </svg>
      </button>
    </div>
  )
}

export default ThemeToggle
