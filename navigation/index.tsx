import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ColorSchemeName, Pressable } from "react-native";

import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AccessibleImage from "../components/Reusables/AccessibleImage";
import { Text, View } from "../components/Reusables/Themed";

import Colors from "../constants/Colors";

import {
  TabOneScreen,
  TabTwoScreen,
  TabThreeScreen,
  NotFoundScreen,
  TabFourScreen,
  FullPostScreen,
} from "../screens";

import { useColorScheme } from "../hooks";

import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FullPost"
        component={FullPostScreen}
        options={({ route }) => ({
          //@ts-ignore
          title: route.params?.title,
          headerRight: () => (
            <Pressable
            // onPress={() => navigation.navigate("Modal")}
            // style={({ pressed }) => ({
            //   opacity: pressed ? 0.5 : 1,
            // })}
            >
              <Text>Share</Text>
            </Pressable>
          ),
        })}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  );
};

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

const BottomTabNavigator = () => {
  // const theme = "dark"
  const colorScheme = useColorScheme();

  // const storeData = async (value?: string) => {
  //   try {
  //     await AsyncStorage.setItem("theme", "dark");
  //   } catch (e) {
  //     console.warn(e);
  //   }
  // };

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarStyle: {
          height: 50,
          paddingBottom: 5,
        },
        headerRight: () => (
          <Pressable
          // onPress={() => storeData()}
          // style={({ pressed }) => ({
          //   opacity: pressed ? 0.5 : 1,
          // })}
          >
            <Text>Switch Theme</Text>
          </Pressable>
        ),
      }}
    >
      <BottomTab.Screen
        name="TabOne"
        component={TabOneScreen}
        options={({ navigation }: RootTabScreenProps<"TabOne">) => ({
          title: "Latest",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="newspaper-o" color={color} />
          ),
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={{
          title: "Popular",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="eye" size={24} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="TabThree"
        component={TabThreeScreen}
        options={{
          title: "Relevant",
          tabBarIcon: ({ color }) => <TabBarIcon name="star" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="TabFour"
        component={TabFourScreen}
        options={{
          title: "Account",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account"
              size={24}
              color={color}
              style={{ marginBottom: -3 }}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
const TabBarIcon = (props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) => {
  return <FontAwesome size={24} style={{ marginBottom: -3 }} {...props} />;
};
