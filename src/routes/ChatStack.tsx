/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'

import Chats from '@screens/ChatsScreen'
import Chat from '@screens/ChatScreen'
import { useAuth, AuthProvider } from '@context/AuthContext'

import { ChatStackParamList } from '@src/routes/types'
import { Text, View } from '@components/Themed'

const Stack = createNativeStackNavigator<ChatStackParamList>()

export default function Navigation() {
    const { currentUser } = useAuth()
    return (
        <Stack.Navigator>
            <Stack.Screen name='Chats' component={Chats} />
            <Stack.Screen name='Chat' component={Chat} />
        </Stack.Navigator>
    )
}
