import 'react-native-gesture-handler';
import * as React from "react";
import { View, StatusBar,Platform } from "react-native";
import { white, purple } from './utils/colors';
import AddCard from './components/AddCard';
import DeckList from './components/DeckList';
import Deck from './components/Deck';
import Quiz from './components/Quiz';
import Result from './components/Result';
import NewDeck from './components/NewDeck';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers';
import Constants from 'expo-constants';
import middleware from './middleware';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, Ionicons } from '@expo/vector-icons' ;
import { setLocalNotification } from './utils/notifications';

const Stack = createStackNavigator();
const Tab =Platform.OS === 'ios'
           ? createBottomTabNavigator() 
           :  createMaterialTopTabNavigator();

function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}
function Home() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        switch (route.name) {
          case 'Deck List':
            return <Ionicons name="ios-bookmarks" size={size} color={color} />;
          case 'Create Deck':
            return <FontAwesome name="plus-square" size={size} color={color} />;
         
        }
      },
    })}
    tabBarOptions={{
      activeTintColor: Platform.OS === 'ios' ? purple : white,
      style: {
        backgroundColor: Platform.OS === 'ios' ? white : purple,
        shadowColor: 'rgba(0,0,0,0.24)',
        shadowOffset: { width: 0, height:5 },
        shadowRadius: 6,
        shadowOpacity: 1,
      },
    }}>        

      <Tab.Screen  name="Deck List" component={DeckList} />
      <Tab.Screen name="New Deck" component={NewDeck} />
    </Tab.Navigator>
  );
}


export default class App extends React.Component {
  componentDidMount () {

    setLocalNotification()

  }

  render() {
    return (
      <Provider store={createStore(reducer,middleware)}>
        <View style={{flex: 1}}>
          <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
       <NavigationContainer>
       <Stack.Navigator>
                        <Stack.Screen
                          name="Flash Card Applications" 
                          component={Home} 
                          options={{
                            headerTintColor: white,
                            headerStyle: { backgroundColor: purple },
                          }}
                          />
                        <Stack.Screen
                          name="Deck"
                          component={Deck}
                          options={{
                            headerTintColor: white,
                            headerStyle: { backgroundColor: purple },
                          }}
                        />
                        <Stack.Screen
                          name="Deck List"
                          component={DeckList}
                          options={{
                            headerTintColor: white,
                            headerStyle: { backgroundColor: purple },
                          }}
                        />
                         <Stack.Screen
                          name="Quiz"
                          component={Quiz}
                          options={{
                            headerTintColor: white,
                            headerStyle: { backgroundColor: purple },
                          }}
                        />
                         <Stack.Screen
                          name="Result"
                          component={Result}
                          options={{
                            headerTintColor: white,
                            headerStyle: { backgroundColor: purple },
                          }}
                        />
                          <Stack.Screen
                          name="AddCard"
                          component={AddCard}
                          options={{
                            headerTintColor: white,
                            headerStyle: { backgroundColor: purple },
                          }}
                        />
                      </Stack.Navigator>
       </NavigationContainer>
        </View>
      </Provider>
    );
  }
}

