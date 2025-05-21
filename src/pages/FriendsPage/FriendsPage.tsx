import { useEffect } from "react"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"

import { AppDispatch } from "@store/store"
import { fetchFriends } from "@store/friends/operations"

import Title from "@components/Title/Title"
import FriendsList from "@components/FriendsList/FriendsList"

const FriendsPage = () => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchFriends()).unwrap()
      } catch (error) {
        toast.error(error as string)
      }
    }
    fetchData()
  }, [dispatch])

  return (
    <section className="container m-auto flex flex-col px-5 pt-28.5 pb-20 lg:px-8 lg:pt-42 xl:px-16 xl:pt-44.5">
      <Title title="Our friends" className="mb-10 lg:mb-11 xl:mb-15" />
      <FriendsList />
    </section>
  )
}

export default FriendsPage
