import React from "react";
import { View, Image, ScrollView } from "react-native";
import { Appbar, Card, Button, Text, Avatar } from "react-native-paper";

const DonHang = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#F5F5F5" }}>
      {/* Appbar */}
      <Appbar.Header style={{ backgroundColor: "white", elevation: 0 }}>
        <Appbar.Content
          title="Đơn hàng"
          titleStyle={{ fontSize: 24, fontWeight: "bold", color: "#2C2C2C" }}
        />
        <Appbar.Action icon="heart-outline" />
        <Appbar.Action icon="chat-processing-outline" />
        <Appbar.Action icon="cog-outline" />
      </Appbar.Header>



    


      <ScrollView>
        {/* Card hướng dẫn */}
        <Card style={{ margin: 16 }}>
          <Card.Content>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Avatar.Text size={40} label="1" style={{ backgroundColor: "#D81B60" }} />
              <Text style={{ fontSize: 16, marginLeft: 10, fontWeight: "bold" }}>
                Selly là gì?
              </Text>
            </View>
            <Image
              source={{ uri: "https://your-image-url.com" }} // Thay bằng ảnh thực tế
              style={{ width: "100%", height: 150, marginTop: 10, borderRadius: 8 }}
            />
          </Card.Content>
        </Card>

        {/* Thông báo chưa có đơn hàng */}
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Bạn chưa có đơn hàng nào
          </Text>
          <Text style={{ fontSize: 14, color: "#888", textAlign: "center", marginHorizontal: 20 }}>
            Cùng Selly khám phá hàng nghìn sản phẩm đã được sàng lọc và tạo đơn ngay thôi!
          </Text>
          <Button
            mode="contained"
            style={{ marginTop: 20, backgroundColor: "#D81B60", paddingHorizontal: 20 }}
          >
            Tạo đơn ngay
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default DonHang;
