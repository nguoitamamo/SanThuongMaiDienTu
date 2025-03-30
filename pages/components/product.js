
import { View } from "react-native";
import { Card, ScrollView, Title, Paragraph } from "react-native-paper";


const ProductTopCard = ({ products }) => {
    console.log(products);


    return (
        <View>
            <Card style={{ padding: 10 }}>

                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} pagingEnabled>

                    {products.map((product) => (
                        <View key={product.ProductID} style={{ width: 170, marginRight: 10 }}>


                            <Card.Cover source={{ uri: product.images[0] }} style={{ width: 170, marginRight: 10 }} />
                            <Card.Content>
                                <Title
                                    style={{ fontSize: 12 }}
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                >{product.ProductName} - {product.Description}</Title>
                                <Paragraph style={{ fontWeight: 'bold', color: 'red', fontSize: 12 }}>Giá từ: {product.UnitPrice}</Paragraph>
                            </Card.Content>

                        </View>
                    ))}
                </ScrollView>
            </Card>
        </View>
    );


}

export default ProductTopCard;