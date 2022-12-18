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
  setFavorite: (
    postId: number,
    slug?: string,
    likes?: { _id: string; user: string; createdAt: string }[]
  ) => {},
  isFavorite: (
    postId: number,
    likes?: { _id: string; user: string; createdAt: string }[]
  ) => {
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
  const [userId, setUserId] = useState(null);
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
        setUserId(
          JSON.parse((await AsyncStorage.getItem("userId")) as string) ?? null
        );
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

  const setFavorite = async (
    postId: number,
    slug?: string,
    likes?: { _id: string; user: string; createdAt: string }[]
  ) => {
    if (isAuthed) {
      if (isFavorite(postId, likes)) {
        await axios
          .put(
            `/posts/${slug}/unlike`,
            {},
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          )
          .catch((err: Error) => console.warn(err));
      } else {
        await axios
          .put(
            `/posts/${slug}/like`,
            {},
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          )
          //@ts-ignore
          .catch((err: Error) => console.warn(err.response.data));
      }
    } else {
      if (isFavorite(postId, likes)) {
        setFavorites(
          (prevFav) => (
            AsyncStorage.setItem(
              "favorites",
              JSON.stringify(prevFav.filter((fav) => fav !== postId))
            ),
            prevFav.filter((fav) => fav !== postId)
          )
        );
      } else {
        setFavorites(
          (prevFav) => (
            AsyncStorage.setItem(
              "favorites",
              JSON.stringify([...prevFav, postId])
            ),
            [...prevFav, postId]
          )
        );
      }
    }
  };

  const isFavorite = (
    postId: number,
    likes?: { _id: string; user: string; createdAt: string }[]
  ) => {
    if (isAuthed) {
      return likes ? likes?.some((like) => like.user === userId) : false;
    } else {
      return favorites.includes(postId);
    }
  };

  const authSignIn = async (email: string, password: string) => {
    try {
      const { data } = await axios.post("/auth/login", {
        email,
        password,
      });

      setAuthed(true);
      setToken(data.token);
      setUserId(data._id);

      AsyncStorage.setItem("isAuthed", JSON.stringify(true));
      AsyncStorage.setItem("token", data.token);
      AsyncStorage.setItem("userId", JSON.stringify(data._id));

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
      setUserId(data._id);

      AsyncStorage.setItem("isAuthed", JSON.stringify(true));
      AsyncStorage.setItem("token", data.token);
      AsyncStorage.setItem("userId", JSON.stringify(data._id));

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
