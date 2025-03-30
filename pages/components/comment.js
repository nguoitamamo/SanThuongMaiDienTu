import React from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import { Avatar } from "react-native-paper";
import { TouchableOpacity } from "react-native";

const CommentItem = ({ comment, level = 0 }) => {
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
            <TouchableOpacity>
                <Text style={{ textAlign: "right", color: "blue" }}>Phản hồi</Text>
            </TouchableOpacity>

            {comment.replies.length > 0 && (
                <View style={styles.repliesContainer}>
                    {comment.replies.map((reply) => (
                        <CommentItem key={reply.CommentID} comment={reply} level={level + 1} />
                    ))}
                </View>
            )}
        </View>
    );
};

const CommentList = ({ comments }) => {
    console.log(comments);
    return (
        <FlatList
            data={comments}
            keyExtractor={(item) => item.CommentID.toString()}
            renderItem={({ item }) => <CommentItem comment={item} />}
            nestedScrollEnabled
        />
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

export default CommentList;
