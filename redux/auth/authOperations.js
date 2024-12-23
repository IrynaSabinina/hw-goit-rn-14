import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { auth, db } from "../../firebase/config";
import { updateUserProfile, authStateChange, authSignOut } from "./authSlice";

export const authSignUpUser =
  ({ login, email, password, photo }) =>
  async (dispatch, state) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const user = auth.currentUser;

      await updateProfile(user, {
        displayName: login,
        photoURL: photo,
      });
      // await updateProfile(user, {
      //         displayName: login,
      //         avatar: photo,});
      const { uid, displayName, email: emailBase, photoURL } = auth.currentUser;

      const userProfile = {
        userId: uid,
        login: displayName,
        email: emailBase,
        avatar: photoURL,
      };

      dispatch(updateUserProfile(userProfile));
      return user;
    } catch (error) {
      return error.code;
    }
  };

export const authSignInUser = (email, password) => async (dispatch, state) => {
  console.log("oper---------->", email);
  try {
    await signInWithEmailAndPassword(auth, email, password);
    const user = auth.currentUser;
    const { uid, displayName, email: emailBase, photoURL } = auth.currentUser;

    const userProfile = {
      userId: uid,
      login: displayName,
      email: emailBase,
      avatar: photoURL,
    };

    dispatch(updateUserProfile(userProfile));
    return user;
  } catch (error) {
    return error.code;
  }
};

export const authUpdateUser =
  ({ avatarURL }) =>
  async (dispatch, state) => {
    try {
      const user = auth.currentUser;

      await updateProfile(user, {
        avatar: avatarURL,
      });

      const {
        uid,
        displayName,
        email: emailBase,
        avatar: photoUrlBase,
      } = auth.currentUser;

      const userProfile = {
        userId: uid,
        login: displayName,
        email: emailBase,
        avatar: photoUrlBase,
      };

      dispatch(updateUserProfile(userProfile));
    } catch (error) {
      return error.code;
    }
  };

export const authStateChangeUser = () => async (dispatch, state) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userProfile = {
        userId: user.uid,
        login: user.displayName,
        email: user.email,
        avatar: user.photoURL,
      };

      dispatch(authStateChange({ stateChange: true }));
      dispatch(updateUserProfile(userProfile));
    }
  });
};

export const authSignOutUser = () => async (dispatch, state) => {
  await signOut(auth);

  dispatch(authSignOut());
};
