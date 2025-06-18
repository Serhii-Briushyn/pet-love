import clsx from "clsx"
import { useThemeColor } from "@hooks/useThemeColor"

const ColorPicker = () => {
  const { activeColor, setActiveColor, colorOptions } = useThemeColor()

  return (
    <ul className="flex flex-wrap justify-center gap-x-3 gap-y-1">
      {colorOptions.map((color) => (
        <li key={color.primary}>
          <button
            type="button"
            aria-label={`Set theme color to ${color.name}`}
            className={clsx(
              "size-7 rounded-full transition-all duration-200 ease-in",
              activeColor.primary === color.primary
                ? "opacity-100"
                : "cursor-pointer opacity-40 hover:opacity-100",
            )}
            style={{ backgroundColor: `var(${color.primary})` }}
            onClick={() => setActiveColor(color)}
          />
        </li>
      ))}
    </ul>
  )
}

export default ColorPicker
