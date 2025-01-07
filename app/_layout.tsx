import TimerProvider from "@/context/TimerContext";
import { Slot, Stack } from "expo-router";

export default function RootLayout(){
    return (
    <TimerProvider>
    <Stack>
        <Stack.Screen name="(tabs)"
        options={{headerShown:false}}
        />
        <Stack.Screen name="index"
        options={{headerShown:false}}
        />
        <Stack.Screen name="meditate/[id]"
        options={{headerShown:false}}
        />
        <Stack.Screen name="(modal)/adjust-meditaion-duration"
        options={{headerShown:false, presentation : 'modal'}} 
        />
    </Stack>
    </TimerProvider>  
    )
}