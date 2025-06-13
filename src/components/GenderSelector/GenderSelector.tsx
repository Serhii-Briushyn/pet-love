import clsx from "clsx"
import { FieldError } from "react-hook-form"

type GenderSelectorProps = {
  value: string
  error?: FieldError
  touched?: boolean
}

const GenderSelector: React.FC<GenderSelectorProps> = ({ value, error, ...rest }) => {
  const isFemale = value === "female"
  const isMale = value === "male"
  const isMultiple = value === "multiple"

  const baseButtonClass = clsx(
    "group flex size-8 items-center justify-center rounded-full transition-all duration-200 ease-in lg:size-10",
    error && "border-red border",
  )

  return (
    <div className="max-lg:mb-2 lg:absolute lg:top-0 lg:left-0">
      <div className="flex gap-2">
        <label
          title="Female"
          className={clsx(
            baseButtonClass,
            isFemale ? "bg-pink" : "bg-pink/10 hover:bg-pink cursor-pointer",
          )}
        >
          <input
            type="radio"
            name="sex"
            value="female"
            checked={isFemale}
            className="hidden"
            {...rest}
          />
          <svg
            className={clsx(
              "size-5 fill-none transition-all duration-200 ease-in lg:size-6",
              isFemale ? "stroke-white" : "stroke-pink group-hover:stroke-white",
            )}
          >
            <use href={`/sprite.svg#icon-female`} />
          </svg>
        </label>

        <label
          title="Male"
          className={clsx(
            baseButtonClass,
            isMale ? "bg-blue" : "bg-blue/10 hover:bg-blue cursor-pointer",
          )}
        >
          <input
            type="radio"
            name="sex"
            value="male"
            checked={isMale}
            className="hidden"
            {...rest}
          />
          <svg
            className={clsx(
              "size-5 fill-none transition-all duration-200 ease-in lg:size-6",
              isMale ? "stroke-white" : "stroke-blue group-hover:stroke-white",
            )}
          >
            <use href={`/sprite.svg#icon-male`} />
          </svg>
        </label>

        <label
          title="Multiple"
          className={clsx(
            baseButtonClass,
            isMultiple ? "bg-yellow" : "bg-yellow-light hover:bg-yellow cursor-pointer",
          )}
        >
          <input
            type="radio"
            name="sex"
            value="multiple"
            checked={isMultiple}
            className="hidden"
            {...rest}
          />
          <svg
            className={clsx(
              "size-5 transition-all duration-200 ease-in lg:size-6",
              isMultiple ? "fill-white" : "fill-yellow group-hover:fill-white",
            )}
          >
            <use href={`/sprite.svg#icon-gender`} />
          </svg>
        </label>
      </div>
      {error && <p className="text-red text-[10px] lg:text-xs">{error.message}</p>}
    </div>
  )
}

export default GenderSelector
