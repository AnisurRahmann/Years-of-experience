import { useAppDispatch } from "../app/hooks";
import { setModalOpen } from "../features/utils/utilSlice";

const Modal = ({ isOpen, children }: any) => {
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
