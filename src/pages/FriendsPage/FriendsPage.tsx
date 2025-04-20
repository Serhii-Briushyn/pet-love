import FriendsList from "components/FriendsList/FriendsList";
import Title from "components/Title/Title";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchFriends } from "store/friends/operations";
import { selectFriends } from "store/friends/selectors";
import { AppDispatch } from "store/store";

const FriendsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const friends = useSelector(selectFriends);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchFriends()).unwrap();
      } catch (error) {
        toast.error(error as string);
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <section className="container m-auto flex flex-col px-5 pt-28.5 pb-20 tablet:px-8 tablet:pt-42 desktop:px-16 desktop:pt-44.5">
      <div className="mb-10 tablet:mb-11 desktop:mb-15">
        <Title page="friends" />
      </div>
      <FriendsList friends={friends} />
    </section>
  );
};

export default FriendsPage;
