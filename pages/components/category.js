import { View, StyleSheet, ScrollView } from "react-native";
import { Chip } from "react-native-paper";




// const categories = [
//     { id: 1, name: "Điện thoại", icon: "cellphone" },
//     { id: 2, name: "Máy tính", icon: "desktop-mac" },
//     { id: 3, name: "Laptop", icon: "laptop" },
//     { id: 4, name: "Xe đạp", icon: "bike" },
//     { id: 5, name: "Mỹ phẩm", icon: "face-woman" },
//     { id: 6, name: "Thời trang", icon: "tshirt-crew" },
//     { id: 7, name: "Đồng hồ", icon: "watch" },
//     { id: 8, name: "Nội thất", icon: "sofa" },
// ];




const CategoryChip = ({ categories }) => {
    console.log("card chip");
    console.log(categories);
    return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.chip}>

                {Array.isArray(categories) && categories.length > 0 && (
                    categories.map((category) => (
                        <Chip
                            key={category.CategoryID}
                            style={{ width: 100 }}
                        >
                            {category.CategoryName}
                        </Chip>
                    ))
                )}


            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    chip: {
        flexDirection: "row",
        gap: 10,
        marginTop: 10,
        marginBottom: 10,

    }
});

export default CategoryChip;