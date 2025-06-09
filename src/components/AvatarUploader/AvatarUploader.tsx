import clsx from "clsx"
import { DEFAULT_AVATAR_URL } from "@constants/defaultAvatarUrl"

type AvatarUploaderProps = {
  avatarUrl: string | null
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onRemove: () => void
}

const AvatarUploader: React.FC<AvatarUploaderProps> = ({ avatarUrl, onChange, onRemove }) => {
  const buttonClass =
    "group/btn absolute bottom-0 size-9.5 cursor-pointer rounded-full p-2.5 opacity-0 transition-all duration-200 ease-in group-hover/avatar:opacity-100"

  const iconClass =
    "h-full w-full fill-none stroke-white transition-all duration-200 ease-in group-hover/btn:scale-125"

  const isDefaultAvatar = avatarUrl === DEFAULT_AVATAR_URL

  return (
    <div className="bg-secondary group/avatar relative m-auto flex size-23 items-center justify-center rounded-full lg:size-27">
      {avatarUrl && !isDefaultAvatar ? (
        <img src={avatarUrl} alt="User avatar" className="size-full rounded-full object-cover" />
      ) : (
        <svg className="fill-primary size-10 stroke-none lg:size-12.5">
          <use href="/sprite.svg#icon-user" />
        </svg>
      )}

      <label title="Upload photo" className={clsx("bg-primary right-0", buttonClass)}>
        <svg className={iconClass}>
          <use href="/sprite.svg#icon-upload-cloud" />
        </svg>
        <input type="file" accept="image/*" className="hidden" onChange={onChange} />
      </label>

      {avatarUrl && !isDefaultAvatar && (
        <button
          type="button"
          title="Remove avatar"
          onClick={onRemove}
          className={clsx("bg-red left-0", buttonClass)}
        >
          <svg className={iconClass}>
            <use href="/sprite.svg#icon-trash" />
          </svg>
        </button>
      )}
    </div>
  )
}

export default AvatarUploader
