import { View, Text, ImageBackground, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import "@/globals.css";
import meditationImages from "@/constants/meditation-images";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CustomButton from "@/components/CustomButton";
import { Audio } from "expo-av";
import { MEDITATION_DATA, AUDIO_FILES } from "@/constants/meditationData";
import { TimerContext } from "@/context/TimerContext";

const Meditate = () => {
  const { id } = useLocalSearchParams();
  const { duration: secondsRemaining, setDuration } = useContext(TimerContext);

  const [isMeditating, setMeditating] = useState(false);
  const [audioSound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlayingAudio, setPlayingAudio] = useState(false);

  useEffect(() => {
    if (secondsRemaining === 0) {
      setMeditating(false);
      setPlayingAudio(false);
      stopAudio();
      return;
    }

    let timerId: NodeJS.Timeout | undefined;

    if (isMeditating) {
      timerId = setTimeout(() => {
        setDuration((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }

    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [isMeditating, secondsRemaining]);

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  const initializeSound = async () => {
    const audioFileName = MEDITATION_DATA[Number(id) - 1].audio;

    try {
      const { sound } = await Audio.Sound.createAsync(
        AUDIO_FILES[audioFileName]
      );
      setSound(sound);
      return sound;
    } catch (error) {
      console.error("Error loading sound:", error);
      return null;
    }
  };

  const togglePlayPause = async () => {
    if (!audioSound) {
      const sound = await initializeSound();
      if (!sound) return;
      setSound(sound);
    }

    const sound = audioSound || (await initializeSound());
    if (!sound) return;

    const status = await sound.getStatusAsync();

    if (status.isLoaded && !isPlayingAudio) {
      await sound.playAsync();
      setPlayingAudio(true);
    } else if (status.isLoaded && isPlayingAudio) {
      await sound.pauseAsync();
      setPlayingAudio(false);
    }
  };

  const stopAudio = async () => {
    if (audioSound) {
      await audioSound.stopAsync();
      await audioSound.unloadAsync();
      setSound(null);
    }
  };

  const toggleMeditationSessionStatus = async () => {
    if (secondsRemaining === 0) {
      setDuration(10);
    }

    setMeditating(!isMeditating);

    if (!isMeditating) {
      await togglePlayPause();
    } else {
      await stopAudio();
    }
  };

  const handleAdjustDuration = () => {
    if (isMeditating) toggleMeditationSessionStatus();
    router.push("/(modal)/adjust-meditaion-duration");
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  const handleBackButtonPress = () => {
    stopAudio();
    setDuration(10);  // Reset timer to 10 seconds
    router.back();
  };

  return (
    <View className="flex-1">
      <ImageBackground
        source={meditationImages[Number(id) - 1]}
        resizeMode="cover"
        className="flex-1"
      >
        <LinearGradient
          className="flex-1 absolute inset-0"
          colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.8)"]}
        />
        <Pressable onPress={handleBackButtonPress} className="absolute top-16">
          <MaterialIcons
            className="bg-green-600 rounded-full p-2 ml-7"
            name="keyboard-backspace"
            size={32}
            color="white"
          />
        </Pressable>
        <View className="flex-1 justify-center">
          <View className="mx-auto bg-neutral-200 rounded-full w-44 h-44 justify-center items-center">
            <Text className="text-5xl text-blue-500 font-semibold">
              {formatTime(secondsRemaining)}
            </Text>
          </View>
        </View>
        <View className="mb-10 px-10">
          <CustomButton
            title={isMeditating ? "Stop Meditation" : "Start Meditation"}
            onPress={toggleMeditationSessionStatus}
          />
          <CustomButton
            title={"Adjust duration"}
            onPress={handleAdjustDuration}
            containerStyles="mt-4"
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default Meditate;
