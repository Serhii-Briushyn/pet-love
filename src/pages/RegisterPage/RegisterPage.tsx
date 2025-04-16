import PetBlock from "components/PetBlock/PetBlock"
import RegisterForm from "components/RegisterForm/RegisterForm"

const RegisterPage = () => {
  return (
    <section className="tablet:p-8 tablet:pt-28.5 tablet:gap-4 desktop:flex-row desktop:gap-8 desktop:h-[800px] container m-auto flex flex-col gap-2.5 p-5 pt-20">
      <PetBlock page="register" />
      <RegisterForm />
    </section>
  )
}

export default RegisterPage
