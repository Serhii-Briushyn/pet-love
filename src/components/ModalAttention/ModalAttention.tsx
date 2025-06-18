import AuthNav from "@components/AuthNav/AuthNav"

const ModalAttention = () => {
  return (
    <div className="dark:bg-dark-secondary flex flex-col items-center rounded-4xl bg-white px-5 py-10 sm:w-83 lg:w-116 lg:p-15">
      <div className="bg-secondary mb-5 flex h-20 w-20 items-center justify-center rounded-full">
        <img
          className="h-11 w-11"
          src="/images/dog-img.png"
          srcSet="/images/dog-img.png 1x, /images/dog-img@2x.png 2x"
          alt="Dog"
          loading="lazy"
        />
      </div>
      <div className="mb-6 flex flex-col gap-5 text-center lg:mb-7">
        <h3 className="text-primary text-xl font-bold lg:text-2xl">Attention</h3>
        <p className="text-sm">
          We would like to remind you that certain functionality is available only to authorized
          users.If you have an account, please log in with your credentials. If you do not already
          have an account, you must register to access these features.
        </p>
      </div>
      <AuthNav variant="modal" />
    </div>
  )
}

export default ModalAttention
