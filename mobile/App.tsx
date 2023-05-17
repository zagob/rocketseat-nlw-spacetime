import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View } from "react-native";

import { BaiJamjuree_700Bold } from "@expo-google-fonts/bai-jamjuree";
import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";

export default function App() {
  const [isLoadedFont] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  });

  if (!isLoadedFont) {
    return null;
  }

  return (
    <View className="flex-1 items-center justify-center bg-gray-900">
      <Text className="text-5xl font-bold text-gray-50">Hello</Text>
      <StatusBar style="light" translucent />
    </View>
  );
}
