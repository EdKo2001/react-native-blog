import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import { useEffect, useState } from "react";

import RenderHTML from "react-native-render-html";

import { Text, useThemeColor } from "../components/Reusables/Themed";
import AccessibleImage from "../components/Reusables/AccessibleImage";
import Container from "../components/Reusables/Container";
import PostMeta from "../components/Reusables/PostMeta";

import { width } from "../constants/Layout";

import { axios } from "../utils";

import { RootStackScreenProps } from "../types/";

const FullPostScreen = (
  { route, navigation }: RootStackScreenProps<"FullPost">,
  props: any
) => {
  //@ts-ignore
  const { _id, slug, title, img, tag, commentsCount } = route.params;
  const [postData, setPostData] = useState<{
    viewsCount?: number;
    likesCount?: number;
    likes?: { _id: string; user: string; createdAt: string }[];
    content?: string;
  }>({});
  const [postCallback, setPostCallback] = useState(false);

  const color = useThemeColor(
    //@ts-ignore
    { light: props.lightColor, dark: props.darkColor },
    "text"
  );

  useEffect(() => {
    const getPostContent = async () => {
      await axios
        .get(`/posts/${slug}?fields=content,viewsCount,likesCount,likes`)
        .then((res: any) => setPostData(res.data))
        .catch((err: Error) => console.warn(err));
    };

    getPostContent();
  }, [postCallback]);

  const tagsStyles = {
    body: {
      color,
    },
  };

  return !postData.content ? (
    <ActivityIndicator style={{ flex: 1, alignItems: "center" }} size="large" />
  ) : (
    <ScrollView>
      <Container>
        <AccessibleImage src={img} style={styles.featured} full />
        <Text style={styles.title}>{title?.replace(/&nbsp;/g, " ")}</Text>
        <Text style={styles.tag}>#{tag}</Text>
        <PostMeta
          {...{
            _id,
            slug,
            viewsCount: postData.viewsCount!,
            likesCount: postData.likesCount!,
            likes: postData.likes,
            commentsCount,
          }}
          onLike={() => setPostCallback((prevState) => !prevState)}
        />
        <RenderHTML
          contentWidth={width}
          tagsStyles={tagsStyles}
          source={{ html: postData.content }}
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
  tag: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default FullPostScreen;
