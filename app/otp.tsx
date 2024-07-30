import {
  View,
  Text,
  Linking,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
  StatusBar,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MaskInput from "react-native-mask-input";

const Otp = () => {
  const [isloading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const router = useRouter();
  const keyboardVerticalOffset = Platform.OS === "ios" ? 90 : 0;
  const { bottom } = useSafeAreaInsets();

  const openLink = () => {
    Linking.openURL("https://kevinroan.vercel.app");
  };
  const sendOTP = async () => {
    Keyboard.dismiss();
    setLoading(true);
    setTimeout(() => {
      setLoading(true);
      router.push("otp");
    }, 3000);
  };
  const trySignIn = async () => {};
  console.log("StyleSheet adbsolutefill object", StyleSheet.absoluteFillObject);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <StatusBar />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {isloading && (
            <View style={[StyleSheet.absoluteFill, styles.loading]}>
              <ActivityIndicator size={"large"} color={Colors.primary} />
              <Text style={styles.activityStatusText}>Sending code...</Text>
            </View>
          )}
          <Text style={styles.description}>
            Whatsapp will need to verify your account. Carrier charges may
            apply.
          </Text>
          <View style={styles.list}>
            <View style={styles.listItem}>
              <Text style={styles.listItemText}>India</Text>
              <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
            </View>
            <View style={styles.seperator}></View>
            <MaskInput
              style={styles.input}
              value={phoneNumber}
              keyboardType="numeric"
              placeholder="+91 987 654 3210"
              autoFocus
              onChangeText={(masked, unmasked) => {
                setPhoneNumber(masked); // you can use the unmasked value as well

                // assuming you typed "9" all the way:
                console.log(masked); // (99) 99999-9999
                console.log(unmasked); // 99999999999
              }}
              mask={[
                "(",
                /\d/,
                /\d/,
                ")",
                " ",
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                "-",
                /\d/,
                /\d/,
                /\d/,
                /\d/,
              ]}
            />
          </View>
          <Text style={styles.legal}>
            You must be{" "}
            <Text style={styles.link} onPress={openLink}>
              at least 16 years old
            </Text>{" "}
            to register. Learn how Whatsapp work with the{" "}
            <Text style={styles.link} onPress={openLink}>
              Meta Companies
            </Text>
            .
          </Text>
          <View style={{ flex: 1 }}></View>
          <TouchableOpacity
            disabled={phoneNumber === ""}
            onPress={sendOTP}
            style={[
              styles.button,
              { marginBottom: bottom + 10 },
              phoneNumber !== "" ? styles.enabled : null,
            ]}
          >
            <Text
              style={[
                styles.buttonText,
                phoneNumber !== "" ? styles.enabled : null,
              ]}
            >
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
    gap: 20,
    alignItems: "center",
  },
  description: {
    fontSize: 14,
    color: Colors.gray,
  },
  list: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 10,
    padding: 10,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 6,
    marginBottom: 10,
  },
  listItemText: {
    fontSize: 16,
    color: Colors.primary,
  },
  seperator: {
    width: "100%",
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.gray,
    opacity: 0.5,
  },
  link: {
    color: Colors.primary,
  },
  legal: {
    fontSize: 12,
    textAlign: "center",
    color: "#000",
  },
  button: {
    backgroundColor: Colors.lightGray,
    width: "100%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  enabled: {
    backgroundColor: Colors.primary,
    color: "white",
  },
  buttonText: {
    color: Colors.gray,
    fontSize: 22,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#fff",
    width: "100%",
    fontSize: 16,
    padding: 6,
    marginTop: 10,
  },
  loading: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  activityStatusText: {
    padding: 10,
    fontSize: 15,
  },
});

export default Otp;
