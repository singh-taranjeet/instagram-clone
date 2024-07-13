import { Icon } from "../Icon";

function ModalTitle(props: Readonly<{ children: React.ReactNode }>) {
  const { children } = props;
  return (
    <div className="flex-center w-full absolute" style={{ top: "-1.5rem" }}>
      <div
        className={`p-rectangle-normal w-fit mx-auto rounded-full border-4 border-primary px-normal ${pinkish}`}
      >
        <p className="text-center">{children}</p>
      </div>
    </div>
  );
}

function closeModal(onClose: () => void) {
  return () => onClose();
}

function ModalCloseIcon(props: Readonly<{ onClose: () => void }>) {
  const { onClose } = props;

  return (
    <i
      className="absolute top-2 right-2 cursor-pointer"
      onClick={closeModal(onClose)}
    >
      <Icon.Cross className=" text-white" />
    </i>
  );
}

function ModalBody(props: Readonly<{ children: React.ReactNode }>) {
  function stopPropogation(e: any) {
    e.stopPropagation();
  }

  return (
    <div
      onClick={stopPropogation}
      className={`modal-content m-auto rounded-3xl w-4/5 relative min-w-[300px]`}
    >
      {props.children}
    </div>
  );
}

function ModalContent(props: Readonly<{ children: React.ReactNode }>) {
  const { children } = props;
  return <div className="p-small md:p-normal mt-6">{children}</div>;
}

function ModalDialog(
  props: Readonly<{
    children: React.ReactNode;
    open: boolean;
    onClose?: () => void;
  }>
) {
  const { children, onClose = () => {}, open } = props;

  return (
    <div
      onClick={closeModal(onClose)}
      className={`${
        open ? "flex" : "hidden"
      } fixed z-50 left-0 top-0 w-full h-full overflow-auto bg-slate-900/90 shadow`}
    >
      {open ? children : null}
    </div>
  );
}

export const Modal = {
  ModalDialog,
  ModalBody,
  ModalContent,
  ModalTitle,
  ModalCloseIcon,
};