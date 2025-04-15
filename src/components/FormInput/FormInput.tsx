import { InputHTMLAttributes } from "react"
import { FieldError } from "react-hook-form"

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: string
  placeholder: string
  error?: FieldError
  touched?: boolean
  successMessage?: string
}

const FormInput = ({
  type,
  placeholder,
  error,
  touched,
  successMessage,
  value,
  ...rest
}: FormInputProps) => {
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
          type={type}
          placeholder={placeholder}
          autoComplete={type}
          {...rest}
        />
        {touched && value && (
          <div className="tablet:w-5.5 tablet:h-5.5 absolute top-1/2 right-3 h-4.5 w-4.5 -translate-y-1/2">
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

export default FormInput
