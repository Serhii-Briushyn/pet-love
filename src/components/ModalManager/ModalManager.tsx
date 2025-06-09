import { useSelector, useDispatch } from "react-redux"
import { useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"

import { selectCurrentModal } from "@store/ui/selectors"
import { closeModal } from "@store/ui/slice"
import { clearSelectedNotice } from "@store/notices/slice"

import Modal from "@components/Modal/Modal"
import ModalApproveAction from "@components/ModalApproveAction/ModalApproveAction"
import ModalAttention from "@components/ModalAttention/ModalAttention"
import BurgerMenu from "@components/BurgerMenu/BurgerMenu"
import ModalEditUser from "@components/ModalEditUser/ModalEditUser"
import ModalNotice from "@components/ModalNotice/ModalNotice"

const ModalManager = () => {
  const currentModal = useSelector(selectCurrentModal)
  const { pathname } = useLocation()
  const dispatch = useDispatch()
  const isHome = pathname === "/"

  const handleClose = () => {
    if (currentModal === "notice") dispatch(clearSelectedNotice())
    dispatch(closeModal())
  }

  return (
    <AnimatePresence>
      {currentModal && (
        <Modal
          variant={currentModal === "menu" ? "drawer" : "default"}
          isHome={isHome}
          onClose={handleClose}
        >
          {currentModal === "menu" && <BurgerMenu isHome={isHome} />}
          {currentModal === "approved" && <ModalApproveAction />}
          {currentModal === "notice" && <ModalNotice />}
          {currentModal === "attention" && <ModalAttention />}
          {currentModal === "edit" && <ModalEditUser />}
        </Modal>
      )}
    </AnimatePresence>
  )
}

export default ModalManager
