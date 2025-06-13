import EditUserBtn from "@components/EditUserBtn/EditUserBtn"
import LogOutBtn from "@components/LogOutBtn/LogOutBtn"
import PetsBlock from "@components/PetsBlock/PetsBlock"
import UserBlock from "@components/UserBlock/UserBlock"

const UserCard = () => {
  return (
    <div className="relative mb-10 flex h-max w-full shrink-0 flex-col rounded-4xl bg-white px-5 pt-19 pb-10 lg:mb-8 lg:p-10 xl:mb-0 xl:max-h-224 xl:w-130">
      <EditUserBtn />
      <UserBlock />
      <PetsBlock />
      <LogOutBtn variant="settings" />
    </div>
  )
}

export default UserCard
