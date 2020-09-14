import { createStackNavigator } from 'react-navigation-stack';

const authStack = createStackNavigator({
// TODO:- Login and signup routes
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