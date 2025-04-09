import React, { useEffect, useState, useCallback } from "react";
import { View, ActivityIndicator, FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";
import API, { endpoints } from "../Networking/API";
import { useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { Avatar, Searchbar, Text } from "react-native-paper";
import TextInputCommnet from "./components/textInputComnet";


const CommentItem = ({ comment, level = 0, id }) => {

    const [replyingTo, setReplyingTo] = useState(null);
    console.log(id);


    return (
        <View style={[styles.commentContainer, { marginLeft: level * 20 }]}>
            <View style={styles.userInfo}>
                <Avatar.Image size={40} source={{ uri: comment?.Customer?.user?.avatar }} />
                <Text style={styles.username}>{comment?.Customer?.user?.username}</Text>
            </View>

            <Text style={styles.commentText}>{comment?.Content}</Text>

            {comment.image.length > 0 && (
                <FlatList
                    data={comment?.image}
                    keyExtractor={(item) => item.id}
                    horizontal
                    renderItem={({ item }) => (
                        <Image source={{ uri: item.avatar }} style={styles.commentImage} />
                    )}
                />
            )}
            <TouchableOpacity onPress={() => setReplyingTo(comment.id)}>
                <Text style={{ textAlign: "right", color: "blue" }}>Phản hồi</Text>
            </TouchableOpacity>

            {replyingTo === comment.id && (
                <TextInputCommnet id={id} CommentID={comment.CommentID} />
            )}


            {comment.replies.length > 0 && (
                <View style={styles.repliesContainer}>
                    {comment.replies.map((reply) => (
                        <CommentItem key={reply.CommentID} comment={reply} level={level + 1} id={id} />
                    ))}
                </View>
            )}
        </View>
    );
};


const Allcomment = () => {

    const route = useRoute();
    const { id } = route.params;

    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    const LoadComment = async () => {
        try {

            let res = await API.get(endpoints.comments + "get_comment_ed/?id=" + id);
            setComments(res.data);
        } catch (error) {
            setLoading(false);
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        LoadComment();
    }, [id]);

    if (loading) {
        return <ActivityIndicator size="large" color="blue" />;
    }

    return (
        <View style={{ flex: 1, padding: 10, height: 200 }}>
            <FlatList
                data={comments}
                keyExtractor={(item) => item.CommentID.toString()}
                renderItem={({ item }) => <CommentItem comment={item} id={id} />}
                nestedScrollEnabled
            />
        </View>
    );
};



const styles = StyleSheet.create({
    commentContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    userInfo: {
        flexDirection: "row",
        alignItems: "center",
    },
    username: {
        marginLeft: 10,
        fontWeight: "bold",
    },
    commentText: {
        fontSize: 16,
        marginTop: 5,
    },
    commentImage: {
        width: 80,
        height: 80,
        marginTop: 5,
        marginRight: 5,
        borderRadius: 10,
    },
    repliesContainer: {
        marginTop: 5,
        marginLeft: 5, // Đẩy bình luận con vào trong
        borderLeftWidth: 1,
        borderLeftColor: "#ccc",
        // paddingLeft: 10,
    },
});

export default Allcomment;
