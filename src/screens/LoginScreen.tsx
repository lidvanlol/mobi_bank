import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Headline, Title, Text, TextInput } from "react-native-paper";
import * as LocalAuthentication from "expo-local-authentication";
import { DeviceContext, UserContext } from "../Context/AuthContext";

function LoginScreen() {
  const { biometrics } = React.useContext(DeviceContext);
  const { setUser } = React.useContext(UserContext);
  const [useBiometricLogin, setUseBiometricLogin] = React.useState(biometrics);

  React.useEffect(() => {
    console.log(useBiometricLogin);
    if (useBiometricLogin) {
      handleBiometricLogin();
    }

    async function handleBiometricLogin() {
      const result: LocalAuthentication.LocalAuthenticationResult =
        await LocalAuthentication.authenticateAsync({
          promptMessage: "Logujte se Otiskom Prsta",
        });

      if (result.success === true) {
        setUser({ username: "test", password: "test" });
      } else if (result.error === "user_cancel") {
        setUseBiometricLogin(false);
      }
    }
  }, [biometrics, useBiometricLogin, setUseBiometricLogin]);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 22, fontWeight: "700" }}>
        Logujte se otiskom prsta
      </Text>
      <View style={{ marginTop: 40, width: "70%" }}>
        <View style={{ marginTop: 20, position: "relative", height: 24 }}>
          {biometrics && (
            <TouchableOpacity
              onPress={() => setUseBiometricLogin(true)}
              style={{ top: 10, right: 10 }}
            >
              <Image
                source={require("../../assets/touch-id.png")}
                style={{
                  height: 130,
                  width: 130,
                  position: "relative",
                  alignSelf: "center",
                }}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
