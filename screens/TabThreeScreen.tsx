import { usePosts } from "../hooks";

import { RootTabScreenProps } from "../types";

const TabThreeScreen = ({ navigation }: RootTabScreenProps<"TabThree">) => {
  const posts = usePosts("relevant");

  return posts;
};

export default TabThreeScreen;