interface FormButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const FormButton: React.FC<FormButtonProps> = ({ children, ...rest }) => {
  return (
    <button
      className="bg-primary flex justify-center rounded-main font-bold text-white w-full p-3 cursor-pointer uppercase tablet:p-4 transition-all duration-200 ease-in hover:bg-primary-hover"
      {...rest}
    >
      {children}
    </button>
  );
};

export default FormButton;
