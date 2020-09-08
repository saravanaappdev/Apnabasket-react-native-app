import NavigationService from './services/navigationService';

// functionality to navigate to login page
export function navigateToAuth() {
    NavigationService.navigate('Login');
}
