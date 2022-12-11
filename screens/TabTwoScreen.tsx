import usePosts from "../hooks/usePosts";

import { RootTabScreenProps } from "../types";

const TabTwoScreen = ({ navigation }: RootTabScreenProps<"TabTwo">) => {
  const posts = usePosts("popular");

  return posts;
};

export default TabTwoScreen;
