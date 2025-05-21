import { useEffect } from "react"
import { motion } from "framer-motion"
import ReactDOM from "react-dom"
import clsx from "clsx"

type ModalProps = {
  onClose: () => void
  children: React.ReactNode
  variant?: "default" | "drawer"
  isHome?: boolean
}

const Modal: React.FC<ModalProps> = ({ onClose, children, variant = "default", isHome }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    document.addEventListener("keydown", handleEsc)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleEsc)
      document.body.style.overflow = ""
    }
  }, [onClose])

  const isDrawer = variant === "drawer"
  const isDefault = variant === "default"

  return ReactDOM.createPortal(
    <motion.div
      className={clsx(
        "font-manrope fixed inset-0 z-50 flex items-center justify-center bg-black/30 text-sm lg:text-base",
        { "xl:hidden": isDrawer },
      )}
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className={clsx("relative z-50", {
          "ml-auto h-full w-auto": isDrawer,
          "rounded-main": isDefault,
        })}
        onClick={(e) => e.stopPropagation()}
        initial={isDrawer ? { x: "100%" } : { opacity: 0, scale: 0.9 }}
        animate={isDrawer ? { x: 0 } : { opacity: 1, scale: 1 }}
        exit={isDrawer ? { x: "100%" } : { opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <button
          onClick={onClose}
          className={clsx("absolute cursor-pointer", {
            "top-7 right-5 z-10 h-8 w-8 lg:top-[39px] lg:right-8 lg:h-9 lg:w-9": isDrawer,
            "top-5 right-5 h-6 w-6": isDefault,
          })}
        >
          <svg className={`h-full w-full ${isDrawer && !isHome ? "stroke-white" : "stroke-black"}`}>
            <use href="/sprite.svg#icon-close" />
          </svg>
        </button>

        {children}
      </motion.div>
    </motion.div>,

    document.getElementById("modal-root") as HTMLElement,
  )
}

export default Modal
