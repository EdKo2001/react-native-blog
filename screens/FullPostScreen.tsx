import RenderHTML from "react-native-render-html";

import { Text } from "../components/Reusables/Themed";
import AccessibleImage from "../components/Reusables/AccessibleImage";
import Button from "../components/Reusables/Button";
import Container from "../components/Reusables/Container";

import { width } from "../constants/Layout";

import { RootStackScreenProps } from "../types";
import { ScrollView, StyleSheet } from "react-native";

const FullPostScreen = ({
  route,
  navigation,
}: RootStackScreenProps<"FullPost">) => {
  //@ts-ignore
  const { slug, title, img, content } = route.params;

  return (
    <ScrollView>
      <Container>
        <AccessibleImage src={img} style={styles.featured} full />
        <Text style={styles.title}>{title}</Text>
        <RenderHTML contentWidth={width} source={{ html: content }} />
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
