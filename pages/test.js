import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import CommentList from "./components/comment";
import axios from "axios";

const CommentScreen = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://192.168.1.154:8000/comments/get_comment_ed/?id=1")
      .then((response) => {
        setComments(response.data);
        setLoading(false);
      })
      .catch((error) => console.error("Lỗi khi tải comment:", error));
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="blue" />;
  }

  return (
    <View style={{ flex: 1, padding: 10, height: 200 }}>
      <CommentList comments={comments} />
    </View>
  );
};

export default CommentScreen;
