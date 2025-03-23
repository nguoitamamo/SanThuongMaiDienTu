import React from 'react';
import { ScrollView, View, Image, Dimensions } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

const { width } = Dimensions.get('window');

const providers = [
  {
    id: 1,
    title: 'XÁC THỰC',
    image: 'https://via.placeholder.com/300',
    description: 'Nhóm nhà cung cấp xác thực.',
  },
  {
    id: 2,
    title: 'BÁN CHẠY',
    image: 'https://via.placeholder.com/300',
    description: 'Nhóm nhà cung cấp bán chạy.',
  },
  {
    id: 3,
    title: 'NẠP ĐẾN 80K',
    image: 'https://via.placeholder.com/300',
    description: 'Ưu đãi nạp tiền lên đến 80K.',
  },
];

const FeaturedProviders = () => {
  return (
    <View style={{ padding: 10 }}>
      <Title style={{ fontSize: 18, fontWeight: 'bold' }}>NHÀ CUNG CẤP NỔI BẬT</Title>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} pagingEnabled>
        {providers.map((provider) => (
          <View key={provider.id} style={{ width, alignItems: 'center' }}>
            <Card style={{ width: width * 0.8, marginHorizontal: 10 }}>
              <Card.Cover source={{ uri: provider.image }} />
              <Card.Content>
                <Title>{provider.title}</Title>
                <Paragraph>{provider.description}</Paragraph>
              </Card.Content>
            </Card>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedProviders;
