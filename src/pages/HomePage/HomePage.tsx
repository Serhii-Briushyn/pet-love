import { useScreenType } from "utils/useScreenType";

const HomePage = () => {
  const screen = useScreenType();
  if (!screen) return null;

  const img1x = `/images/home-page/${screen}-img.jpg`;
  const img2x = `/images/home-page/${screen}-img@2x.jpg`;

  return (
    <>
      <section className="container min-w-tablet m-auto flex flex-col px-5 py-2.5 tablet:py-4 tablet:px-8">
        <div className="bg-primary rounded-main px-5 pb-12.5 pt-29.5 tablet:px-8 tablet:pb-11 tablet:pt-44.5 desktop:px-16 desktop:pb-8">
          <div className="text-white flex flex-col gap-6 tablet:gap-8 desktop:flex-row desktop:justify-between desktop:items-end">
            <h1 className="text-[50px] leading-none font-bold tracking-[-0.03em] tablet:text-[80px] desktop:text-[90px] desktop:max-w-[760px]">
              Take good <span className="text-white/40">care</span> of your
              small pets
            </h1>
            <p className="leading-tight tracking-[-0.02em] tablet:ml-auto tablet:text-lg tablet:max-w-64 desktop:m-0">
              Choosing a pet for your home is a choice that is meant to enrich
              your life with immeasurable joy and tenderness.
            </p>
          </div>
        </div>
        <img
          className="w-full h-auto rounded-main"
          src={img1x}
          srcSet={`${img1x} 1x, ${img2x} 2x`}
          alt="Pet"
          loading="lazy"
        />
      </section>
    </>
  );
};

export default HomePage;
