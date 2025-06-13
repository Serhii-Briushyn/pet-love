import MyNotices from "@components/MyNotices/MyNotices"
import UserCard from "@components/UserCard/UserCard"

const ProfilePage = () => {
  return (
    <section className="container m-auto flex flex-col px-5 pt-22 pb-14 lg:px-8 lg:pt-28.5 lg:pb-15 xl:min-h-screen xl:flex-row xl:gap-8 xl:pr-1.5 xl:pb-8">
      <UserCard />
      <MyNotices />
    </section>
  )
}

export default ProfilePage
