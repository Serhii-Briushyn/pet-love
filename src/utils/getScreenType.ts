import { useEffect, useState } from "react";

export type ScreenType = "mobile" | "tablet" | "desktop";

export const useScreenType = (): ScreenType | null => {
  const [screen, setScreen] = useState<ScreenType | null>(null);

  useEffect(() => {
    const getScreenType = (width: number): ScreenType => {
      if (width >= 1280) return "desktop";
      if (width >= 768) return "tablet";
      return "mobile";
    };

    const updateScreen = () => {
      setScreen(getScreenType(window.innerWidth));
    };

    updateScreen();
    window.addEventListener("resize", updateScreen);
    return () => window.removeEventListener("resize", updateScreen);
  }, []);

  return screen;
};
