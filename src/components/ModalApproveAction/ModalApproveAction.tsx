import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

import { AppDispatch } from "@store/store"
import { closeModal } from "@store/ui/slice"
import { logout } from "@store/users/operations"

const ModalApproveAction = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const handleConfirm = async () => {
    try {
      await dispatch(logout()).unwrap()
      dispatch(closeModal())
      navigate("/")
    } catch (error) {
      toast.error(error as string)
    }
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
        Already leaving?
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
          onClick={() => dispatch(closeModal())}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default ModalApproveAction
