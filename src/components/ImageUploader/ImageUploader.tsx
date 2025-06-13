import { DEFAULT_AVATAR_URL } from "@constants/defaultUserData"
import clsx from "clsx"
import { FieldError } from "react-hook-form"

type ImageUploaderProps = {
  fileUrl: string | null
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: FieldError
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ fileUrl, onFileChange, error, ...rest }) => {
  const isNotDefault = fileUrl !== DEFAULT_AVATAR_URL

  return (
    <div className="flex flex-col gap-3">
      <div className="bg-secondary group relative m-auto flex size-23 items-center justify-center rounded-full lg:size-27">
        {fileUrl && isNotDefault ? (
          <img src={fileUrl} alt="User avatar" className="size-full rounded-full object-cover" />
        ) : (
          <svg className="fill-primary size-10 stroke-none lg:size-12.5">
            <use href="/sprite.svg#icon-user" />
          </svg>
        )}
      </div>
      <div>
        <div className="flex h-10.5 w-full gap-2">
          <input
            type="text"
            placeholder="Enter URL"
            {...rest}
            className={clsx(
              "w-full truncate rounded-4xl border px-3 outline-none",
              fileUrl ? "border-primary" : "border-black/15",
              error && "border-red",
            )}
          />

          <label
            title="Upload photo"
            className="bg-secondary hover:bg-secondary-hover flex shrink-0 cursor-pointer items-center gap-2 rounded-4xl px-3 text-xs tracking-tight transition-all duration-200 ease-in lg:text-base"
          >
            Upload photo
            <svg className="stroke-primary size-4.5 fill-none">
              <use href="/sprite.svg#icon-upload-cloud" />
            </svg>
            <input type="file" accept="image/*" className="hidden" onChange={onFileChange} />
          </label>
        </div>
        {error && <p className="text-red text-[10px] lg:text-xs">{error.message}</p>}
      </div>
    </div>
  )
}

export default ImageUploader
