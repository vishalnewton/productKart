import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeStack} from './Home/HomeStack';
import Categories from './Categories';
import Favourites from './Favourites';
import More from './More';
import SvgIcon from '../Utils/SvgIcon';

const Tab = createBottomTabNavigator();

export function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) =>
            focused ? <SvgIcon icon="home" /> : <SvgIcon icon="home" />,
        }}
        name="Home"
        component={HomeStack}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <SvgIcon icon="categories" />
            ) : (
              <SvgIcon icon="categories" />
            ),
        }}
        name="Categories"
        component={Categories}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) =>
            focused ? <SvgIcon icon="favIcon" /> : <SvgIcon icon="favIcon" />,
        }}
        name="Favourites"
        component={Favourites}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) =>
            focused ? <SvgIcon icon="moreIcon" /> : <SvgIcon icon="moreIcon" />,
        }}
        name="More"
        component={More}
      />
    </Tab.Navigator>
  );
}
