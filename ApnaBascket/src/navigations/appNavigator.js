import { createStackNavigator } from 'react-navigation-stack';
import Category from '../scenes/category';
import Home from '../scenes/home';
import { ProductDetails, ProductListing } from '../scenes/products';

const MainStack = createStackNavigator({
    Home: {
        screen: Home,
    },
    Category: {
        screen: Category,
    },
    ProductDetails: {
        screen: ProductDetails,
    },
    ProductListing: {
        screen: ProductListing,
    }
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
