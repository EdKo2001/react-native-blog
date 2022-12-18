import { FC } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import RenderHtml from "react-native-render-html";

import { Text, useThemeColor, View } from "./Themed";
import PostMeta from "./PostMeta";

import AccessibleImage from "./AccessibleImage";
import Button from "./Button";

import { BACKEND_URL } from "@env";

import { IPost } from "../../types/";

const Post: FC<IPost> = (props) => {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  const color = useThemeColor({ light: undefined, dark: undefined }, "text");

  const tagsStyles = {
    body: {
      color,
    },
  };

  const navigateToFullPost = () => {
    //@ts-ignore
    navigation.navigate("FullPost", {
      _id: props._id,
      slug: props.slug,
      title: props.title,
      img: props.imageUrl ? BACKEND_URL + props.imageUrl : "",
      tag: props.tags?.[0],
      commentsCount: props.commentsCount,
    });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={navigateToFullPost}
      style={styles.post}
    >
      {props.imageUrl && (
        <AccessibleImage
          src={BACKEND_URL + props.imageUrl}
          alt={props.title}
          style={styles.image}
          full
        />
      )}
      <View style={styles.content}>
        <Text style={styles.title}>{props.title?.replace(/&nbsp;/g, " ")}</Text>
        <Text style={styles.tag}>#{props.tags?.[0]}</Text>
        <RenderHtml
          contentWidth={width}
          baseStyle={styles.desc}
          tagsStyles={tagsStyles}
          source={{ html: props.excerpt?.replace(/(<([^>]+)>)/gi, "")! }}
        />
        <PostMeta {...props} />
        <Button
          title="Read More"
          onPress={navigateToFullPost}
          style={styles.button}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  post: {
    borderRadius: 4,
    marginBottom: 30,
    overflow: "hidden",
  },
  tag: {
    fontSize: 16,
    marginBottom: 10,
  },
  content: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  image: {},
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  desc: {
    fontSize: 16,
  },
  button: {
    maxWidth: "50%",
  },
});

export default Post;
