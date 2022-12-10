import { FunctionComponent, useContext, useEffect } from "react";
import { PopupContext } from "./../App";

type ModalProp = {
  popup: { modal: FunctionComponent; props?: any };
};

const PopupBox = ({ popup: Popup }: ModalProp) => {
  const { setPopup } = useContext(PopupContext);

  const handleClose = (e: any) => {
    if (e.code === "Escape") setPopup();
  };

  useEffect(() => {
    window.addEventListener("keyup", handleClose);
    return () => window.removeEventListener("keyup", handleClose);
  }, []);

  return (
    <div className="popup">
      <Popup.modal {...Popup?.props} />
    </div>
  );
};

export default PopupBox;
