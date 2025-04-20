import InfoRow from "components/InfoRow/InfoRow";
import { getTodaySchedule } from "helpers/getTodaySchedule";
import { FriendsResponse } from "types/friends/types";

interface FriendItemProps {
  friend: FriendsResponse;
}

const FriendsItem = ({ friend }: FriendItemProps) => {
  return (
    <li className="bg-white relative flex gap-3.5 rounded-[15px] px-5 py-10">
      <div className="absolute right-3 top-3 bg-secondary rounded-main p-2">
        <p className="text-xs text-primary tracking-tight tablet:text-sm">
          {getTodaySchedule(friend.workDays)}
        </p>
      </div>

      <img
        src={friend.imageUrl || "/images/no-image.png"}
        alt={friend.title}
        className="w-20 h-20 rounded-full object-cover tablet:w-22.5 tablet:h-22.5"
        loading="lazy"
      />

      <div className="flex flex-col gap-3.5 tablet:gap-5">
        <a
          href={friend.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-base w-max font-bold line-clamp-1 tablet:text-xl hover:underline"
        >
          {friend.title}
        </a>
        <div className="flex flex-col gap-2">
          <InfoRow
            label="Email"
            value={friend.email}
            href={friend.email ? `mailto:${friend.email}` : undefined}
          />
          <InfoRow
            label="Address"
            value={friend.address}
            href={friend.addressUrl || undefined}
            isExternal
          />
          <InfoRow
            label="Phone"
            value={friend.phone}
            href={friend.phone ? `tel:${friend.phone}` : undefined}
          />
        </div>
      </div>
    </li>
  );
};

export default FriendsItem;
