import { createStackNavigator } from 'react-navigation-stack';
import Category from '../scenes/category';
import Home from '../scenes/home';
import Product from '../scenes/products';

const MainStack = createStackNavigator({
    Home: {
        screen: Home,
    },
    Category: {
        screen: Category,
    },
    Product: {
        screen: Product,
    },
},
    {
        initialRouteName: 'Home',
        headerMode: 'none',
        navigationOptions: {
            gesturesEnabled: false,
        },
    },
);

export default MainStack;
