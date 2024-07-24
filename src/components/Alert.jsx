import { useEffect, useRef } from "react";
import Button from "./form/Button";

const Alert = ({ children, open, close }) => {
  const ref = useRef();

  const handleClose = () => {
    ref.current.close();
    close(false);
  };

  useEffect(() => {
    if (open) {
      ref.current.show();
    }
  }, [open]);

  return (
    <dialog ref={ref} className="left-1/2 -translate-x-1/2 p-10 bg-white border-black border-2">
      <p>{children}</p>
      <Button Onclick={handleClose} value={"닫기"} />
    </dialog>
  );
};

export default Alert;
