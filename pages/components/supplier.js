import { View, StyleSheet } from "react-native";
import { Card, Text, Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import { useSelector } from "react-redux";

const InfoBase = ({ user }) => {


    return (

        <View style={[styles.supplier, styles.base]}>
            <Card >
                <Card.Content>
                    {user && (
                        <View style={styles.row}>

                            <Avatar.Image size={60} source={{ uri: user.avatar }} />
                            <Text style={styles.text}>{user.last_name ? `${user.last_name} ${user.first_name}` : user.CompanyName} </Text>

                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                {user.role == "Customer" || user.role == "Employee" ? (
                                    <Text sytle={{ fontSize: 15 }}>( {user.username} )</Text>

                                ) : (
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <Text> ( {user?.TotalRating?.toFixed(1)} / 5 ) /
                                            <Text style = {{fontSize: 10, marginTop: 10}}>{user.TotalComment}</Text>
                                        </Text>
                                        <Icon name="star" size={20} color="gold" />
                                    </View>
                                )}


                            </View>


                        </View>
                    )}
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
        marginTop: 10

    },
    base: {
        // marginLeft: 10,
        // marginRight: 10,
        // marginBottom: 10,
    }
});
export default InfoBase;