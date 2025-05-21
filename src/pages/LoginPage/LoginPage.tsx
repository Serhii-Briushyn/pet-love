import LoginForm from "@components/LoginForm/LoginForm"
import PetBlock from "@components/PetBlock/PetBlock"

const LoginPage = () => {
  return (
    <section className="container m-auto flex flex-col gap-2.5 p-5 pt-22 lg:gap-4 lg:p-8 lg:pt-28.5 xl:h-200 xl:flex-row xl:gap-8">
      <PetBlock page="login" />
      <LoginForm />
    </section>
  )
}

export default LoginPage
