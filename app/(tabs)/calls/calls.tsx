import { View, Text, TouchableOpacity } from "react-native";
import { Stack } from "expo-router";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

const Calls = () => {
  const onEdit = () => {};
  return (
    <View>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity
              style={{
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
              }}
            >
              <Ionicons
                name="pencil-outline"
                onPress={() => onEdit()}
                size={22}
                color={Colors.primary}
              />
              <Text
                style={{
                  color: Colors.primary,
                  fontSize: 20,
                }}
              >
                Edit
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
    </View>
  );
};

export default Calls;
