import { useCallback, useEffect, useRef, useState } from "react"
import clsx from "clsx"

import ColorPicker from "@components/ColorPicker/ColorPicker"
import ThemeToggle from "@components/ThemeToggle/ThemeToggle"

const StyleSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement | null>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  const toggleMenu = () => setIsOpen((prev) => !prev)

  const handleClickOutside = useCallback((event: MouseEvent) => {
    const target = event.target as Node
    const clickedOutsidePanel = panelRef.current && !panelRef.current.contains(target)
    const clickedOutsideButton = buttonRef.current && !buttonRef.current.contains(target)

    if (clickedOutsidePanel && clickedOutsideButton) {
      setIsOpen(false)
    }
  }, [])

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [handleClickOutside])

  return (
    <div
      className={clsx(
        "fixed top-80 right-0 z-50 flex -translate-y-1/2 transition-all duration-300 ease-in",
        isOpen ? "translate-x-0" : "translate-x-40",
      )}
    >
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        className="group bg-dark-secondary dark:bg-secondary flex h-max cursor-pointer items-center justify-center rounded-l-xl px-1.5 py-3"
      >
        <svg className="text-primary size-7 group-hover:animate-spin">
          <use href="/sprite.svg#icon-setting"></use>
        </svg>
      </button>

      <div ref={panelRef} className="bg-dark-secondary dark:bg-secondary w-40 rounded-bl-xl p-3">
        <div className="flex flex-col items-center gap-3">
          <ThemeToggle />
          <div className="border-primary w-full border-b" />
          <ColorPicker />
        </div>
      </div>
    </div>
  )
}

export default StyleSwitcher
