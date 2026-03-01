import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from "./signin";
import ExEmailScreen from "./exEmail";
import DashboardScreen from "./riskDashboard";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Sign In">
        <Stack.Screen name="Sign In" component={SignInScreen} />
        <Stack.Screen name="exEmail" component={ExEmailScreen} />
        <Stack.Screen name="riskDashboard" component={DashboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );

}
// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.tsx to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
