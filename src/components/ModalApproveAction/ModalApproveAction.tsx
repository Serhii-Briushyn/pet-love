import Modal from "components/Modal/Modal";
import { AnimatePresence } from "framer-motion";

type ModalApproveActionProps = {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

const ModalApproveAction: React.FC<ModalApproveActionProps> = ({
  isOpen,
  onCancel,
  onConfirm,
}) => {
  const btnStyles =
    "flex justify-center items-center rounded-main font-bold w-33 h-10.5 cursor-pointer transition-all duration-200 ease-in tablet:h-12 tablet:w-35";

  return (
    <AnimatePresence>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={onCancel}>
          <div className="bg-white flex flex-col items-center rounded-main px-7 py-10 tablet:p-20">
            <div className="bg-secondary flex justify-center items-center rounded-full w-20 h-20 mb-5">
              <img
                className="w-11 h-11"
                src="/images/cat-img.png"
                srcSet="/images/cat-img.png 1x, /images/cat-img@2x.png 2x"
                alt="Cat"
                loading="lazy"
              />
            </div>

            <p className="text-xl text-center font-bold leading-none mb-7 tablet:text-2xl">
              Already leaving?
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <button
                className={`${btnStyles} bg-primary text-white hover:bg-primary-hover`}
                onClick={onConfirm}
              >
                Yes
              </button>
              <button
                className={`${btnStyles} bg-black/5 text-black hover:bg-black/10`}
                onClick={onCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default ModalApproveAction;
