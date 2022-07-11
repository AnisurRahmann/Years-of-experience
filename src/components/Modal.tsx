import { useAppDispatch } from "../app/hooks";
import { setModalOpen } from "../features/utils/utilSlice";

interface ModalProps {
  isOpen: boolean;
  children: JSX.Element;
}

const Modal: React.FunctionComponent<ModalProps> = ({ isOpen, children }) => {
  const dispatch = useAppDispatch();
  return (
    <>
      <div className={`modal ${isOpen ? "is-active" : ""}`}>
        <div className="modal-background "></div>
        <div className="modal-content">{children}</div>
        <button
          className="modal-close is-large"
          aria-label="close"
          onClick={() =>
            dispatch(setModalOpen({ modalType: "", isOpen: false }))
          }
        ></button>
      </div>
    </>
  );
};

export default Modal;
