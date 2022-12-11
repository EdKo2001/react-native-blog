import { FC } from "react";
import {
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

import { BACKEND_URL } from "@env";

import { IPost } from "../../types/";

const Post: FC<IPost> = (props) => {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

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
      //@ts-ignore
      content: props.text,
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
        <Text style={styles.title}>{props.title}</Text>
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
          <View style={styles.meta}>
            <FontAwesome name="heart-o" size={20} color={color} />
            <Text style={styles.meta.metaItem}>{props.likesCount}</Text>
            {/* <Text style={styles.metaWrapper.meta}>
          1 <FontAwesome name="heart" size={20} color={color} />
        </Text> */}
          </View>
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
    backgroundColor: "white",
    borderRadius: 4,
    marginBottom: 30,
    overflow: "hidden",
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
