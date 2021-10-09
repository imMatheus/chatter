import * as React from 'react'
import { StyleSheet, Button } from 'react-native'

import EditScreenInfo from '../components/EditScreenInfo'
import { Text, View } from '../components/Themed'
import { RootTabScreenProps } from '../routes/types'
import { useAuth } from '@context/AuthContext'

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
    const { logout } = useAuth()

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tab One</Text>
            <View style={styles.separator} />
            <Button title='Logout' onPress={async () => await logout()} />
            <EditScreenInfo path='/screens/TabOneScreen.tsx' />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
})
