import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useCachedResources, useColorScheme } from "./hooks";

import Navigation from "./navigation";

const App = async () => {
  const isLoadingComplete = useCachedResources();

  // const getStorage = async () => {
  //   try {
  //     const value = await ;
  //     if (value !== null) {
  //       // value previously stored
  //     }
  //   } catch (e) {
  //     // error reading value
  //   }
  // };

  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
};

export default App;
