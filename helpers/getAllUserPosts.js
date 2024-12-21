// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../firebase/config";

// const getAllUserPosts = async (userUid) => {
//   const posts = [];
//   try {
//     // Reference to the 'posts' subcollection under a specific user
//     const postsRef = await collection(db, "users", userUid, "posts");

//     // Get all documents from the posts subcollection
//     const querySnapshot = getDocs(postsRef);

//     // Create an array to hold the documents
//     querySnapshot.forEach((doc) => {
//       console.log("data posts------>", doc.data()); // Push each document data into the posts array
//       posts.push(doc.data());
//     });
//     console.log("from file posts returned -----? ", posts);

//     return posts;
//   } catch (error) {
//     console.error("Error getting posts: ", error);
//     return [];
//   }
// };

// export default getAllUserPosts;

import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

const getAllUserPosts = async (userUid) => {
  const posts = [];
  try {
    // Reference to the 'posts' subcollection under a specific user
    const postsRef = collection(db, "users", userUid, "posts");

    // Get all documents from the posts subcollection
    const querySnapshot = await getDocs(postsRef); // FIXED: Await for querySnapshot

    // Create an array to hold the documents
    querySnapshot.forEach((doc) => {
      console.log("data posts------>", doc.data());
      posts.push({ id: doc.id, ...doc.data() }); // Include document ID in the result
    });

    console.log("from file posts returned -----? ", posts);
    return posts;
  } catch (error) {
    console.error("Error getting posts: ", error);
    return [];
  }
};

export default getAllUserPosts;
