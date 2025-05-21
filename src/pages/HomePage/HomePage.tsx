const images = {
  mobile1x: `/images/home-page/mobile-img.jpg`,
  mobile2x: `/images/home-page/mobile-img@2x.jpg`,
  tablet1x: `/images/home-page/tablet-img.jpg`,
  tablet2x: `/images/home-page/tablet-img@2x.jpg`,
  desktop1x: `/images/home-page/desktop-img.jpg`,
  desktop2x: `/images/home-page/desktop-img@2x.jpg`,
}

const HomePage = () => {
  return (
    <section className="container m-auto flex flex-col px-5 py-2.5 lg:px-8 lg:py-4">
      <div className="bg-primary rounded-4xl px-5 pt-29 pb-12.5 lg:px-8 lg:pt-44 lg:pb-11 xl:px-16 xl:pb-8">
        <div className="flex flex-col gap-6 text-white lg:gap-8 xl:flex-row xl:items-end xl:justify-between">
          <h1 className="text-[50px] leading-none font-bold tracking-[-0.03em] lg:text-[80px] xl:max-w-190 xl:text-[90px]">
            Take good <span className="text-white/40">care</span> of your small pets
          </h1>
          <p className="leading-tight tracking-[-0.02em] lg:ml-auto lg:max-w-64 lg:text-lg xl:m-0">
            Choosing a pet for your home is a choice that is meant to enrich your life with
            immeasurable joy and tenderness.
          </p>
        </div>
      </div>
      <picture>
        <source
          media="(min-width: 1280px)"
          srcSet={`${images.desktop1x} 1x, ${images.desktop2x} 2x`}
        />
        <source
          media="(min-width: 768px)"
          srcSet={`${images.tablet1x} 1x, ${images.tablet2x} 2x`}
        />
        <source
          media="(max-width: 767px)"
          srcSet={`${images.mobile1x} 1x, ${images.mobile2x} 2x`}
        />
        <img src={images.mobile1x} alt="Pet" loading="lazy" className="h-auto w-full rounded-4xl" />
      </picture>
    </section>
  )
}

export default HomePage
