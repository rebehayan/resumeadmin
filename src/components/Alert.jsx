import { useEffect, useRef } from "react";

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
    <dialog ref={ref} className="fixed inset-0 bg-white border-black border-2">
      <p>{children}</p>
      <button onClick={handleClose}>닫기</button>
    </dialog>
  );
};

export default Alert;
