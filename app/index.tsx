import React, { useEffect } from 'react';
import { StatusBar, Text, View, ImageBackground, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as SplashScreen from 'expo-splash-screen';
import { useRouter } from 'expo-router';
import beachImage from '@/assets/meditation-images/beach.webp';
import CustomButton from '@/components/CustomButton';
import '../globals.css';

const App = () => {
  const router = useRouter();

  useEffect(() => {
    const prepareApp = async () => {
  
      await SplashScreen.preventAutoHideAsync();

      
      setTimeout(async () => {
      
        await SplashScreen.hideAsync();
      }, 2000); 
    };

    prepareApp();
  }, []);

  return (
    <>
      <StatusBar hidden={true} />
      <View className="flex-1">
        <ImageBackground source={beachImage} resizeMode="cover" className="flex-1">
          <LinearGradient className="flex-1 absolute inset-0" colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.8)']} />
          <SafeAreaView className="flex-1 mx-5">
            <View>
              <Text className="text-white text-4xl font-bold text-center mt-20">MediCalm</Text>
              <Text className="text-white text-2xl text-center mt-3">Simplifying Meditation for everyone</Text>
            </View>
            <View className="mt-[620px]">
              <CustomButton onPress={() => router.push('/(tabs)/nature-meditate')} title="Get Started" />
            </View>
          </SafeAreaView>
        </ImageBackground>
      </View>
    </>
  );
};

export default App;
