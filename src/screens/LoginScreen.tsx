import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Headline, Title, Text, TextInput } from "react-native-paper";
import * as LocalAuthentication from "expo-local-authentication";
import { DeviceContext, UserContext } from "../Context/AuthContext";

function LoginScreen() {
  const { biometrics } = React.useContext(DeviceContext);
  const { setUser } = React.useContext(UserContext);
  const [useBiometricLogin, setUseBiometricLogin] = React.useState(biometrics);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  React.useEffect(() => {
    console.log(useBiometricLogin);
    if (useBiometricLogin) {
      handleBiometricLogin();
    }

    async function handleBiometricLogin() {
      const result: LocalAuthentication.LocalAuthenticationResult =
        await LocalAuthentication.authenticateAsync({
          promptMessage: "Login to My Test App",
        });

      if (result.success === true) {
        setUser({ username: "test", password: "test" });
      } else if (result.error === "user_cancel") {
        setUseBiometricLogin(false);
      }
    }
  }, [biometrics, useBiometricLogin, setUseBiometricLogin]);

  function handleInputLogin() {
    setUser({ username, password });
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 22, fontWeight: "700" }}>Login to App</Text>
      <View style={{ marginTop: 40, width: "70%" }}>
        <TextInput
          value={username}
          onChangeText={(text) => setUsername(text)}
          placeholder="username"
          style={{
            backgroundColor: "#e2e2e2",
            padding: 10,
            borderRadius: 3,
            fontSize: 16,
            height: 44,
          }}
        />
        <View style={{ marginTop: 20, position: "relative", height: 44 }}>
          <TextInput
            placeholder="password"
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            style={{
              backgroundColor: "#e2e2e2",
              padding: 10,
              borderRadius: 3,
              fontSize: 16,
              height: 44,
            }}
          />
          {biometrics && (
            <TouchableOpacity
              onPress={() => setUseBiometricLogin(true)}
              style={{ position: "absolute", top: 7, right: 10 }}
            >
              <Image
                source={require("../../assets/touch-id.png")}
                style={{
                  height: 130,
                  width: 130,
                  zIndex: 100,
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <TouchableOpacity
        onPress={() => handleInputLogin()}
        style={{
          padding: 15,
          width: "70%",
          backgroundColor: "#009688",
          borderRadius: 3,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 40,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "500" }}>
          Log in
        </Text>
      </TouchableOpacity>
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
