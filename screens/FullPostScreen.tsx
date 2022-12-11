import RenderHTML from "react-native-render-html";

import { Text, useThemeColor } from "../components/Reusables/Themed";
import AccessibleImage from "../components/Reusables/AccessibleImage";
import Button from "../components/Reusables/Button";
import Container from "../components/Reusables/Container";

import { width } from "../constants/Layout";

import { RootStackScreenProps } from "../types";
import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { axios } from "../utils";

const FullPostScreen = (
  { route, navigation }: RootStackScreenProps<"FullPost">,
  props: any
) => {
  const [content, setContent] = useState("");
  //@ts-ignore
  const { slug, title, img } = route.params;

  const color = useThemeColor(
    //@ts-ignore
    { light: props.lightColor, dark: props.darkColor },
    "text"
  );

  useEffect(() => {
    const getPostContent = async () => {
      setContent(
        await axios
          .get(`/posts/${slug}?fields=content`)
          .then((res: any) => res.data.content)
      );
    };

    getPostContent();
  }, []);

  const tagsStyles = {
    body: {
      color,
    },
  };

  return !content ? (
    <ActivityIndicator style={{ flex: 1, alignItems: "center" }} size="large" />
  ) : (
    <ScrollView>
      <Container>
        <AccessibleImage src={img} style={styles.featured} full />
        <Text style={styles.title}>{title?.replace(/&nbsp;/g, " ")}</Text>
        <RenderHTML
          contentWidth={width}
          tagsStyles={tagsStyles}
          source={{ html: content }}
        />
      </Container>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  featured: {
    borderRadius: 4,
    marginBottom: 15,
  },
});

export default FullPostScreen;
