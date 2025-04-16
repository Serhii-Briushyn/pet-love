import Logo from "components/Logo/Logo"
import { useScreenType } from "utils/useScreenType"

const MainPage = () => {
  const screen = useScreenType()

  if (!screen) return null

  const backgroundStyle = {
    backgroundImage: `
    image-set(
      url("/images/main-page/bg-${screen}.png") 1x,
      url("/images/main-page/bg-${screen}@2x.png") 2x
    )
  `,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center top",
    backgroundSize: "cover",
  }

  return (
    <div className="container m-auto h-screen w-full" style={backgroundStyle}>
      <Logo />
    </div>
  )
}

export default MainPage
