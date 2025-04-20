import clsx from "clsx";
// import Modal from "components/Modal/Modal";
import ModalApproveAction from "components/ModalApproveAction/ModalApproveAction";
// import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "store/auth/operations";
import { AppDispatch } from "store/store";

type LogOutProps = {
  isInverted?: boolean;
  variant?: "header" | "menu";
};

const LogOutBtn: React.FC<LogOutProps> = ({ isInverted = false, variant }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const isMenu = variant === "menu";
  const isHeader = variant === "header";

  const logoutStyles = clsx(
    " flex justify-center items-center h-10.5 rounded-main font-bold uppercase cursor-pointer tablet:h-12.5 transition-all duration-200 ease-in ",
    {
      "bg-secondary text-primary max-w-44.5 w-full hover:bg-secondary-hover":
        isMenu,
      "bg-primary text-white w-34 hover:bg-primary-hover":
        isHeader && !isInverted,
      "bg-secondary text-primary w-34 hover:bg-secondary-hover":
        isHeader && isInverted,
    }
  );

  const handleConfirm = () => {
    dispatch(logout());
  };

  return (
    <>
      <button className={logoutStyles} onClick={() => setOpen(true)}>
        Log out
      </button>
      <ModalApproveAction
        isOpen={open}
        onCancel={() => setOpen(false)}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default LogOutBtn;
