// src/hooks/useThemeColor.ts
import { useEffect, useState } from "react"

export type Color = {
  name: string
  primary: string
  secondary: string
  primaryHover: string
  secondaryHover: string
}

const COLOR_STORAGE_KEY = "petLoveColor"

export const colorOptions: Color[] = [
  {
    name: "Yellow",
    primary: "--color-yellow",
    secondary: "--color-yellow-light",
    primaryHover: "--color-yellow-hover",
    secondaryHover: "--color-yellow-light-hover",
  },
  {
    name: "Purple",
    primary: "--color-purple",
    secondary: "--color-purple-light",
    primaryHover: "--color-purple-hover",
    secondaryHover: "--color-purple-light-hover",
  },
  {
    name: "Blue",
    primary: "--color-blue",
    secondary: "--color-blue-light",
    primaryHover: "--color-blue-hover",
    secondaryHover: "--color-blue-light-hover",
  },
  {
    name: "Green",
    primary: "--color-green",
    secondary: "--color-green-light",
    primaryHover: "--color-green-hover",
    secondaryHover: "--color-green-light-hover",
  },
  {
    name: "Pink",
    primary: "--color-pink",
    secondary: "--color-pink-light",
    primaryHover: "--color-pink-hover",
    secondaryHover: "--color-pink-light-hover",
  },
]

const applyColorVariables = (color: Color) => {
  const root = document.documentElement
  root.style.setProperty("--color-primary", `var(${color.primary})`)
  root.style.setProperty("--color-secondary", `var(${color.secondary})`)
  root.style.setProperty("--color-primary-hover", `var(${color.primaryHover})`)
  root.style.setProperty("--color-secondary-hover", `var(${color.secondaryHover})`)
}

const getInitialColor = (): Color => {
  const saved = localStorage.getItem(COLOR_STORAGE_KEY)
  const parsed = colorOptions.find((c) => c.primary === saved)
  return parsed || colorOptions[0]
}

export const useThemeColor = () => {
  const [activeColor, setActiveColor] = useState<Color>(() => getInitialColor())

  useEffect(() => {
    applyColorVariables(activeColor)
    localStorage.setItem(COLOR_STORAGE_KEY, activeColor.primary)
  }, [activeColor])

  return { activeColor, setActiveColor, colorOptions }
}
