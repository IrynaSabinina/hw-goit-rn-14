import {
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { FlatList, Image, StyleSheet, TextInput } from "react-native";
import { View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import CommentItem from "../components/Comment/CommentItem";
import { Keyboard } from "react-native";
import SvgArrowLeft from "../../assets/svg/SvgArrowLeft";

const CommentsScreen = ({ navigation, route: { params } }) => {
  const isFocused = useIsFocused();

  const [commentText, setCommentText] = useState("");
  const [comments, setComment] = useState([
    {
      autorAvatar: "",
      comment: "Comment 1n",
      date: "09 червня, 2021 | 08:40",
    },
    {
      autorAvatar: "",
      comment: "Comment 2",
      date: "09 червня, 2023 | 18:45",
    },
    {
      autorAvatar: "",
      comment: "Comment 3n",
      date: "09 червня, 2024 | 08:40",
    },
  ]);

  useEffect(() => {
    if (isFocused) {
      navigation?.getParent("Home")?.setOptions({
        tabBarStyle: { display: "none" },
        headerShown: false,
      });
    }
  }, []);

  const handleAddComment = () => {
    if (!commentText || !commentText.trim())
      return console.warn("Будь ласка напишіть коментар");
    const data = {
      autorAvatar: "",
      comment: commentText,
      date: "09 червня, 2020 | 08:40",
    };

    setComment((prev) => [...prev, data]);
    handleKeyboardHide();
    setCommentText("");
  };

  const handleKeyboardHide = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handleKeyboardHide}>
      <View style={styles.container}>
        <Image style={styles.postImg} source={{ uri: params.postImg }} />
        <FlatList
          style={styles.commentList}
          data={comments}
          renderItem={({ item }) => (
            <CommentItem
              comment={item.comment}
              date={item.date}
              autorAvatar={item.autorAvatar}
            />
          )}
          keyExtractor={(item, idx) => idx.toString()}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
        >
          <View style={styles.inputCommentWrapper}>
            <TextInput
              style={styles.commentInput}
              placeholder="Коментувати..."
              placeholderTextColor="#bdbdbd"
              autoComplete="off"
              value={commentText}
              onChangeText={setCommentText}
            />
            <TouchableOpacity
              style={styles.commentBtn}
              onPress={handleAddComment}
            >
              <SvgArrowLeft style={styles.svgArrow} stroke="#ffffff" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    backgroundColor: "#fff",
  },
  postImg: {
    height: 240,
    width: "100%",
    marginBottom: 28,
    backgroundColor: "#f6f6f6",
    borderRadius: 8,
  },
  commentList: {
    maxHeight: 312,
    marginBottom: 28,
  },
  inputCommentWrapper: {},
  commentInput: {
    position: "relative",
    width: "100%",
    height: 50,
    padding: 16,
    borderRadius: 100,
    borderWidth: 1,
    backgroundColor: "#f6f6f6",
    borderColor: "#e8e8e8",
  },
  commentBtn: {
    position: "absolute",
    right: 8,
    top: 7,
    paddingHorizontal: 6,
    paddingVertical: 6,
    backgroundColor: "#ff600c",
    borderRadius: 100,
  },

  svgArrow: {
    height: 10,
    width: 10,
    transform: [{ rotate: "90deg" }],
  },
});
