import { createContext, useContext, useEffect, useState } from "react";
import { ColorSchemeName, useColorScheme } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { axios } from "../utils";

const initialState = {
  theme: "light" as NonNullable<ColorSchemeName>,
  favorites: [] as number[],
  isAuthed: false,
  token: "",
  switchTheme: (theme: "light" | "dark") => {
    theme;
  },
  setFavorite: (id: number) => {},
  isFavorite: (id: number) => {
    return true || false;
  },
  authSignIn: (email: string, password: string) => {},
  authSignout: () => {},
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
  const [isAuthed, setAuthed] = useState(false);
  const [token, setToken] = useState("");

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

    const setAuthed = async () => {
      //@ts-ignore
      setAuthed(JSON.parse((await AsyncStorage.getItem("isAuthed")) ?? false));
      setToken(JSON.parse((await AsyncStorage.getItem("token")) ?? ""));
    };

    setSavedTheme();
    setSavedFavorites();
    setAuthed();
  }, []);

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

  const authSignIn = async (email: string, password: string) => {
    try {
      const { data } = await axios.post("/auth/login", { email, password });
      setToken(data.token);
      setAuthed(true);
      AsyncStorage.setItem("isAuthed", JSON.stringify(true));
      AsyncStorage.setItem("token", data.token);
    } catch (err) {
      console.warn(err);
    }
  };

  const authSignout = async () => {
    try {
      setToken("");
      setAuthed(false);
      AsyncStorage.setItem("isAuthed", JSON.stringify(false));
      AsyncStorage.setItem("token", "");
    } catch (err) {
      console.warn(err);
    }
  };

  const value = {
    theme,
    favorites,
    isAuthed,
    token,
    switchTheme,
    setFavorite,
    isFavorite,
    authSignIn,
    authSignout,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
