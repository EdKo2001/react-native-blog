import usePosts from "../hooks/usePosts";

import { RootTabScreenProps } from "../types";

const TabThreeScreen = ({ navigation }: RootTabScreenProps<"TabThree">) => {
  const relevantPosts = usePosts("relevant").posts;

  return relevantPosts;
};

export default TabThreeScreen;
