import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";

const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <View className="flex-row gap-1">
      {[1, 2, 3, 4, 5].map((item) => {
        if (rating >= item) {
          return (
            <Ionicons
              key={item}
              name="star"
              size={18}
              color = "orange"
            />
          );
        }

        if(item - rating === 0.5){
             return <Ionicons key={item} 
             name="star-outline" 
             size={18} color="orange" />
        }

        return(
            <Ionicons
             key ={item}
             name ="star-half"
             size={18}
   color = "orange" />
        )
      
      })}
    </View>
  );
};

export default RatingStars;