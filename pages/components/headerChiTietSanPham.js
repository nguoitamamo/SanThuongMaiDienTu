

import { Appbar } from "react-native-paper";



export const HeaderSanPham = ( { onPress}) => {



    return (
        <Appbar.Header>
            <Appbar.Content title="HNT" titleStyle={{ fontSize: 28, fontWeight: "bold", color: "#e91e63" }} />
            <Appbar.Action icon="bell-outline" onPress={() => { }} />
            <Appbar.Action icon="message-outline" onPress={() => { }} />
            <Appbar.Action icon="cart-outline" onPress={() => onPress()} />
        </Appbar.Header>

    );
};

