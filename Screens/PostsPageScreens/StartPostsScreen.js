import { FlatList, Image } from "react-native";
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import { Text, View } from "react-native";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectAvatar,
  selectEmail,
  selectLogin,
  selectUserId,
} from "../../redux/auth/authSelectors";
import PostsItem from "../components/Post/PostsItem";
import { db, storage } from "../../firebase/config";
import { getDownloadURL, ref } from "firebase/storage";
import getAllUserPosts from "../../helpers/getAllUserPosts";

const StartPostsScreen = ({ route }) => {
  const [avatar, setAvatar] = useState(useSelector(selectAvatar));
  const login = useSelector(selectLogin);
  const email = useSelector(selectEmail);
  const uid = useSelector(selectUserId);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      // Fetch posts using the helper function
      const userPosts = await getAllUserPosts(uid);
      setPosts(userPosts);
    };
    if (uid) {
      fetchPosts(); // Fetch posts only if userId is available
    }
  }, [uid, posts.lenght]);

  useEffect(
    () => {
      if (!route.params) return;
    },
    [route.params],
    avatar
  );
  const avatarRef = ref(storage, `avatars/${uid}`);
  getDownloadURL(avatarRef)
    .then((url) => {
      if (url) {
        console.log(url);
        setAvatar(url);
      }
    })
    .catch((error) => {
      setAvatar(
        "https://firebasestorage.googleapis.com/v0/b/functions-tests-5ba2b.appspot.com/o/avatars%2Fdefault.jpg?alt=media&token=04ef4786-4f85-482a-91c1-125e5ef47345"
      );
    });
  /// Firestore posts

  return (
    <View style={styles.container}>
      <View style={styles.avatarWrapper}>
        <Image style={styles.avatarImg} source={{ uri: avatar }} />
        <View>
          <Text style={styles.avatarName}>{login}</Text>
          <Text style={styles.avatarEmail}>{email}</Text>
        </View>
      </View>
      <FlatList
        style={styles.postsWrapper}
        data={posts}
        renderItem={({ item }) => (
          <PostsItem
            postName={item.postName}
            postImg={item.postImg}
            postAddress={item.postAddress}
            postLocation={item.postLocation}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.navTabs}></View>
    </View>
  );
};

export default StartPostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingHorizontal: 16,
    paddingTop: 32,

    backgroundColor: "#fff",
  },
  avatarWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  avatarImg: {
    width: 60,
    height: 60,

    marginRight: 8,

    backgroundColor: "#f6f6f6",
    borderRadius: 16,
  },
  avatarName: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: 13,
    lineHeight: 15,

    color: "#212121",
  },
  avatarEmail: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 11,
    lineHeight: 13,

    color: "rgba(33, 33, 33, 0.8)",
  },
});
