type TitleProps = {
  page: "register" | "login"
}

const Title: React.FC<TitleProps> = ({ page }) => {
  const title = page === "register" ? "Registration" : "Log in"
  const description =
    page === "register"
      ? "Thank you for your interest in our platform."
      : "Welcome! Please enter your credentials to login to the platform:"

  return (
    <>
      <h1 className="tablet:text-[54px] tablet:mb4 tablet:mb-4 mb-3 text-[28px] leading-none font-bold">
        {title}
      </h1>
      <p className={`tablet:text-lg tablet:mb-8 text-sm ${page === "login" ? "mb-6" : "mb-5"}`}>
        {description}
      </p>
    </>
  )
}

export default Title
