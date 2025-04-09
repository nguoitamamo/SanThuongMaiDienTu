import React, { useEffect, useState } from "react";
import { View, Image, ScrollView, StyleSheet } from "react-native";
import { Appbar, Card, Button, Text, Avatar } from "react-native-paper";
import CategoryChip from "./components/category";
import { useSelector } from "react-redux";
import { HeaderSanPham } from "./components/headerChiTietSanPham";
import { useNavigation } from "@react-navigation/native";
import API, { endpoints } from "../Networking/API";




const DonHang = () => {


  const items = useSelector((state) => state.user.stateorder);
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const [Dsdonhang, setDsdonhang] = useState([]);

  const navigation = useNavigation();



  const NagigateGioHang = () => {
    return navigation.navigate("GioHang");
  }



  const LoadDonHang = async (filter) => {

    try {
      let str = ""
      if (filter) {
        str = "?filter=" + filter
      }
      console.log(token);


      let res = await API.get(endpoints.users + user.id + "/donhang/" + str,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setDsdonhang(res.data);

    }
    catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    LoadDonHang();
  }, [user])

  return (
    <View style={{ flex: 1, backgroundColor: "#F5F5F5" }}>

      <HeaderSanPham NavigateGioHang={NagigateGioHang} title="Đơn hàng" />


      <ScrollView style={{ paddingHorizontal: 16 }}>



        {user ? (
          <View>
            <CategoryChip
              categories={items}
              onPress={(category) => LoadDonHang(category.CategoryID)}
            />
            {Array.isArray(Dsdonhang) && Dsdonhang.length > 0 ? (
              Dsdonhang.map((item) => (
                <View key={item.OrderID} style={{ marginBottom: 20 }}>
                  <Text style={{ fontWeight: 'bold' }}>{item.StateOrder}</Text>

                  {Array.isArray(item.order_details) && item.order_details.length > 0 ? (
                    item.order_details.map((product, productIndex) => (
                      <Card key={productIndex} style={{ marginTop: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Image
                            source={{ uri: product.product.images[0] || 'https://via.placeholder.com/100' }}
                            style={{ width: 80, height: 80, backgroundColor: 'red', borderRadius: 10 }}
                          />
                          <View style={{ marginLeft: 10, flex: 1 }}>
                            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{product.product.ProductName}</Text>
                            <Text style={{ fontSize: 12, color: 'red', fontWeight: 'bold' }}>
                              Giá: {product.product.UnitPrice}
                            </Text>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                              <Text style={{ fontSize: 12 }}>Số lượng: {product.Quantity}</Text>
                              <Text style={{ fontSize: 12 }}>Ngày đặt: {item.created_date}</Text>

                              {product.Discount !== 0.0 && (
                                <Text style={{ fontSize: 12 }}>Giảm giá: {product.Discount} %</Text>
                              )}
                            </View>
                          </View>
                        </View>
                      </Card>
                    ))
                  ) : (
                    <Text>không có sản phẩm trong danh mục này</Text>
                  )}

                </View>
              ))
            ) : (
              <Text>không có sản phẩm trong danh mục này </Text>
            )
            }
          </View>

        ) : (
          <View>
            <Text>Bạn cần đăng nhập</Text>
            <Button mode="contained" style={styles.button} onPress={() => { navigation.navigate("SignIn"); }}>
              Đăng nhập
            </Button>
          </View>
        )}

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  button: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#d81b60',
    paddingVertical: 8,
    borderRadius: 5,
  }

});


export default DonHang;
