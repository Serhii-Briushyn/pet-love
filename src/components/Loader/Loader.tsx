const Loader = () => {
  return (
    <div className="bg-loader fixed top-0 left-0 z-100 flex h-screen w-full items-center justify-center bg-cover bg-center bg-no-repeat">
      <div className="flex items-end text-5xl leading-none font-bold text-white lg:text-8xl">
        pet
        <svg className="fill-primary h-11 w-11 animate-pulse lg:h-20 lg:w-20">
          <use href="/sprite.svg#icon-heart" />
        </svg>
        love
      </div>
    </div>
  )
}

export default Loader
