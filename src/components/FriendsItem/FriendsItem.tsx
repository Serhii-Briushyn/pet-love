import InfoRow from "@components/InfoRow/InfoRow"
import { FriendsResponse } from "@store/friends/types"
import { getTodaySchedule } from "@utils/getTodaySchedule"

type FriendItemProps = {
  friend: FriendsResponse
}

const FriendsItem: React.FC<FriendItemProps> = ({ friend }) => {
  return (
    <li className="dark:bg-dark-secondary relative flex gap-3.5 rounded-2xl bg-white px-5 py-10">
      <div className="bg-secondary absolute top-3 right-3 rounded-4xl p-2">
        <p className="text-primary text-xs tracking-tight lg:text-sm">
          {getTodaySchedule(friend.workDays)}
        </p>
      </div>

      <img
        src={friend.imageUrl || "/images/no-image.png"}
        alt={friend.title}
        className="h-20 w-20 rounded-full object-cover lg:h-22.5 lg:w-22.5"
        loading="lazy"
      />

      <div className="flex flex-col gap-3.5 lg:gap-5">
        <a
          href={friend.url}
          target="_blank"
          rel="noopener noreferrer"
          className="line-clamp-1 text-base font-bold hover:underline lg:text-xl"
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
  )
}

export default FriendsItem
