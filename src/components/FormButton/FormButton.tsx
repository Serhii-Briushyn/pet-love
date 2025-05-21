interface FormButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const FormButton: React.FC<FormButtonProps> = ({ children, ...rest }) => {
  return (
    <button
      className="bg-primary hover:bg-primary-hover flex w-full cursor-pointer justify-center rounded-4xl p-3 font-bold text-white uppercase transition-all duration-200 ease-in lg:p-4"
      {...rest}
    >
      {children}
    </button>
  )
}

export default FormButton
