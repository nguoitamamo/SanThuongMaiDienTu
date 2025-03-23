
import React, { useState , useEffect} from "react";
import { StyleSheet, Text, View } from "react-native";
import { Appbar, Button, Card, Avatar, TextInput, useTheme } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/userSlice";



const SignIn = () => {
    const [username, SetUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const { user, loading, error } = useSelector((state) => state.user);
    const handleLogin = () => {

        dispatch(loginUser({ username, password }));
        console.log(user);
    };
    const navigation = useNavigation();
    useEffect(() => {
        if (user) {
            navigation.replace("TaiKhoan"); // Thay "Home" bằng tên màn hình bạn muốn chuyển đến
        }
    }, [user]);

    
    return (
        <SafeAreaProvider>
            <View style={styles.container}>


                <Card style={styles.card}>

                    <Text style={styles.brand}>ĐĂNG NHẬP</Text>
                    <View style={{ gap: 12 }}>
                        <TextInput label="Tên Tài khoản" value={username} onChangeText={SetUsername} mode="outlined" />
                        <TextInput label="Mật Khẩu" value={password} onChangeText={setPassword} mode="outlined" />

                        {error && <Text style={styles.error}>{error.username?.[0] || "Đăng nhập thất bại!"}</Text>}

                        <Button mode="contained" style={styles.button} onPress={handleLogin} loading={loading}>
                            {loading ? "Đang đăng nhập..." : "Đăng Nhập"}
                            
                        </Button>
                    </View>
                </Card>

                <Text style={styles.registerText}>Đăng nhập với tài khoản</Text>

                <View style={styles.socialContainer}>
                    <MaterialCommunityIcons name="facebook" size={50} color="#1877F2" />
                    <MaterialCommunityIcons name="google" size={50} color="#DB4437" />
                </View>
            </View>
        </SafeAreaProvider>

    );
}


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
    button: {
        marginTop: 20,
        backgroundColor: '#d81b60',
        paddingVertical: 8,
        borderRadius: 5,
    },
});




export default SignIn;