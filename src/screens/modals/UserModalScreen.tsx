import { RootTabScreenProps, RootStackParamList } from '@routes/types'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, View, ScrollView, SafeAreaView } from 'react-native'
import { fs } from '@src/firebase'
import { useAuth } from '@context/AuthContext'
import { User } from '@src/types'
import firebase from 'firebase/app'
import UserContainer from '@components/UserContainer'

const UserModalScreen: React.FC<RootTabScreenProps<'UserModal'>> = ({ navigation, route }) => {
    const [user, setUser] = useState<any>(null)
    const [friends, setFriends] = useState<any[]>([])
    const [friendsSearch, setFriendsSearch] = useState('')
    const { currentUser } = useAuth()

    console.log(route.params.id)

    useEffect(() => {
        async function getUser() {
            await fs
                .doc(`users/${route.params.id}`)
                .get()
                .then((response) => setUser(response.data()))
            await fs
                .collection(`users/${route.params.id}/friends`)
                .get()
                .then((response) => setFriends(response.docs.map((doc) => doc.data())))
        }
        getUser()
    }, [route.params.id])

    useEffect(() => {
        async function getUser() {
            await fs
                .collection(`users`)
                .where('disassembledDisplayName', 'array-contains', friendsSearch.toLowerCase())
                .get()
                .then((response) =>
                    setFriends(
                        response.docs
                            .map((doc) => doc.data())
                            .concat(response.docs.map((doc) => doc.data()))
                            .concat(response.docs.map((doc) => doc.data()))
                            .concat(response.docs.map((doc) => doc.data()))
                            .concat(response.docs.map((doc) => doc.data()))
                    )
                )
        }
        getUser()
    }, [friendsSearch])

    console.log(user)
    console.log('friends')
    console.log(friends)

    return (
        <SafeAreaView>
            <Text>User modal</Text>
            <TextInput
                style={styles.input}
                onChangeText={setFriendsSearch}
                value={friendsSearch}
                placeholder='pika'
            />
            <ScrollView>
                {friends.map((friend) => (
                    <UserContainer
                        name={friend.name}
                        displayName={friend.displayName}
                        profileImage={friend.profileImage}
                    />
                ))}
            </ScrollView>
            <Text>{route.params.id}</Text>
        </SafeAreaView>
    )
}

export default UserModalScreen

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: '#239999',
        color: 'red',
    },
})
