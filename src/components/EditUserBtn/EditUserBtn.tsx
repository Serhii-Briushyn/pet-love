import { AppDispatch } from "@store/store"
import { openModal } from "@store/ui/slice"
import { useDispatch } from "react-redux"

const EditUserBtn = () => {
  const dispatch = useDispatch<AppDispatch>()

  return (
    <button
      type="button"
      className="bg-secondary hover:bg-secondary-hover absolute top-5 right-5 h-10 w-10 cursor-pointer rounded-full p-2.5 transition-all duration-200 ease-in lg:top-10 lg:right-10"
      onClick={() => dispatch(openModal({ name: "edit" }))}
    >
      <svg className="stroke-primary h-full w-full fill-none">
        <use href="/sprite.svg#icon-edit" />
      </svg>
    </button>
  )
}

export default EditUserBtn
