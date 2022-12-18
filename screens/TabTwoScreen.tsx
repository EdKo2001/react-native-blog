import usePosts from "../hooks/usePosts";

import { RootTabScreenProps } from "../types";

const TabTwoScreen = ({ navigation }: RootTabScreenProps<"TabTwo">) => {
  const popularPosts = usePosts("popular").posts;

  return popularPosts;
};

export default TabTwoScreen;
