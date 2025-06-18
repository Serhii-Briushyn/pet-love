import { InputHTMLAttributes } from "react"
import clsx from "clsx"

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string
  autoComplete: string
  error?: string
  touched?: boolean
  show: boolean
  toggle: () => void
  successMessage?: string
}

const PasswordInput = ({
  placeholder,
  autoComplete,
  error,
  touched,
  show,
  toggle,
  successMessage,
  value,
  ...rest
}: PasswordInputProps) => {
  const inputClass = clsx(
    "hover:border-primary focus:border-primary w-full rounded-4xl border p-3 transition-all duration-200 ease-in outline-none lg:p-4",
    error ? "border-red" : "border-black/15 dark:border-white/40",
  )

  return (
    <label>
      <div className="relative leading-tight">
        <input
          className={inputClass}
          type={show ? "text" : "password"}
          placeholder={placeholder}
          autoComplete={autoComplete}
          {...rest}
        />

        <button
          type="button"
          onClick={toggle}
          className="group absolute top-1/2 right-3 h-4.5 w-4.5 -translate-y-1/2 cursor-pointer transition-all duration-200 ease-in lg:right-4 lg:h-5.5 lg:w-5.5"
        >
          <svg className="stroke-primary group-hover:stroke-primary-hover h-full w-full fill-none">
            <use href={show ? "/sprite.svg#icon-eye" : "/sprite.svg#icon-eye-off"} />
          </svg>
        </button>

        {touched && value && !error && (
          <div className="absolute top-1/2 right-12 h-4.5 w-4.5 -translate-y-1/2 lg:h-5.5 lg:w-5.5">
            <svg className="stroke-green h-full w-full fill-none">
              <use href="/sprite.svg#icon-check" />
            </svg>
          </div>
        )}
      </div>
      {error && <div className="text-red text-[10px] lg:text-xs">{error}</div>}
      {successMessage && touched && value && !error && (
        <p className="text-green text-[10px] lg:text-xs">{successMessage}</p>
      )}
    </label>
  )
}

export default PasswordInput
