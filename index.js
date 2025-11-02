import { registerRootComponent } from 'expo';

// Ensure firebase is initialized (including React Native persistence for Auth)
// before any component imports that might use auth/db.
import './firebase';

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
