import { createContext, useContext, useEffect, useState } from "react";
import { ColorSchemeName, useColorScheme } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  theme: "light" as NonNullable<ColorSchemeName>,
  switchTheme: (theme: "light" | "dark") => {
    theme;
  },
};

const GlobalContext = createContext(initialState);

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export const GlobalProvider = ({ children }: any) => {
  const [theme, setTheme] = useState(
    useColorScheme() as NonNullable<ColorSchemeName>
  );

  useEffect(() => {
    const setTheme = async () => {
      const theme = (await AsyncStorage.getItem(
        "theme"
      )) as NonNullable<ColorSchemeName>;

      switchTheme(theme ?? useColorScheme());
    };

    setTheme();
  });

  const switchTheme = async (theme: NonNullable<ColorSchemeName>) => {
    setTheme(theme);
    await AsyncStorage.setItem("theme", theme);
  };

  const value = {
    theme,
    switchTheme,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
