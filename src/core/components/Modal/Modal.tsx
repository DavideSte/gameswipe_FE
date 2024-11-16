import { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.scss";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  const modalElement = document.querySelector(".modal") as HTMLElement;

  return createPortal(
    <div
      className={styles.outside}
      onClick={(event) => {
        if (!(event.target as HTMLElement).closest(".modal-content")) {
          onClose();
        }
      }}
    >
      <div className="modal-content">{children}</div>
    </div>,
    modalElement
  );
}
