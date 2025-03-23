import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Appbar, Button, Card, Avatar } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useNavigation } from '@react-navigation/native';



const SignUp = () => {

    const navigation = useNavigation();
    return (
        <SafeAreaProvider>
            <View style={styles.container}>

                <Appbar.Header style={styles.header}>
                    <Appbar.Content title="Tài khoản" titleStyle={styles.headerTitle} />
                </Appbar.Header>


                <Card style={styles.card}>
                    <Card.Content>
                        <Text style={styles.brand}>HNT</Text>

                        


                        <Text style={styles.registerText}>Đăng ký tài khoản với</Text>

                        <View style={styles.socialContainer}>
                            <MaterialCommunityIcons name="facebook" size={50} color="#1877F2" />
                            <MaterialCommunityIcons name="google" size={50} color="#DB4437" />
                        </View>

                        <Text style={styles.policyText}>
                            Khi đăng nhập hoặc đăng ký tài khoản, đồng nghĩa với việc bạn chấp nhận
                            <Text style={styles.link}> Quy chế hoạt động </Text>
                            và
                            <Text style={styles.link}> Chính sách bảo mật </Text>
                            của HNT
                        </Text>


                        <Text style={styles.loginLink}>
                            Đã có tài khoản HNT?
                            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                                <Text style={{ color: 'blue', fontWeight: 'bold' }}> Đăng nhập</Text>
                            </TouchableOpacity>
                        </Text>



                    </Card.Content>
                </Card>

                {/* Nút Trung tâm trợ giúp */}
                <Card style={styles.helpCard}>
                    <Card.Content>
                        <View style={styles.helpRow}>
                            <MaterialCommunityIcons name="chat-question-outline" size={24} color="white" />
                            <Text style={styles.helpText}>Trung tâm trợ giúp</Text>
                        </View>
                    </Card.Content>
                </Card>
            </View>
        </SafeAreaProvider >
    );
};




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f8f8",
        padding: 10,
    },
    header: {
        backgroundColor: "#ffffff",
        elevation: 0,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#2C2C2C",
    },
    card: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        marginTop: 10,
    },
    brand: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#d81b60",
        textAlign: "center",
    },
    subtitle: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 10,
    },
    earning: {
        fontSize: 14,
        color: "#666",
        textAlign: "center",
        marginVertical: 5,
    },
    registerText: {
        fontSize: 14,
        color: "#999",
        textAlign: "center",
        marginTop: 20,
    },
    socialContainer: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 20,
        marginVertical: 15,
    },
    policyText: {
        fontSize: 12,
        textAlign: "center",
        color: "#666",
        marginVertical: 5,
    },
    link: {
        color: "#d81b60",
        fontWeight: "bold",
    },
    loginLink: {
        fontSize: 14,
        color: "#007AFF",
        textAlign: "center",
        marginTop: 10,
    },
    helpCard: {
        backgroundColor: "#d81b60",
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
    },
    helpRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
    },
    helpText: {
        fontSize: 16,
        color: "white",
        fontWeight: "bold",
    },
});

export default SignUp;
