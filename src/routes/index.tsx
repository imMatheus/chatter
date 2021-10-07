import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import * as React from 'react'
import { ColorSchemeName, Pressable } from 'react-native'

import { useAuth } from '@context/AuthContext'

import LinkingConfiguration from './LinkingConfiguration'
import RootStack from './RootStack'
import LoginStack from './LoginStack'

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
    const { currentUser } = useAuth()
    return (
        <NavigationContainer
            linking={LinkingConfiguration}
            theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        >
            {currentUser ? <RootStack /> : <LoginStack />}
        </NavigationContainer>
    )
}
