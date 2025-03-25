import { Card } from "react-native-paper";
import { ScrollView, View, StyleSheet, Text, Image } from "react-native";

import { useSelector } from "react-redux";

const CardImage = () => { 
    
    const providers = useSelector((state) => state.images.providers);

    return (
        <View>
            
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} pagingEnabled>
                    {providers.map((provider) => (
                        <View key={provider.id} style={{ alignItems: 'center' }}>
                            <Card.Cover source={{ uri: provider.imageReal }} style={{ width: 170, marginRight: 10 }} />
                        </View>
                    ))}
                </ScrollView>
           
        </View>
    );
};


export default CardImage;



{/* <CardImage 
    title="Nhà cung cấp sản phẩm công nghệ"
    providers={[
        { id: 1, image: "https://via.placeholder.com/300" },
        { id: 2, image: "https://via.placeholder.com/301" }
    ]}
/> */}
