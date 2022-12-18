import usePosts from "../hooks/usePosts";

import { RootTabScreenProps } from "../types";

const TabTwoScreen = ({ navigation }: RootTabScreenProps<"TabTwo">) => {
  const popularPosts = usePosts("popular");

  return popularPosts.posts;
};

export default TabTwoScreen;
