import { memo } from "react";
import { Card, Title, Paragraph } from "react-native-paper";
import { TouchableOpacity } from "react-native";


const OneProduct = memo(({ product, NavigateChiTietSanPham }) => {
   
    console.log("Oneproduc: " + product);

    return (
        <TouchableOpacity
            key={product?.ProductID}
            style={{ width: "48%"}}
            onPress={() => NavigateChiTietSanPham( product )}
        >

            <Card.Cover source={{ uri: product?.images[0] }} style={{ width: 160, height: 130 }} />
            <Card.Content>
                <Title
                    style={{ fontSize: 12 }}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >{product?.ProductName} - {product?.Description}</Title>
                <Paragraph style={{ fontWeight: 'bold', color: 'red', fontSize: 12 }}>Giá: {product?.UnitPrice}</Paragraph>
            </Card.Content>

        </TouchableOpacity>
    );


});

export default OneProduct;