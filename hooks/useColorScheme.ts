import { ColorSchemeName } from "react-native";

import { useGlobalContext } from "../context/GlobalContext";

// The useColorScheme value is always either light or dark, but the built-in
// type suggests that it can be null. This will not happen in practice, so this
// makes it a bit easier to work with.
export default function useColorScheme(): NonNullable<ColorSchemeName> {
  const { theme } = useGlobalContext();

  return theme as NonNullable<ColorSchemeName>;
}
