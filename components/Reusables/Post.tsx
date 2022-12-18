import { FC } from "react";
import {
  Pressable,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { FontAwesome } from "@expo/vector-icons";
import RenderHtml from "react-native-render-html";

import { Text, useThemeColor, View } from "./Themed";

import AccessibleImage from "./AccessibleImage";
import Button from "./Button";

import { useGlobalContext } from "../../context/GlobalContext";

import { BACKEND_URL } from "@env";

import { IPost } from "../../types/";

const Post: FC<IPost> = (props) => {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const { setFavorite, isFavorite } = useGlobalContext();

  const color = useThemeColor(
    //@ts-ignore
    { light: props.lightColor, dark: props.darkColor },
    "text"
  );

  const tagsStyles = {
    body: {
      color,
    },
  };

  const navigateToFullPost = () => {
    //@ts-ignore
    navigation.navigate("FullPost", {
      slug: props.slug,
      title: props.title,
      img: props.imageUrl ? BACKEND_URL + props.imageUrl : "",
      tag: props.tags?.[0],
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
        <View style={styles.metaWrapper}>
          <View style={[styles.meta, { marginLeft: 0 }]}>
            <FontAwesome name="eye" size={20} color={color} />
            <Text style={styles.meta.metaItem}>{props.viewsCount}</Text>
          </View>
          <View style={styles.meta}>
            <FontAwesome name="commenting-o" size={20} color={color} />
            <Text style={styles.meta.metaItem}>{props.commentsCount}</Text>
          </View>
          <Pressable
            onPress={() => setFavorite(props._id!, props.slug, props.likes)}
            style={styles.meta}
          >
            <FontAwesome
              name={isFavorite(props._id!, props.likes) ? "heart" : "heart-o"}
              size={20}
              color={isFavorite(props._id!, props.likes) ? "red" : color}
            />
            <Text style={styles.meta.metaItem}>{props.likesCount}</Text>
          </Pressable>
        </View>
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
  metaWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  meta: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
    metaItem: {
      fontSize: 16,
      marginLeft: 5,
      backgroundColor: "transparent",
    },
  },
  button: {
    maxWidth: "50%",
  },
});

export default Post;
