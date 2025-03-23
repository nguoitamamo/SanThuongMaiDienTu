import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity ,ScrollView } from 'react-native';
import { Avatar, Button, TextInput, Text, Card, IconButton } from 'react-native-paper';

const ProfileScreen = () => {
    const [name, setName] = useState('Huỳnh Ngọc Trương');
    const [email, setEmail] = useState('huynhngoctruonggg@gmail.com');
    const [city, setCity] = useState('Tỉnh Bình Định');
    const [gender, setGender] = useState('Nam');

    return (
        <View style={styles.container}>

            <ScrollView>

                <View style={styles.avatarContainer}>
                    <Avatar.Image size={100} source={{ uri: 'https://res-console.cloudinary.com/ddkpaw2gy/thumbnails/v1/image/upload/v1732799925/ajVnczE3MzVpbXhiY3ZzbXQ2cnQ=/drilldown' }} />
                    <TouchableOpacity>
                        <Text style={styles.changeAvatar}>Thay đổi hình đại diện</Text>
                    </TouchableOpacity>
                </View>


                <Card style={styles.card}>
                    <View style={{ gap: 12 }}>
                        <TextInput label="Họ và tên" value={name} onChangeText={setName} mode="outlined" />
                        <TextInput label="Email" value={email} onChangeText={setEmail} mode="outlined" />
                        <TextInput label="Thành phố/Tỉnh" value={city} onChangeText={setCity} mode="outlined" right={<TextInput.Icon icon="chevron-down" />} />
                        <TextInput label="Giới tính" value={gender} onChangeText={setGender} mode="outlined" right={<TextInput.Icon icon="chevron-down" />} />
                    </View>
                </Card>

            </ScrollView>
            <Button mode="contained" style={styles.button} onPress={() => { }}>
                Cập nhật
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    logout: {
        fontSize: 16,
        color: '#007AFF',
    },
    avatarContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    changeAvatar: {
        color: '#007AFF',
        marginTop: 10,
    },
    card: {
        height: 310,
        padding: 20,
        backgroundColor: '#fff',

    },
    button: {
        marginTop: 20,
        backgroundColor: '#d81b60',
        paddingVertical: 8,
        borderRadius: 5,
    },
});

export default ProfileScreen;
