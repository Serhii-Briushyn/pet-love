type TitleProps = {
  title: string
  subtitle?: string
  className?: string
}

const Title: React.FC<TitleProps> = ({ subtitle, title, className }) => {
  return (
    <div className={className}>
      <h1 className="text-[28px] leading-none font-bold lg:text-[54px]">{title}</h1>
      {subtitle && <p className="text-sm lg:text-lg">{subtitle}</p>}
    </div>
  )
}

export default Title
