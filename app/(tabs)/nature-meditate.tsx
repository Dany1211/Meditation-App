import {
  FlatList,
  ImageBackground,
  Pressable,
  StatusBar,
  Text,
  View,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import "@/globals.css";
import { MEDITATION_DATA } from "@/constants/meditationData";
import MEDITATION_IMAGES from "@/constants/meditation-images";
import { router } from "expo-router";

const NatureMeditate = () => {
  return (
    <LinearGradient
      colors={["#6a85b6", "#bac8e0", "#e8f3f8"]}
      className="flex-1"
    >
      <StatusBar hidden />

      <View className="mt-16 px-5 mb-7">
        <Text className="text-white text-4xl font-bold">Welcome Aum,</Text>
        <Text className="text-indigo-100 text-xl font-semibold mt-2">
          Start your meditation practice today
        </Text>
      </View>

      <FlatList
        data={MEDITATION_DATA}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`/meditate/${item.id}`)}
            className="h-56 mb-2 mx-5 mb-5  rounded-md overflow-hidden"
          >
            <ImageBackground
              source={MEDITATION_IMAGES[item.id - 1]}
              resizeMode="cover"
              className="flex-1 rounded-full justify-center"
            >
              <LinearGradient
                colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0.5)"]}
                className="absolute inset-0"
              />
              <Text className="text-white text-center text-2xl font-semibold px-4">
                {item.title}
              </Text>
            </ImageBackground>
          </Pressable>
        )}
      />
    </LinearGradient>
  );
};

export default NatureMeditate;
