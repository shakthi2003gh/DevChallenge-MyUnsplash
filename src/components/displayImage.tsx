import { useContext } from "react";
import { ImageObj, PopupContext } from "./../App";

const DisplayImage = ({ image }: { image: ImageObj }) => {
  const { setPopup } = useContext(PopupContext);

  const handleClose = () => {
    setPopup();
  };

  return (
    <div className="displayImage">
      <img src={image.imageURL} alt="" />
      <span className="material-symbols-rounded" onClick={handleClose}>
        close
      </span>
    </div>
  );
};

export default DisplayImage;
