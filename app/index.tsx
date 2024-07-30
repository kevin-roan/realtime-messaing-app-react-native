import React from "react";
import {
  View,
  Text,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import welcomeImage from "@/assets/images/welcome.png";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";

const welcome_image = Image.resolveAssetSource(welcomeImage).uri;

function Page() {
  const openLink = () => {
    Linking.openURL("https://kevinroan.vercel.app");
  };
  return (
    <View style={styles.container}>
      <Image source={{ uri: welcome_image }} style={styles.welcomeImage} />
      <Text style={styles.headline}>Welcome to Whatsapp</Text>
      <Text style={styles.description}>
        Read Our{" "}
        <Text style={styles.link} onPress={openLink}>
          Privacy Policy
        </Text>
        .{'Tap "Agree & Continue" to accept the'}
        <Text style={styles.link}> Terms and Serivce</Text>
      </Text>
      <Link href="/otp" asChild replace>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Agree & Continue</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  welcomeImage: {
    width: "80%",
    height: "30%",
    marginBottom: 80,
  },
  headline: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 80,
    color: Colors.gray,
  },
  link: {
    color: Colors.primary,
  },
  button: {
    width: "100%",
    alignItems: "center",
    backgroundColor: Platform.OS === "ios" ? "#fff" : Colors.primary,
    padding: 14,
    borderRadius: 12,
  },
  buttonText: {
    fontSize: 22,
    color: Platform.OS === "ios" ? Colors.primary : "#fff",
    fontWeight: "bold",
  },
});

export default Page;
