import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import * as FileSystem from "expo-file-system";
import { storage } from "../firebase/config";
import * as ImagePicker from "expo-image-picker";

// Initialize Firebase Client SDK for React Native

// Function to save image from URI to Firebase Storage (React Native)
const saveImageToFirebase = async (fileUri, firebaseFolder, fileName) => {
  console.log("fileUri---->", fileUri);
  try {
    // Read the file as a blob
    // const fileName = fileUri.split("/").pop();

    const response = await fetch(fileUri);

    const file = await response.blob();
    const storageRef = ref(storage, `${firebaseFolder}/${fileName}`);
    await uploadBytes(storageRef, file);

    // Get the download URL
    const downloadURL = await getDownloadURL(storageRef);
    // console.log(`File uploaded to Firebase: ${downloadURL}`);
    return downloadURL;
  } catch (error) {
    console.error(`Error uploading file to Firebase: ${error}`);
    return null;
  }
};

export default saveImageToFirebase;
