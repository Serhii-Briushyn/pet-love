import FriendsItem from "components/FriendsItem/FriendsItem";
import { FriendsResponse } from "types/friends/types";

type FriendsListProps = {
  friends: FriendsResponse[];
};

const FriendsList: React.FC<FriendsListProps> = ({ friends }) => {
  return (
    <ul className="grid gap-5 tablet:grid-cols-2 desktop:grid-cols-3  desktop:gap-y-7">
      {friends.map((friend) => (
        <FriendsItem key={friend._id} friend={friend} />
      ))}
    </ul>
  );
};

export default FriendsList;
