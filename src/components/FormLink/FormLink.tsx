import { NavLink } from "react-router-dom"

interface FormLinkProps {
  to: string
  text: string
  linkText: string
}

const FormLink: React.FC<FormLinkProps> = ({ to, text, linkText }) => (
  <p className="text-center text-xs text-black/50 lg:text-sm dark:text-white/50">
    {text}{" "}
    <NavLink
      className="text-primary hover:text-primary-hover font-bold underline transition-all duration-200 ease-in"
      to={to}
    >
      {linkText}
    </NavLink>
  </p>
)

export default FormLink
