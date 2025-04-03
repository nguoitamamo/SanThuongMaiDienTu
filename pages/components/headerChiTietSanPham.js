

import { Appbar , Badge } from "react-native-paper";
import { useSelector } from "react-redux";
import { View } from "react-native";


export const HeaderSanPham = ({ NavigateGioHang}) => {

    const products = useSelector(state => state.cart.products);
    const totalQuantity = products.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <Appbar.Header>
            <Appbar.Content title="HNT" titleStyle={{ fontSize: 28, fontWeight: "bold", color: "#e91e63" }} />
            <Appbar.Action icon="bell-outline" onPress={() => { }} />
            <Appbar.Action icon="message-outline" onPress={() => { }} />
            <View style={{ position: "relative" }}>
                <Appbar.Action icon="cart-outline" onPress={NavigateGioHang} />

                {totalQuantity > 0 && (
                    <Badge
                        style={{
                            position: "absolute",
                            top: 0,
                            right: 5,
                            backgroundColor: "red",
                            color: "white"
                        }}
                        size={18}
                    >
                        {totalQuantity}
                    </Badge>
                )}
            </View>
        </Appbar.Header>

    );
};

