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
import { useState } from "react";
import calls from "@/assets/data/calls.json";
import { defaultStyles } from "@/constants/Styles";
import { format } from "date-fns";

const Calls = () => {
  const [isEditing, setEditing] = useState(false);
  const [items, setItems] = useState(calls);

  const onEdit = () => {
    setEditing(!isEditing);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
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
      <ScrollView contentInsetAdjustmentBehavior={"automatic"}>
        <View style={[defaultStyles.block, { padding: 2 }]}>
          <FlatList
            data={items}
            scrollEnabled={false}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => (
              <View style={defaultStyles.seperator}></View>
            )}
            renderItem={({ item }) => (
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
            )}
          />
        </View>
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
