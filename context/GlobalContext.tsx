import { createContext, useContext, useEffect, useState } from "react";
import { ColorSchemeName, useColorScheme } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  theme: "light" as NonNullable<ColorSchemeName>,
  switchTheme: (theme: "light" | "dark") => {
    theme;
  },
  setFavorite: (id: number) => {},
  isFavorite: (id: number) => {
    return true || false;
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
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const setSavedTheme = async () => {
      const theme = (await AsyncStorage.getItem(
        "theme"
      )) as NonNullable<ColorSchemeName>;

      switchTheme(theme ?? useColorScheme());
    };

    const setSavedFavorites = async () => {
      setFavorites(
        JSON.parse((await AsyncStorage.getItem("favorites")) ?? ([] as any))
      );
    };

    setSavedTheme();
    setSavedFavorites();
  });

  const switchTheme = async (theme: NonNullable<ColorSchemeName>) => {
    setTheme(theme);
    await AsyncStorage.setItem("theme", theme);
  };

  const setFavorite = async (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(
        (prevFav) => (
          AsyncStorage.setItem(
            "favorites",
            JSON.stringify(prevFav.filter((fav) => fav !== id))
          ),
          prevFav.filter((fav) => fav !== id)
        )
      );
    } else {
      setFavorites(
        (prevFav) => (
          AsyncStorage.setItem("favorites", JSON.stringify([...prevFav, id])),
          [...prevFav, id]
        )
      );
    }
  };

  const isFavorite = (id: number) => {
    return favorites.includes(id);
  };

  const value = {
    theme,
    favorites,
    switchTheme,
    setFavorite,
    isFavorite,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
