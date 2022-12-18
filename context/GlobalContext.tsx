import { createContext, useContext, useEffect, useState } from "react";
import { ColorSchemeName, useColorScheme } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { axios } from "../utils";
import { createIconSetFromFontello } from "@expo/vector-icons";

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
  authSignIn: (email: string, password: string) => {
    return Promise.resolve() || Promise.reject();
  },
  authSignUp: (fullName: string, email: string, password: string) => {
    return Promise.resolve() || Promise.reject();
  },
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
      try {
        const theme = (await AsyncStorage.getItem(
          "theme"
        )) as NonNullable<ColorSchemeName>;

        switchTheme(theme ?? useColorScheme());
      } catch (err) {
        console.warn("setSavedTheme", err);
      }
    };

    const setSavedFavorites = async () => {
      try {
        setFavorites(
          JSON.parse((await AsyncStorage.getItem("favorites")) ?? ([] as any))
        );
      } catch (err) {
        console.warn("setSavedFavorites", err);
      }
    };

    const setSavedAuthed = async () => {
      try {
        setAuthed(
          JSON.parse(
            (await AsyncStorage.getItem("isAuthed")) ??
              (false as never as string)
          )
        );
        setToken((await AsyncStorage.getItem("token")) ?? "");
      } catch (err) {
        console.warn("setSavedAuthed", err);
      }
    };

    setSavedTheme();
    setSavedFavorites();
    setSavedAuthed();
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
      const { data } = await axios.post("/auth/login", {
        email,
        password,
      });
      setAuthed(true);
      setToken(data.token);
      AsyncStorage.setItem("isAuthed", JSON.stringify(true));
      AsyncStorage.setItem("token", data.token);

      return Promise.resolve();
    } catch (err) {
      if (err instanceof Error) {
        console.warn(err);
        //@ts-ignore
        alert(err.response.data.message);
      }
      return Promise.reject(err);
    }
  };

  const authSignUp = async (
    fullName: string,
    email: string,
    password: string
  ) => {
    try {
      const { data } = await axios.post("/auth/register", {
        fullName,
        email,
        password,
      });

      setAuthed(true);
      setToken(data.token);
      AsyncStorage.setItem("isAuthed", JSON.stringify(true));
      AsyncStorage.setItem("token", data.token);

      return Promise.resolve();
    } catch (err) {
      if (err instanceof Error) {
        //@ts-ignore
        alert(err.response.data.message ?? err.response.data.errors[0]);
      }
      return Promise.reject(err);
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
    authSignUp,
    authSignout,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
