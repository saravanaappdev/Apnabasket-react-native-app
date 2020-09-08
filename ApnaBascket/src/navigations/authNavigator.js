// In the auth-navigator.js we will define the navigation type for the login screen:

import { createStackNavigator } from 'react-navigation-stack';

const authStack = createStackNavigator({
// Login and signup pages routes
},
  {
    initialRouteName: '',
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
);
export default authStack;