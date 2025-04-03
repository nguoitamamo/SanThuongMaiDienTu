import { View, StyleSheet } from "react-native";
import { Card, Text, Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";

const InfoSupplier = ( {info}) => {

    return (

        <View style={[styles.supplier ,styles.base ]}>
            <Card >
                <Card.Content>
                    <View style={styles.row}>
                        <Avatar.Image size={60} source={{ uri: info?.user?.avatar }} />
                        <Text style={styles.text}>{info?.CompanyName}
                        </Text>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text>{info?.TotalRating?.toFixed(1)} / 5 </Text>
                            <Icon name="star" size={20} color="gold" />
                        </View>
                    </View>
                </Card.Content>
            </Card>
        </View>
    );
}


const styles = StyleSheet.create({
    row: { flexDirection: 'row', alignItems: 'center', justifyContent: "space-around" },
    text: { marginLeft: 10, fontWeight: 'bold', fontSize: 22 },
    supplier: {
        height: 100,

    },
    base: {
        marginLeft: 10,
        marginRight: 10,
        // marginBottom: 10,
    }
});
export default InfoSupplier;