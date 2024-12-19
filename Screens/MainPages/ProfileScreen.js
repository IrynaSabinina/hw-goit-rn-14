import { ImageBackground } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { StyleSheet, View, Image, Text } from "react-native";
import { Dimensions } from "react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native";

import backgroundImg from "../../assets/img/background.jpg";
import SvgAddButton from "../../assets/svg/SvgAddButton";
import { useDispatch, useSelector } from "react-redux";
import { selectLogin, selectUserId } from "../../redux/auth/authSelectors";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase/config";
import { authSignOutUser } from "../../redux/auth/authOperations";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const [avatar, setAvatar] = useState(null);
  const name = useSelector(selectLogin);
  const uid = useSelector(selectUserId);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // const onLoadAvatar = async () => {
  //   const avatarImg = await DocumentPicker.getDocumentAsync({
  //     type: "image/*",
  //   });

  //   if (avatarImg.type === "cancel") return setAvatar(null);

  //   setAvatar(avatarImg);
  // };

  const onLoadAvatar = async () => {
    const avatarImg = await DocumentPicker.getDocumentAsync({
      type: "image/*",
    });

    if (avatarImg.type === "cancel") return setAvatar(null);

    setAvatar(avatarImg);
    // const uniquePostId = email + Date.now().toString();
    const uniquePostId = uid;
    if (avatarImg) {
      console.log(avatarImg);
      try {
        const response = await fetch(avatarImg);

        const file = await response.blob();

        const imageRef = await ref(storage, `avatars/${uniquePostId}`);

        await uploadBytes(imageRef, file);

        const downloadURL = await getDownloadURL(imageRef);
        await uploadImageToServer(downloadURL, "avatars", uid);
        // return downloadURL;
      } catch (error) {
        console.warn("uploadImageToServer: ", error);
      }
    }
  };

  return (
    <ImageBackground source={backgroundImg} style={styles.bgContainer}>
      <View>
        <View style={styles.contentWrapper}>
          <View style={styles.avatarWrapper}>
            <Image style={styles.avatar} source={avatar} />
            <TouchableOpacity
              style={avatar ? styles.btnAddAvatarLoad : styles.btnAddAvatar}
              onPress={onLoadAvatar}
            >
              <SvgAddButton
                style={
                  avatar ? styles.btnAddAvatarSvgLoad : styles.btnAddAvatarSvg
                }
              />
            </TouchableOpacity>
          </View>
          <Text style={{ ...styles.title, marginTop: 92 }}>{name}</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  bgContainer: {
    resizeMode: "cover",
    justifyContent: "center",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },

  contentWrapper: {
    paddingHorizontal: 16,

    width: "100%",
    height: "100%",
    marginTop: 247,

    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  title: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",

    marginTop: 32,
    marginBottom: 32,
    color: "#212121",
  },
  avatarWrapper: {
    position: "absolute",
    top: -60,
    alignSelf: "center",

    width: 120,
    height: 120,

    backgroundColor: "#f6f6f6",
    borderRadius: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  btnAddAvatar: {
    position: "absolute",
    bottom: 14,
    right: -12.5,
    alignItems: "center",
    alignContent: "center",
    width: 25,
    height: 25,
    color: "#ff6c00",
    backgroundColor: "#ffffff",
    borderRadius: 50,
  },
  btnAddAvatarLoad: {
    position: "absolute",
    bottom: 14,
    right: -12.5,
    alignItems: "center",
    alignContent: "center",
    width: 25,
    height: 25,
    color: "#ff6c00",
    backgroundColor: "#ffffff",
    borderRadius: 50,
    transform: [{ rotate: "45deg" }],
  },
  btnAddAvatarSvg: {
    fill: "#ff6c00",
    stroke: "#ff6c00",
    backgroundColor: "#ffffff",
  },
  btnAddAvatarSvgLoad: {
    fill: "#bdbdbd",
    stroke: "#e8e8e8",
    backgroundColor: "#ffffff",
  },
});
