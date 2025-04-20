import { useEffect, useState } from "react";
import { useScreenType } from "utils/useScreenType";

const Loader = () => {
  const [progress, setProgress] = useState(0);
  const screen = useScreenType();

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

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100));
    }, 20);
    return () => clearInterval(interval);
  }, []);

  if (!screen) return null;

  const radius = screen === "mobile" ? 136.5 : 199;
  const stroke = 2;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div
      className="fixed top-0 left-0 w-screen z-100 h-screen flex items-center justify-center"
      style={backgroundStyle}
    >
      <svg
        height={radius * 2}
        width={radius * 2}
        className="absolute z-10 rotate-[-90deg]"
      >
        <circle
          stroke="white"
          strokeOpacity="0.3"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />

        <circle
          stroke="white"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>

      <span className="text-white text-[50px] font-bold leading-none tracking-[-0.04em] tablet:text-[80px]">
        {progress}%
      </span>
    </div>
  );
};

export default Loader;
