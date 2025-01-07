import { View, Text, Pressable } from "react-native";
import React, { useContext } from "react";
import "@/globals.css";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import { TimerContext } from "@/context/TimerContext";

const AdjustMeditationDuration = () => {
  const { setDuration } = useContext(TimerContext);

  const handlePress = (duration: number) => {
    setDuration(duration); 
    router.back(); 
  };

  return (
    <View className="flex-1">
      <LinearGradient
        className="flex-1"
        colors={["#161b2e", "#0a4d4a", "#766e67"]}
      >
        <Pressable onPress={() => router.back()} className="absolute top-16">
          <MaterialIcons
            className="bg-green-600 rounded-full p-2 ml-7"
            name="keyboard-backspace"
            size={32}
            color="white"
          />
        </Pressable>
        <View className="justify-center h-4/5 my-auto">
          <Text className="text-center text-white text-4xl mb-8 font-semibold">
            Adjust your meditation duration
          </Text>
          <View className="mx-8">
            <CustomButton
              title="10 seconds"
              onPress={() => handlePress(10)}
              containerStyles="mb-5"
            />
            <CustomButton
              title="5 minutes"
              onPress={() => handlePress(5 * 60)}
              containerStyles="mb-5"
            />
            <CustomButton
              title="10 minutes"
              onPress={() => handlePress(10 * 60)}
              containerStyles="mb-5"
            />
            <CustomButton
              title="15 minutes"
              onPress={() => handlePress(15 * 60)}
              containerStyles="mb-5"
            />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default AdjustMeditationDuration;
