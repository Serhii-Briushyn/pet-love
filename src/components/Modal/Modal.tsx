import { useEffect } from "react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import clsx from "clsx";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  variant?: "default" | "drawer";
  isInverted?: boolean;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  variant = "default",
  isInverted,
}) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);

    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isDrawer = variant === "drawer";
  const isDefault = variant === "default";

  return ReactDOM.createPortal(
    <motion.div
      className={clsx(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/30 font-manrope text-sm tablet:text-base",
        { "desktop:hidden": isDrawer }
      )}
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className={clsx("relative z-50", {
          "h-full w-auto ml-auto": isDrawer,
          "overflow-auto rounded-main": isDefault,
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
            "tablet:w-9 tablet:h-9 tablet:top-[39px] tablet:right-8 top-7 right-5 h-8 w-8":
              isDrawer,
            "top-5 right-5 h-6 w-6": isDefault,
          })}
        >
          <svg
            className={`h-full w-full ${isInverted ? "stroke-white" : "stroke-black"}`}
          >
            <use href="/sprite.svg#icon-close" />
          </svg>
        </button>

        {children}
      </motion.div>
    </motion.div>,

    document.body
  );
};

export default Modal;
