import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Appbar, Button, Card, Avatar, TextInput, ActivityIndicator, HelperText } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as FileSystem from "expo-file-system";
import API, { endpoints } from "../Networking/API";


const SignUp = () => {
    const [last_name, setlast_name] = useState('');
    const [first_name, setfirst_name] = useState('');
    const [email, setEmail] = useState('@gmail.com');
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [address, setaddress] = useState('');
    const [open, setOpen] = useState(false);
    const [role, setrole] = useState(null);
    const [items, setItems] = useState([
        { label: "Cá nhân", value: "0" },
        { label: "Tiểu thương hoặc danh nghiệp", value: "1" }
    ]);

    const info = [{
        label: 'Họ',
        icon: "text",
        secureTextEntry: false,
        field: "last_name"
    }, {
        label: 'Tên',
        icon: "text",
        secureTextEntry: false,
        field: "first_name"
    }, {
        label: 'Tên đăng nhập',
        icon: "text",
        secureTextEntry: false,
        field: "username"
    }, {
        label: 'Mật khẩu',
        icon: "eye",
        secureTextEntry: true,
        field: "password"
    }, {
        label: 'Xác nhận mật khẩu',
        icon: "eye",
        secureTextEntry: true,
        field: "confirm"
    },
    {
        label: 'Địa chỉ',
        icon: "text",
        secureTextEntry: true,
        field: "address"
    },
    {
        label: 'Email',
        icon: "text",
        secureTextEntry: true,
        field: "email"
    }
                
                 ];
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);

    const setState = (value, field) => {
        setUser({...user, [field]: value});
    }
    
    // const [newImage, setNewImage] = useState({ name: "", image: "", type: "" });

    const navigation = useNavigation();

    // const pickImage = async () => {
    //     console.log("Đã vào đây");
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //         quality: 1,
    //     });

    //     if (!result.canceled) {

    //         const imageUri = result.assets[0].uri;
    //         let localUri = result.assets[0].uri;
    //         let filename = localUri.split('/').pop(); // Lấy tên file

    //         let match = /\.(\w+)$/.exec(filename);
    //         let fileType = match ? `image/${match[1]}` : `image`;


    //         setNewImage({
    //             name: filename,
    //             image: imageUri,
    //             type: fileType,
    //         });

    //     }
    // };

    const picker = async () => {
        let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            alert("Permissions denied!");
        } else {
            const result = await ImagePicker.launchImageLibraryAsync();

            if (!result.canceled)
                setState(result.assets[0], "avatar");
        }
    }

    

    // useEffect(() => {
    //     console.log(newImage);
    //     console.log(items[0].label);
    // }, [newImage])

  
    const validate = () => {
        
        if (!user?.username || !user?.password || !user?.address || !user?.email) {
            setMsg("Vui lòng nhập tên đăng nhập và mật khẩu!");
            return false;
        } else if (user.password !== user.confirm) {
            setMsg("Mật khẩu KHÔNG khớp!");
            return false;
        }
        setMsg(null);
        
        return true;
    }


    const SignUpUser = async () => {
        if ( validate === true ) { 
            try {
    
                setLoading(true);
                let formData = new FormData();
                // formData.append('avatar', {
                //     uri: newImage.image,
                //     name: newImage.name,
                //     type: newImage.type
                // });
                // formData.append("username", username);
                // formData.append("password", password);
                // formData.append("first_name", first_name);
                // formData.append("last_name", last_name);
                // formData.append("email", email);
                // formData.append("address", address);
                // formData.append("role", items[role].label);

                for (let key in user) {
                    if (key !== 'confirm') {
                        if (key === 'avatar' && user?.avatar !== null) {
                            form.append(key, {
                                uri: user.avatar.uri,
                                name: user.avatar.fileName,
                                type: user.avatar.type
                            });
                        } else {
                            form.append(key, user[key]);
                        }
                    }
                }

                formData.append("role", items[role].label);
                
                console.log(formData);
    
                await API.post(endpoints.users + "signup/", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                })
    
                setUser({});
                return navigation.navigate("SignIn");
            }
            catch (error) {
                console.log(error);
            }
            finally {
                setLoading(false);
            }
        }


    }


    return (
        <SafeAreaProvider>
            <View style={styles.container}>

                <Appbar.Header style={styles.header}>
                    <Appbar.Content title="Tài khoản" titleStyle={styles.headerTitle} />
                </Appbar.Header>

            

                <View style={styles.avatarContainer}>
                    <Avatar.Image size={100} source={{ uri: newImage.image || 'https://res.cloudinary.com/dxw8gtpd8/image/upload/v1742716253/bj1op6ixbnhez9vycham.jpg' }} />
                    <TouchableOpacity onPress={picker}>
                        <Text style={styles.changeAvatar}>Thay đổi hình đại diện</Text>
                    </TouchableOpacity>
                </View>
                <HelperText type="error" visible={msg}>
                    {msg}
                </HelperText>

    
                <DropDownPicker
                    open={open}
                    value={role}
                    items={items}
                    setOpen={setOpen}
                    setValue={setrole}
                    setItems={setItems}
                    searchable={true}
                    placeholder="Chọn phương thức..."
                />
                <KeyboardAwareScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <ScrollView>
                        <View style={{ gap: 12 }}>
                            // <TextInput label="Họ" value={last_name} onChangeText={setlast_name} mode="outlined" />
                            // <TextInput label="Tên" value={first_name} onChangeText={setfirst_name} mode="outlined" />
                            // <TextInput label="Tên tài khoản" value={username} onChangeText={setusername} mode="outlined" />
                            // <TextInput label="Mật khẩu" value={password} onChangeText={setpassword} mode="outlined" />
                            // <TextInput label="Email" value={email} onChangeText={setEmail} mode="outlined" />
                            // <TextInput label="Thành phố/Tỉnh" value={address} onChangeText={setaddress} mode="outlined" />
                         {info.map(i => 
                                   <TextInput value={user[i.field]} 
                                              onChangeText={t => setState(t, i.field)} 
                                              key={i.field} 
                                              label={i.label} 
                                              secureTextEntry={i.secureTextEntry} 
                                              mode="outlined"
                                              right={<TextInput.Icon icon={i.icon} />}
                                               />)}
                        </View>




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



                        <Button mode="contained" style={styles.button} onPress={SignUpUser} loading={loading}>
                            {loading ? "Đang đăng ký..." : "Đăng ký"}
                        </Button>
                    </ScrollView>
                </KeyboardAwareScrollView>
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
    avatarContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#d81b60',
        paddingVertical: 8,
        borderRadius: 5,
    },
});

export default SignUp;
