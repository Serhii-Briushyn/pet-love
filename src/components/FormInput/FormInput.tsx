import clsx from "clsx"
import { InputHTMLAttributes } from "react"

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: string
  placeholder: string
  autoComplete?: string
  error?: string
  touched?: boolean
  successMessage?: string
}

const FormInput = ({
  type,
  placeholder,
  autoComplete,
  error,
  touched,
  successMessage,
  value,
  ...rest
}: FormInputProps) => {
  const inputClass = clsx(
    "hover:border-primary focus:border-primary w-full rounded-4xl border p-3 transition-all duration-200 ease-in outline-none lg:p-4",
    error ? "border-red" : "border-black/15 dark:border-white/40",
  )

  return (
    <label>
      <div className="relative leading-tight">
        <input
          className={inputClass}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          {...rest}
        />
        {touched && value && !error && (
          <div className="absolute top-1/2 right-3 h-4.5 w-4.5 -translate-y-1/2 lg:h-5.5 lg:w-5.5">
            <svg className="stroke-green h-full w-full fill-none">
              <use href="/sprite.svg#icon-check" />
            </svg>
          </div>
        )}
      </div>
      {error && <p className="text-red text-[10px] lg:text-xs">{error}</p>}
      {successMessage && touched && value && !error && (
        <p className="text-green text-[10px] lg:text-xs">{successMessage}</p>
      )}
    </label>
  )
}

export default FormInput
