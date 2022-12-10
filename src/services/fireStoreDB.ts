import { db } from "./firebaseInit";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { ImageObj } from "./../App";

const splashCol = collection(db, "Myunsplash");
const docRef = doc(splashCol, "j9KQ3DrEbpDB7kh1rW1k");

export const getImages = async () => {
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) return docSnap.data()["unsplash"];
  else console.log("NO images");
};

export const setImage = async (image: ImageObj) => {
  const images = await getImages();

  await setDoc(docRef, { unsplash: [image, ...images] });
  window.location.reload();
};

export const deleteImage = async (id: number) => {
  const images: ImageObj[] = await getImages();

  await setDoc(docRef, {
    unsplash: images.filter((image) => image.id !== id),
  });

  window.location.reload();
};
