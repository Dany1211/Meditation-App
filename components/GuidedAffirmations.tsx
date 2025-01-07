import { View, Text, FlatList, Pressable, Image } from "react-native";
import React from "react";
import { GalleryPreviewData } from "@/constants/models/AffirmationsCategory";
import "@/globals.css";
import { Link } from "expo-router";


interface GuidedAffirmationsProps {
  title: string;
  products: GalleryPreviewData[];
}

const GuidedAffirmations = ({ title, products }: GuidedAffirmationsProps) => {
  return (
    <View className="my-5">
      <View className="mb-2">
        <Text className="text-white font-bold text-xl">{title}</Text>
      </View>
      <View className="space-y-2">
        <FlatList
          data={products}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <Link 
                href={`/affirmations/$[id]`} asChild>
                <Pressable>
                    <View className="h-60 w-60 mr-4">
                        <Image
                            source={item.image}
                            resizeMode="cover"
                            className="w-full h-full"
                        />
                        <Text>ProductGallery</Text>
                    </View>
                </Pressable>
            </Link>
          )}
          horizontal
        />
      </View>
    </View>
  );
};

export default GuidedAffirmations;


