import { memo } from "react";
import { Card } from "react-native-paper";
import { ScrollView, View } from "react-native";



const CardImage = memo(( { providers }) => { 


    return (
        <View>
            
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} pagingEnabled>
                    {providers.map((provider) => (
                        <View key={provider.id} style={{ alignItems: 'center' }}>
                            <Card.Cover source={{ uri: provider.avatar }} style={{ width: 170, marginRight: 10 }} />
                        </View>
                    ))}
                </ScrollView>
           
        </View>
    );
});


export default CardImage;



{/* <CardImage 
    title="Nhà cung cấp sản phẩm công nghệ"
    providers={[
        { id: 1, image: "https://via.placeholder.com/300" },
        { id: 2, image: "https://via.placeholder.com/301" }
    ]}
/> */}
