import clsx from "clsx";
import { InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: string;
  placeholder: string;
  error?: FieldError;
  touched?: boolean;
  successMessage?: string;
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
  const inputStyles = clsx(
    "w-full border rounded-main p-3 outline-none transition-all duration-200 ease-in tablet:p-4",
    {
      "border-red": error,
      "border-green": touched && !error,
      "hover:border-primary focus:border-primary border-black/15":
        !error && !touched,
    }
  );

  return (
    <label>
      <div className="relative leading-tight">
        <input
          className={inputStyles}
          type={type}
          placeholder={placeholder}
          autoComplete={type}
          {...rest}
        />
        {touched && value && (
          <div className="absolute h-4.5 w-4.5 top-1/2 right-3 -translate-y-1/2 tablet:w-5.5 tablet:h-5.5 ">
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
      {error && (
        <div className="text-red tablet:text-xs text-[10px]">
          {error.message}
        </div>
      )}
      {touched && !error && value && (
        <div className="text-green tablet:text-xs text-[10px]">
          {successMessage}
        </div>
      )}
    </label>
  );
};

export default FormInput;
