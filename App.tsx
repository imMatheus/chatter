import React from 'react'
import { View, Text, Alert } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import useCachedResources from './src/hooks/useCachedResources'
import useColorScheme from './src/hooks/useColorScheme'
import { useAuth, AuthProvider } from '@context/AuthContext'
import Navigation from './src/routes'

export default function App() {
    const isLoadingComplete = useCachedResources()
    const colorScheme = useColorScheme()

    function Main() {
        return (
            <SafeAreaProvider>
                <Navigation colorScheme={colorScheme} />

                <StatusBar />
            </SafeAreaProvider>
        )
    }
    if (!isLoadingComplete) {
        return null
    } else {
        return (
            <AuthProvider>
                <Main />
            </AuthProvider>
        )
    }
}
