import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

import { AppDispatch } from "@store/store"
import { closeModal } from "@store/ui/slice"
import { deletePet, logout } from "@store/users/operations"
import { selectSelectedPetId } from "@store/users/selectors"
import { clearSelectedPetId } from "@store/users/slice"

type ModalApproveActionProps = {
  variant: "approved" | "confirm"
}

const ModalApproveAction: React.FC<ModalApproveActionProps> = ({ variant }) => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const petId = useSelector(selectSelectedPetId)

  const isLogout = variant === "approved"
  const isDelete = variant === "confirm"

  const handleConfirm = async () => {
    try {
      if (isLogout) {
        await dispatch(logout()).unwrap()
        navigate("/")
      }

      if (isDelete && petId) {
        await dispatch(deletePet(petId)).unwrap()
        dispatch(clearSelectedPetId())
      }

      dispatch(closeModal())
    } catch (error) {
      toast.error(error as string)
    }
  }

  const handleCancel = () => {
    dispatch(closeModal())
    if (isDelete) dispatch(clearSelectedPetId())
  }

  const btnClass =
    "flex justify-center items-center rounded-4xl font-bold w-33 h-10.5 cursor-pointer transition-all duration-200 ease-in lg:h-12 lg:w-35"

  return (
    <div className="flex flex-col items-center rounded-4xl bg-white px-7 py-10 lg:p-20">
      <div className="bg-secondary mb-5 flex h-20 w-20 items-center justify-center rounded-full">
        <img
          className="h-11 w-11"
          src="/images/cat-img.png"
          srcSet="/images/cat-img.png 1x, /images/cat-img@2x.png 2x"
          alt="Cat"
          loading="lazy"
        />
      </div>

      <p className="mb-7 text-center text-xl leading-none font-bold lg:text-2xl">
        {isLogout ? "Already leaving?" : "Are you sure?"}
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        <button
          className={`${btnClass} bg-primary hover:bg-primary-hover text-white`}
          onClick={handleConfirm}
        >
          Yes
        </button>
        <button
          className={`${btnClass} bg-black/5 text-black hover:bg-black/10`}
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default ModalApproveAction
