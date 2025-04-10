import * as React from 'react';
import { Appbar, Avatar, Card, List, Divider, Button, Modal, Portal, PaperProvider } from 'react-native-paper';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; 
import SignUp from './SignUp';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPermissions } from '../redux/permission';
import { logoutUser } from '../redux/userSlice';
import InfoBase from './components/supplier';


const TaiKhoan = () => {
    const navigation = useNavigation();
    const user  = useSelector((state) => state.user.user);

    const dispatch = useDispatch();
    const { data: permissions, loading, error } = useSelector((state) => state.permissions);

    useEffect(() => {
        if (user?.id) {
            dispatch(fetchPermissions(user.id));
        }
    }, [user, dispatch]);


    const [visible, setVisible] = useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: 'white', padding: 20 };
    const Logout_User = () => {

        dispatch(logoutUser());

        return navigation.navigate("AppMain");
    }


    return (
        <SafeAreaProvider>
            <View style={styles.container}>

                <Appbar.Header style={{ backgroundColor: "white", elevation: 0 }}>
                    <Appbar.Content
                        title="Tài khoản"
                        titleStyle={{ fontSize: 24, fontWeight: "bold", color: "#2C2C2C" }}
                    />
                    <Appbar.Action icon="heart-outline" />
                    <Appbar.Action icon="chat-processing-outline" />
                    <Appbar.Action icon="cog-outline" onPress={() => navigation.navigate("ThongTinCaNhan")} />
                </Appbar.Header>

                <InfoBase user= {user}  />

                <PaperProvider>
                    <Card style={styles.card}>

                        <Portal>
                            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>

                                <Text>
                                    Bạn chắc chắn muốn đăng xuất?
                                </Text>
                                <View style={{ flexDirection: "row", justifyContent: "flex-end", marginHorizontal: 30, }}>
                                    <Button>Hủy</Button>
                                    <Button onPress={Logout_User}>Đăng xuất</Button>

                                </View>

                            </Modal>
                        </Portal>

                        <View>
                            <List.Item
                                title="Đăng xuất"
                                left={() => (
                                    <MaterialCommunityIcons name="ticket-percent" size={24} color="#d81b60" />
                                )}
                                right={() => (
                                    <MaterialCommunityIcons name="chevron-right" size={24} color="#999" />
                                )}
                                onPress={showModal}
                                titleStyle={styles.title}
                            />
                            <Divider />
                        </View>


                        {Array.isArray(permissions) && permissions.length > 0 ? (
                            permissions.map((item, index) => (
                                <View key={item.id}>
                                    <List.Item
                                        title={item.name}
                                        left={() => (
                                            <MaterialCommunityIcons name="ticket-percent" size={24} color="#d81b60" />
                                        )}
                                        right={() => (
                                            <MaterialCommunityIcons name="chevron-right" size={24} color="#999" />
                                        )}
                                        onPress={() => navigation.navigate(item.codename)}
                                        titleStyle={styles.title}
                                    />
                                    {index < permissions.length - 1 && <Divider />}
                                </View>
                            ))
                        ) : (
                            <Text style={{ textAlign: "center", padding: 20 }}>Không có quyền nào</Text>
                        )}

                    </Card>
                </PaperProvider>

            </View>

        </SafeAreaProvider>
    );


};


const styles = StyleSheet.create({
    container: { flex: 1,paddingHorizontal: 10  },
    body: { flex: 1, flexDirection: "row", alignItems: 'center', justifyContent: 'center', margin: 10 },
    row: { flexDirection: 'row', alignItems: 'center' },
    text: { marginLeft: 10, fontWeight: 'bold', fontSize: 22 },
    card: { 
        padding: 10
    },
    title: { fontSize: 16, color: '#333' }
});

export default TaiKhoan;
