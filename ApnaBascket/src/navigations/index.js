// In the index.js we will define our RootNavigator merging the auth and app navigators:

import { createAppContainer, createSwitchNavigator } from "react-navigation";
// import Loader from '../scenes/loader';
import MainStack from "./appNavigator";
// import AuthStack from "./authNavigator";

const Navigator = createAppContainer(
  createSwitchNavigator(
    {
    //   Starter: Loader,
    //   Auth: AuthStack,
      App: MainStack,
    },
    {
      // As there is no authentications, intially routed to Home page
      initialRouteName: "App",
      headerMode: "none",
      navigationOptions: {
        gesturesEnabled: false,
      },
    }
  )
);

export default Navigator;
