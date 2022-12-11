import { createContext, useContext, useEffect, useState } from "react";
import { ColorSchemeName, useColorScheme } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  theme: "light" as NonNullable<ColorSchemeName> | undefined,
  switchTheme: (theme: "light" | "dark") => {
    theme;
  },
};

const GlobalContext = createContext(initialState);

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export const GlobalProvider = ({ children }: any) => {
  const [theme, setTheme] = useState<NonNullable<ColorSchemeName>>();

  useEffect(() => {
    const getData = async () => {
      try {
        const theme = (await AsyncStorage.getItem(
          "theme"
        )) as NonNullable<ColorSchemeName>;

        setTheme(theme ?? useColorScheme());
      } catch (err) {
        console.warn(err);
      }
    };
    getData();
  }, []);

  const switchTheme = async () => {
    await AsyncStorage.setItem("theme", theme === "light" ? "dark" : "light");

    setTheme(theme === "light" ? "dark" : "light");
  };

  const value = {
    theme,
    switchTheme,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
