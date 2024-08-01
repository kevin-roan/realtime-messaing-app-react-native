import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="calls"
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          headerTitle: "Calls",
          headerRight: () => (
            <TouchableOpacity>
              <Ionicons name="call-outline" size={22} color={Colors.primary} />
            </TouchableOpacity>
          ),
        }}
      ></Stack.Screen>
    </Stack>
  );
};
export default Layout;
