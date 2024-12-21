import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase/config";

const getImageURLFromFirebase = async (firebaseFolder, fileName) => {
  try {
    const storageRef = ref(storage, `${firebaseFolder}/${fileName}`);
    const downloadURL = await getDownloadURL(storageRef);
    console.log(`Image URL: ${downloadURL}`);
    return downloadURL;
  } catch (error) {
    console.error(`Error fetching image URL: ${error}`);
    return null;
  }
};
export default getImageURLFromFirebase;
