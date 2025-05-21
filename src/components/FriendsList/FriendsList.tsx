import { useSelector } from "react-redux"
import { selectFriends } from "@store/friends/selectors"
import FriendsItem from "@components/FriendsItem/FriendsItem"

const FriendsList = () => {
  const friends = useSelector(selectFriends)

  if (!friends.length) return <p>No friends found.</p>

  return (
    <ul className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3 xl:gap-y-7">
      {friends.map((friend) => (
        <FriendsItem key={friend._id} friend={friend} />
      ))}
    </ul>
  )
}

export default FriendsList
