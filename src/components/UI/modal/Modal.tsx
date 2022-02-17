import styles from "./Modal.module.css";
import { createPortal } from "react-dom";

const Backdrop = (props: any) => {
  return <div className={styles.backdrop}></div>;
};

const ModalOverlay = (props: any) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}> {props.children} </div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props: any) => {
  return <>
    {createPortal(<Backdrop />, (portalElement as HTMLElement))}
    {createPortal(<ModalOverlay>{props.children}</ModalOverlay>, (portalElement as HTMLElement))}
  </>;
};

export default Modal;
