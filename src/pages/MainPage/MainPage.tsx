import Logo from "components/Logo/Logo";
import { useScreenType } from "utils/useScreenType";

const MainPage = () => {
  const screen = useScreenType();

  if (!screen) return null;

  const backgroundStyle = {
    backgroundImage: `
    image-set(
      url("/images/main-page/bg-${screen}.png") 1x,
      url("/images/main-page/bg-${screen}@2x.png") 2x
    )
  `,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
  };

  return (
    <div
      className="flex items-center justify-center h-screen w-full"
      style={backgroundStyle}
    >
      <Logo page="main" />
    </div>
  );
};

export default MainPage;
