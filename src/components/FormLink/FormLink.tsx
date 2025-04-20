import { NavLink } from "react-router-dom";
import clsx from "clsx";

interface FormLinkProps {
  to: string;
  text: string;
  linkText: string;
}

const FormLink: React.FC<FormLinkProps> = ({ to, text, linkText }) => (
  <p className="text-center text-xs text-black/50 tablet:text-sm">
    {text}{" "}
    <NavLink
      className={clsx(
        "text-primary font-bold underline transition-all duration-200 ease-in",
        "hover:text-primary-hover"
      )}
      to={to}
    >
      {linkText}
    </NavLink>
  </p>
);

export default FormLink;
