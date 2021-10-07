/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'

import NotFoundScreen from '@screens/NotFoundScreen'
import LoginScreen from '@screens/LoginScreen'
import { useAuth, AuthProvider } from '@context/AuthContext'

import { RegistrationStackParamList } from '@base/types'
import { Text, View } from '@src/components/Themed'

const Stack = createNativeStackNavigator<RegistrationStackParamList>()

export default function Navigation() {
    const { currentUser } = useAuth()
    return (
        <Stack.Navigator>
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='NotFound' component={NotFoundScreen} options={{ title: 'Oops!' }} />
        </Stack.Navigator>
    )
}