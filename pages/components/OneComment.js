import React, { useState, useEffect } from "react";
import { View, Image, ActivityIndicator } from "react-native";
import { Card, Text, Avatar } from "react-native-paper";
import API, { endpoints } from "../../Networking/API";
import CardImage from "./card";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";


const ReviewCard = ({ comment, loading, keyProp,  id }) => {
    // const [comment, setComment] = useState(null);
    // const [loading, setLoading] = useState(true);

    // const LoadComment = async () => {
    //     try {
    //         let res = await API.get(endpoints.comments + "baseinfo/?id=" + id + "&key=1");
    //         setComment(res.data);
    //     } catch (error) {
    //         setLoading(false);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // useEffect(() => {
    //     LoadComment();
    // }, [id]);
    const user = comment?.comment?.Customer?.user;
    // const user = comment?.Customer?.user;
    const avatarUrl = user?.avatar;
    const username = user?.username || "Ẩn danh";
    const image = comment?.image



    const navigation = useNavigation()



    return (
        <View>
            {loading ? (
                <ActivityIndicator size="large" color="blue" />
            ) : comment ? (
                <View>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Avatar.Image size={40} source={{ uri: avatarUrl }} />
                        <View style={{ marginLeft: 10, flex: 1 }}>
                            <Text variant="titleMedium">{username}</Text>
                        </View>

                        <TouchableOpacity
                            style={{ flexDirection: "row", alignItems: "center" }}
                            onPress={() => navigation.navigate("Allcomment", {id: id})}

                        >
                            <Text>Xem thêm </Text>
                            <MaterialCommunityIcons name="chevron-right" size={20} color="black" />
                        </TouchableOpacity>

                    </View>

                    <Text variant="bodyMedium" numberOfLines={3} ellipsizeMode="tail" style={{ marginTop: 5 }}>
                        {comment?.comment?.Content || "Không có nội dung."}
                    </Text>

                    {image && image.length > 0 && <CardImage providers={image} />}
                </View>
            ) : (
                <Text>Chưa có bình luận nào!</Text>
            )}
        </View>


    );
};

const OneComment = ({ comment, loading, keyProp, id }) => {
    return (
        <View style={{ flex: 1, padding: 10 }}>
            <ReviewCard
                comment={comment}
                loading={loading}
                // {...(keyProp !== false && NavigateAllComment && { NavigateAllComment })}
                keyProp={keyProp}
                id = {id}
    
            />
        </View>
    );
};


export default OneComment;
