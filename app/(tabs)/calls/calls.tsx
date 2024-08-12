import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
} from "react-native";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useState, useEffect } from "react";
import calls from "@/assets/data/calls.json";
import { defaultStyles } from "@/constants/Styles";
import { format } from "date-fns";
import { SegmentedControl } from "@/components/SegmentedControl";
import Animated, {
  CurvedTransition,
  FadeInUp,
  FadeOutUp,
} from "react-native-reanimated";

const transition = CurvedTransition.delay(100);

const Calls = () => {
  const [isEditing, setEditing] = useState(false);
  const [items, setItems] = useState(calls);
  const [selectedOption, setSelectedOption] = useState("All");

  const onEdit = () => {
    setEditing(!isEditing);
  };
  useEffect(() => {
    if (selectedOption === "All") {
      setItems(calls);
    } else {
      setItems(calls.filter((item) => item.missed));
    }
  }, [selectedOption]);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <SegmentedControl
              options={["All", "Missed"]}
              selectedOption={selectedOption}
              onOptionPress={setSelectedOption}
            />
          ),
          headerLeft: () => (
            <TouchableOpacity
              style={{
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
              }}
              onPress={onEdit}
            >
              <Ionicons
                name={isEditing ? "pencil-outline" : "checkmark-done"}
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
                {isEditing ? "Edit" : "Done"}
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView
        contentInsetAdjustmentBehavior={"automatic"}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <Animated.View
          style={[defaultStyles.block, { padding: 2 }]}
          layout={transition}
        >
          <Animated.FlatList
            data={items}
            scrollEnabled={false}
            itemLayoutAnimation={transition}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => (
              <View style={defaultStyles.seperator}></View>
            )}
            renderItem={({ item, index }) => {
              return (
                <Animated.View
                  entering={FadeInUp.delay(index * 20)}
                  exiting={FadeOutUp}
                >
                  <View style={defaultStyles.item}>
                    <Image source={{ uri: item.img }} style={styles.avatar} />
                    <View style={styles.userInfo}>
                      <Text
                        style={{
                          fontSize: 18,
                          color: item.missed ? "red" : "#000",
                          fontWeight: "500",
                        }}
                      >
                        {item.name}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <Ionicons
                          name={item.video ? "videocam" : "call"}
                          size={16}
                          color={Colors.gray}
                        />
                        <Text style={{ color: Colors.gray }}>
                          {item.incoming ? "Incoming" : "Missed"}
                        </Text>
                      </View>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <View style={styles.dateInfo}>
                      <Text>{format(item.date, "MM.dd.yy")}</Text>
                      <Ionicons
                        name="information-circle-outline"
                        color={Colors.primary}
                        size={18}
                      />
                    </View>
                  </View>
                </Animated.View>
              );
            }}
          />
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  dateInfo: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
});

export default Calls;
