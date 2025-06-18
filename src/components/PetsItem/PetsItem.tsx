import { useDispatch } from "react-redux"

import { AppDispatch } from "@store/store"
import { openModal } from "@store/ui/slice"
import { setSelectedPetId } from "@store/users/slice"
import { Pet } from "@store/users/types"

import { capitalizeFirstLetter } from "@utils/capitalizeFirstLetter"
import { formatDate } from "@utils/formatDate"

type PetsItemProps = {
  pet: Pet
}

export const PetsItem: React.FC<PetsItemProps> = ({ pet }) => {
  const { name, title, imgURL, species, birthday, sex } = pet
  const dispatch = useDispatch<AppDispatch>()

  const handleDeleteClick = () => {
    dispatch(setSelectedPetId(pet._id))
    dispatch(openModal({ name: "confirm" }))
  }

  return (
    <li className="relative flex gap-3.5 rounded-3xl border border-black/10 p-4 lg:py-5.5 xl:items-center xl:gap-6 xl:p-5 dark:border-white/10">
      <img
        src={imgURL}
        alt={species}
        className="bg-secondary size-16.5 shrink-0 rounded-full object-cover lg:size-18.5 xl:size-22.5"
      />
      <div className="flex w-full flex-col gap-2 lg:gap-3">
        <h4 className="max-w-38 truncate leading-tight font-bold xl:max-w-61">{title}</h4>

        <ul className="flex max-w-62 flex-wrap items-center gap-2.5 xl:justify-between">
          <li className="flex flex-col gap-1 leading-tight">
            <span className="text-[10px] text-black/50 dark:text-white/50">Name:</span>
            <span title={name} className="truncate text-xs">
              {name}
            </span>
          </li>
          <li className="flex flex-col gap-1 leading-tight">
            <span className="text-[10px] text-black/50 dark:text-white/50">Birthday:</span>
            <span className="truncate text-xs">{formatDate(birthday)}</span>
          </li>
          <li className="flex flex-col gap-1 leading-tight">
            <span className="text-[10px] text-black/50 dark:text-white/50">Sex:</span>
            <span className="truncate text-xs">{capitalizeFirstLetter(sex)}</span>
          </li>
          <li className="flex flex-col gap-1 leading-tight">
            <span className="text-[10px] text-black/50 dark:text-white/50">Species:</span>
            <span className="truncate text-xs"> {capitalizeFirstLetter(species)}</span>
          </li>
        </ul>
      </div>
      <button
        onClick={handleDeleteClick}
        className="bg-secondary hover:bg-secondary-hover absolute top-3 right-3 flex size-7.5 cursor-pointer items-center justify-center rounded-full transition-all duration-200 ease-in lg:size-8 xl:size-9.5"
      >
        <svg className="stroke-primary size-4 fill-none xl:size-4.5">
          <use href="/sprite.svg#icon-trash" />
        </svg>
      </button>
    </li>
  )
}
