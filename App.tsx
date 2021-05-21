import React from "react";
import { StyleSheet, View } from "react-native";

import * as LocalAuthentication from "expo-local-authentication";
import * as SplashScreen from "expo-splash-screen";

import Router from "./src/navigation/Router";

import { UserContext, DeviceContext } from "./src/Context/AuthContext";

export default function App() {
  const [isAppReady, setIsAppReady] = React.useState(false);
  const [biometrics, setBiometrics] = React.useState(false);

  async function handleAppLoad() {
    // checks device to see if it has biometric hardware
    const compatible = await LocalAuthentication.hasHardwareAsync();
    if (compatible) {
      const records = await LocalAuthentication.isEnrolledAsync();

      if (records) {
        setBiometrics(true);
      }
    }

    // maybe get resources like fonts and w/e here

    setTimeout(async () => {
      setIsAppReady(true);
      await SplashScreen.hideAsync();
    }, 2000);
  }

  React.useEffect(() => {
    try {
      stopSplashScreen();
    } catch (e) {
      console.warn(e);
    }

    async function stopSplashScreen() {
      await SplashScreen.preventAutoHideAsync();
      await handleAppLoad();
    }
  }, []);

  if (!isAppReady) {
    return <View style={styles.container} />;
  }

  return (
    <DeviceContext.Provider value={{ biometrics }}>
      <AppAuth />
    </DeviceContext.Provider>
  );
}

function AppAuth() {
  const [user, setUser] = React.useState<User | null>();
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router />
    </UserContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
