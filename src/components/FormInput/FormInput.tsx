import clsx from "clsx"
import { InputHTMLAttributes } from "react"
import { FieldError } from "react-hook-form"

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: string
  placeholder: string
  autoComplete: string
  error?: FieldError
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
    "w-full rounded-4xl border p-3 transition-all duration-200 ease-in outline-none lg:p-4",
    {
      "border-red": error,
      "border-green": touched && !error,
      "hover:border-primary focus:border-primary border-black/15": !error && !touched,
    },
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
        {touched && value && (
          <div className="absolute top-1/2 right-3 h-4.5 w-4.5 -translate-y-1/2 lg:h-5.5 lg:w-5.5">
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
      {error && <div className="text-red text-[10px] lg:text-xs">{error.message}</div>}
      {touched && !error && value && (
        <div className="text-green text-[10px] lg:text-xs">{successMessage}</div>
      )}
    </label>
  )
}

export default FormInput
