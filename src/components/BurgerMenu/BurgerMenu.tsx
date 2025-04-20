import clsx from "clsx";
import AuthNav from "components/AuthNav/AuthNav";
import Modal from "components/Modal/Modal";
import Nav from "components/Nav/Nav";
import UserNav from "components/UserNav/UserNav";
import { AnimatePresence } from "framer-motion";

type BurgerMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  isInverted: boolean;
  isLoggedIn: boolean;
};

const BurgerMenu: React.FC<BurgerMenuProps> = ({
  isOpen,
  onClose,
  isInverted,
  isLoggedIn,
}) => {
  const menuStyles = clsx(
    "flex flex-col items-center justify-between h-full w-[218px] px-5 pb-10 pt-[236px] tablet:w-[374px] tablet:pt-[369px]",
    {
      "bg-white": !isInverted,
      "bg-primary": isInverted,
    }
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          variant="drawer"
          isInverted={isInverted}
        >
          <div className={menuStyles}>
            <Nav isInverted={isInverted} onClose={onClose} />
            {isLoggedIn ? (
              <UserNav variant="menu" />
            ) : (
              <AuthNav isInverted={isInverted} onClose={onClose} />
            )}
          </div>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default BurgerMenu;
