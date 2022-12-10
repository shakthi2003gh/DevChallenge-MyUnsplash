import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { ImageObj, PopupContext } from "./../App";
import DisplayImage from "../components/displayImage";
import DeletePostModal from "./../components/deletePostModal";

const Images = () => {
  const [images, setImages] = useState<ImageObj[][]>([]);
  const [width, setWidth] = useState<number>(0);
  const [column, setColumn] = useState<number>(0);
  const { user, images: dataList, setPopup, filter } = useContext(PopupContext);

  useEffect(() => {
    const list: ImageObj[][] = [];

    const imagesList = dataList.filter((image) =>
      filter ? image.title.match(RegExp(filter, "gi")) : true
    );

    const newColumnListCount = Math.floor(imagesList.length / column);

    for (let i = 0; i < column; i++) {
      const sliceData = imagesList.slice(
        i * newColumnListCount,
        newColumnListCount * (i + 1)
      );
      if (sliceData) list.push(sliceData);
    }

    const extraLength =
      imagesList.length - (imagesList.length - column * newColumnListCount);

    if (extraLength || extraLength === 0)
      imagesList.slice(extraLength).forEach((img, i) => {
        list[i].push(img);
      });

    setImages(list);
  }, [column, dataList, filter]);

  useEffect(() => {
    const newColumn =
      width >= 1000 ? 4 : width >= 720 ? 3 : width >= 500 ? 2 : 1;

    if (column !== newColumn) {
      setColumn(newColumn);
    }
  }, [width]);

  useEffect(() => {
    const setWindowWidth = () => {
      const newWidth = window.innerWidth;
      if (width !== newWidth) setWidth(newWidth);
    };

    setWindowWidth();

    window.addEventListener("resize", setWindowWidth);

    return () => window.removeEventListener("resize", setWindowWidth);
  }, []);

  const handleDisplayImage = (image: ImageObj) => {
    setPopup({ modal: DisplayImage, props: { image } });
  };

  const handleDelete = (e: any, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    setPopup({ modal: DeletePostModal, props: { id } });
  };

  return (
    <div className="images-section">
      {images.map((imageList, i) => (
        <div key={i} className="image-group-col">
          {imageList.map((image, i) => (
            <div
              key={i}
              className="image"
              onClick={() => handleDisplayImage(image)}
            >
              {user && user.id === image.userId && (
                <Button
                  variant="delete"
                  onClick={(e) => handleDelete(e, image.id)}
                >
                  Delete
                </Button>
              )}

              <div className="description">{image.title}</div>

              <img src={image.imageURL} alt="" />

              <div className="backdrop"></div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Images;
