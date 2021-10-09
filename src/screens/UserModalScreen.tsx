import { RootTabScreenProps, RootStackParamList } from '@routes/types'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { fs } from '@src/firebase'
import { useAuth } from '@context/AuthContext'

const UserModalScreen: React.FC<RootTabScreenProps<'UserModal'>> = ({ navigation, route }) => {
    const [user, setUser] = useState<any>(null)
    const { currentUser } = useAuth()

    console.log(route.params.id)

    useEffect(() => {
        async function getUser() {
            fs.doc(`users/${route.params.id}`)
                .get()
                .then((response) => setUser(response.data()))
        }
        getUser()
    }, [route.params.id])
    console.log(user)

    return (
        <View>
            <Text>User modal</Text>
        </View>
    )
}

export default UserModalScreen

const styles = StyleSheet.create({})
