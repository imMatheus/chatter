/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'
import { Pressable } from 'react-native'

import Colors from '@constants/Colors'
import useColorScheme from '@hooks/useColorScheme'
import ModalScreen from '@src/screens/modals/ModalScreen'
import NotFoundScreen from '@screens/NotFoundScreen'
import TabOneScreen from '@screens/TabOneScreen'
import TabTwoScreen from '@screens/TabTwoScreen'
import ChatScreen from '@src/screens/chat/ChatScreen'
import ChatsScreen from '@src/screens/chat/ChatsScreen'
import UserModalScreen from '@src/screens/modals/UserModalScreen'
import ChatStack from './ChatStack'
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '@src/routes/types'
import LinkingConfiguration from './LinkingConfiguration'
import { useAuth } from '@context/AuthContext'

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>()

export default function RootStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Root'
                component={BottomTabNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen name='NotFound' component={NotFoundScreen} options={{ title: 'Oops!' }} />
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen name='Modal' component={ModalScreen} />
                <Stack.Screen name='UserModal' component={UserModalScreen} />
            </Stack.Group>
        </Stack.Navigator>
    )
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>()

function BottomTabNavigator() {
    const colorScheme = useColorScheme()
    const { currentUser } = useAuth()

    return (
        <BottomTab.Navigator
            initialRouteName='ChatsStack'
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme].tint,
            }}
        >
            <BottomTab.Screen
                name='TabOne'
                component={TabOneScreen}
                options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
                    title: 'Tab One',
                    tabBarIcon: ({ color }) => <TabBarIcon name='map' color={color} />,
                    headerRight: () => (
                        <Pressable
                            onPress={() =>
                                navigation.navigate('UserModal', { id: currentUser!.uid })
                            }
                            style={({ pressed }) => ({
                                opacity: pressed ? 0.5 : 1,
                            })}
                        >
                            <FontAwesome
                                name='info-circle'
                                size={25}
                                color={Colors[colorScheme].text}
                                style={{ marginRight: 15 }}
                            />
                        </Pressable>
                    ),
                })}
            />
            <BottomTab.Screen
                name='TabTwo'
                component={TabTwoScreen}
                options={({ navigation }: RootTabScreenProps<'TabTwo'>) => ({
                    title: 'Tab two',
                    tabBarIcon: ({ color }) => <TabBarIcon name='code' color={color} />,
                    headerRight: () => (
                        <Pressable
                            onPress={() => navigation.navigate('Modal')}
                            style={({ pressed }) => ({
                                opacity: pressed ? 0.5 : 1,
                            })}
                        >
                            <FontAwesome
                                name='info-circle'
                                size={25}
                                color={Colors[colorScheme].text}
                                style={{ marginRight: 15 }}
                            />
                        </Pressable>
                    ),
                })}
            />

            <BottomTab.Screen
                name='ChatsStack'
                component={ChatStack}
                options={() => ({
                    headerShown: false,
                    tabBarIcon: ({ color }) => <TabBarIcon name='map' color={color} />,
                })}
            />
        </BottomTab.Navigator>
    )
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name']
    color: string
}) {
    return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />
}
