import { View, StyleSheet, ScrollView } from "react-native";
import { Chip } from "react-native-paper";



const CategoryChip = ({ categories , onPress = () => {}}) => {
    return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.chip}>

                {Array.isArray(categories) && categories.length > 0 && (
                    categories.map((category) => (
                        <Chip
                            key={category.CategoryID}
                            style = {{ flex: 1}}
                            onPress={() => onPress(category)}
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