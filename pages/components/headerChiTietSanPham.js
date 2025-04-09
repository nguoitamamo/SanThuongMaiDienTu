
import { memo } from "react";
import { Appbar , Badge } from "react-native-paper";
import { useSelector } from "react-redux";
import { View } from "react-native";


export const HeaderSanPham = memo(({ NavigateGioHang, title}) => {
    
    const cart = useSelector((state) => state.cart.products);

    const totalQuantity = cart?.reduce((sum, item) => sum + item.order_details[0].Quantity, 0);
  
    console.log("đây " + totalQuantity);
    return (
        <Appbar.Header>
            <Appbar.Content title={title} titleStyle={{ fontSize: 28, fontWeight: "bold", color: "#e91e63" }} />
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
});

