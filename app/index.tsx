import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import welcomeImage from "@/assets/images/welcome.png";

const welcome_image = Image.resolveAssetSource(welcomeImage).uri;

function Page() {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: welcome_image }}
        style={{ width: 200, height: 200 }}
      />
      <Text>index</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default Page;
