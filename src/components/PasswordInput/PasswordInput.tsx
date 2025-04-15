import { InputHTMLAttributes } from "react"
import { FieldError } from "react-hook-form"

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: string
  placeholder: string
  error?: FieldError
  touched?: boolean
  show: boolean
  toggle: () => void
  successMessage?: string
}

const PasswordInput = ({
  type,
  placeholder,
  error,
  touched,
  show,
  toggle,
  successMessage,
  value,
  ...rest
}: PasswordInputProps) => {
  return (
    <label>
      <div className="relative">
        <input
          className={`rounded-main tablet:p-4 w-full border p-3 transition-all duration-200 ease-in outline-none ${
            error
              ? "border-red"
              : touched
                ? "border-green"
                : "hover:border-primary focus:border-primary border-black/15"
          }`}
          type={show ? "text" : "password"}
          placeholder={placeholder}
          autoComplete={type}
          {...rest}
        />

        <button
          type="button"
          onClick={toggle}
          className="tablet:right-4 tablet:w-5.5 tablet:h-5.5 group absolute top-1/2 right-3 h-4.5 w-4.5 -translate-y-1/2 cursor-pointer transition-all duration-200 ease-in"
        >
          <svg className="stroke-primary group-hover:stroke-primary-hover h-full w-full fill-none">
            <use href={show ? "/sprite.svg#icon-eye" : "/sprite.svg#icon-eye-off"} />
          </svg>
        </button>

        {touched && value && (
          <div className="tablet:w-5.5 tablet:h-5.5 absolute top-1/2 right-12 h-4.5 w-4.5 -translate-y-1/2">
            {error ? (
              <svg className="stroke-red h-full w-full fill-none">
                <use href="/sprite.svg#icon-close" />
              </svg>
            ) : (
              <svg className="stroke-green h-full w-full fill-none">
                <use href="/sprite.svg#icon-check" />
              </svg>
            )}
          </div>
        )}
      </div>
      {error && <div className="text-red tablet:text-xs text-[10px]">{error.message}</div>}
      {touched && !error && value && (
        <div className="text-green tablet:text-xs text-[10px]">{successMessage}</div>
      )}
    </label>
  )
}

export default PasswordInput
