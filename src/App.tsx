import { createContext, FunctionComponent, useEffect, useState } from "react";
import Header from "./sections/header";
import Images from "./sections/image-group";
import PopupBox from "./sections/modal";
import { getImages } from "./services/fireStoreDB";

export const PopupContext = createContext<Value>({
  user: null,
  images: [],
  filter: "",
  setUser: () => {},
  setPopup: () => {},
  setFilter: () => {},
});

const App = () => {
  const [user, setUser] = useState();
  const [filter, setFilter] = useState("");
  const [images, setImages] = useState<ImageObj[]>([]);
  const [popup, setPopup] = useState<PopupState>();

  useEffect(() => {
    if (user) return;

    const u = localStorage.getItem("unsplash-user");
    if (u) setUser(JSON.parse(u));
  }, []);

  useEffect(() => {
    const call = async () => {
      const images = await getImages();

      if (images) setImages(images);
      else setImages([]);
    };

    call();
  }, []);

  const value: Value = { user, setUser, images, setPopup, filter, setFilter };

  return (
    <PopupContext.Provider value={value}>
      <Header />
      <Images />
      {popup && <PopupBox popup={popup} />}
    </PopupContext.Provider>
  );
};

export default App;

interface Value {
  user: any | undefined | null;
  images: ImageObj[];
  filter: string;
  setUser: Function;
  setPopup: Function;
  setFilter: Function;
}

export interface ImageObj {
  id: number;
  imageURL: string;
  title: string;
  userId?: number;
}

type PopupState = { modal: FunctionComponent } | undefined;
