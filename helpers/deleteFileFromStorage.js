import { ref } from "firebase/storage";
import { storage } from "../firebase/config";

const deleteFileFromStorage = async (path) => {
  const delRef = ref(storage, path);
  // Delete the file
  await deleteObject(delRef).catch((error) => {
    console.log("oh oh, try again later", error);
  });
};
export default deleteFileFromStorage;
