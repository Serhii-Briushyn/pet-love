import { useSelector, useDispatch } from "react-redux"
import { useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"

import { selectCurrentModal, selectModalProps } from "@store/ui/selectors"
import { closeModal } from "@store/ui/slice"

import Modal from "@components/Modal/Modal"
import ModalApproveAction from "@components/ModalApproveAction/ModalApproveAction"
import ModalNotice, { ModalNoticeProps } from "@components/ModalNotice/ModalNotice"
import ModalAttention from "@components/ModalAttention/ModalAttention"
import BurgerMenu from "@components/BurgerMenu/BurgerMenu"

const ModalManager = () => {
  const currentModal = useSelector(selectCurrentModal)
  const modalProps = useSelector(selectModalProps)
  const { pathname } = useLocation()
  const dispatch = useDispatch()
  const isHome = pathname === "/"

  const handleClose = () => dispatch(closeModal())

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
          {currentModal === "notice" && <ModalNotice {...(modalProps as ModalNoticeProps)} />}
          {currentModal === "attention" && <ModalAttention />}
        </Modal>
      )}
    </AnimatePresence>
  )
}

export default ModalManager
