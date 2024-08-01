import {
  View,
  Text,
  Linking,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
  StatusBar,
} from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MaskInput from "react-native-mask-input";
import {
  isClerkAPIResponseError,
  useSignIn,
  useSignUp,
} from "@clerk/clerk-expo";

const Otp = () => {
  const [isloading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const router = useRouter();
  const { bottom } = useSafeAreaInsets();
  const { signUp, setActive } = useSignUp();
  const { signIn } = useSignIn();

  const openLink = () => {
    Linking.openURL("https://kevinroan.vercel.app");
  };
  const sendOTP = async () => {
    Keyboard.dismiss();
    setLoading(true);
    // setTimeout(() => {
    //   setLoading(true);
    //   router.push(`/verify/${phoneNumber}`);
    // }, 200);

    try {
      await signUp?.create({
        phoneNumber,
      });
      await signUp?.preparePhoneNumberVerification();

      router.push(`/verify/${phoneNumber}`);
    } catch (error) {
      console.log(error.errors);
      if (isClerkAPIResponseError(error)) {
        if (error.errors[0].code === "form_identifier_exists") {
          console.log("user exists");
          router.replace("(tabs)/settings");
          // bellow function doesnot work  for now #TODO
          await trySignIn();
        } else if (error.errors[0].code === "form_param_format_invalid") {
          console.log("Invalid phone number", error.errors[0].message);
          setLoading(false);
          Alert.alert(
            "Enter a valid phone number with International Format",
            error.errors[0].longMessage,
          );
        } else {
          setLoading(false);
          Alert.alert("Error unknown", error.errors[0].message);
        }
      }
    }
  };
  const trySignIn = async () => {
    // this does not work TODO
    const { supportedFirstFactors } = await signIn!.create({
      identifier: phoneNumber,
    });

    const firstPhoneFactor: any = supportedFirstFactors.factor(
      (factor: any) => {
        return factor.strategy === "phone_code";
      },
    );

    const { phoneNumberId } = firstPhoneFactor;

    await signIn!.prepareFirstFactor({
      strategy: "phone_code",
      phoneNumberId,
    });

    router.push(`/verify/${phoneNumber}?signin=true`);
    setLoading(false);
  };

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
                let withInternatinalCode = `+${unmasked}`;
                setPhoneNumber(withInternatinalCode); // you can use the unmasked value as well
              }}
              mask={[
                "(",
                "+",
                /\d/,
                /\d/,
                ")",
                " ",
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                /\d/,
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
