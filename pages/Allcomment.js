import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import CommentList from "./components/comment";
import API, { endpoints } from "../Networking/API";
import { useRoute } from "@react-navigation/native";



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
            <CommentList comments={comments} />
        </View>
    );
};

export default Allcomment;
