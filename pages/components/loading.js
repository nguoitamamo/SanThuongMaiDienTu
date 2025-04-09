// Loading.js
import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

const Loading = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size="large" color="#0000ff" />
    <Text>Đang tải...</Text>
  </View>
);

export default Loading;
