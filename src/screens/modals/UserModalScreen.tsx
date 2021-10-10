import { RootTabScreenProps, RootStackParamList } from '@routes/types'
import React, { useEffect, useState } from 'react'
import { StyleSheet, TextInput, View, ScrollView, SafeAreaView, Pressable } from 'react-native'
import { fs } from '@src/firebase'
import { useAuth } from '@context/AuthContext'
import { SvgXml } from 'react-native-svg'
import { User, Friend } from '@src/types'
import { Text } from '@components/Themed'
import firebase from 'firebase/app'
import UserContainer from '@components/UserContainer'
import Colors from '@constants/Colors'
import useColorScheme from '@hooks/useColorScheme'
import { Feather } from '@expo/vector-icons'

const UserModalScreen: React.FC<RootTabScreenProps<'UserModal'>> = ({ navigation, route }) => {
    const [user, setUser] = useState<any>(null)
    const [friends, setFriends] = useState<Friend[]>([])
    const [friendsSearch, setFriendsSearch] = useState('')
    const [friendRequests, setFriendRequests] = useState<Friend[]>([])
    const [loading, setLoading] = useState(false)
    const { currentUser } = useAuth()
    const colorSchema = useColorScheme()

    console.log(route.params.id)

    useEffect(() => {
        async function getUser() {
            setLoading(true)
            await Promise.all([
                fs
                    .doc(`users/${route.params.id}`)
                    .get()
                    .then((response) => setUser(response.data())),
                fs
                    .collection(`users/${route.params.id}/friends`)
                    .get()
                    .then((response) =>
                        setFriends(
                            response.docs.map((doc) => {
                                const data = doc.data()
                                return {
                                    displayName: data.displayName,
                                    profileImage: data.profileImage,
                                    name: data.name,
                                    uid: doc.id,
                                }
                            })
                        )
                    ),
                fs
                    .collection(`users/${route.params.id}/friendRequests`)
                    .get()
                    .then((response) =>
                        setFriendRequests(
                            response.docs.map((doc) => {
                                const data = doc.data()
                                return {
                                    displayName: data.displayName,
                                    profileImage: data.profileImage,
                                    name: data.name,
                                    uid: doc.id,
                                }
                            })
                        )
                    ),
            ])
            setLoading(false)
        }
        getUser()
    }, [route.params.id])

    useEffect(() => {
        async function getUser() {
            await fs
                .collection(`users`)
                .where(
                    'disassembledDisplayName',
                    'array-contains',
                    friendsSearch.toLowerCase().trim()
                )
                .get()
                .then((response) =>
                    setFriends(
                        response.docs.map((doc) => {
                            const data = doc.data()
                            return {
                                displayName: data.displayName,
                                profileImage: data.profileImage,
                                name: data.name,
                                uid: doc.id,
                            }
                        })
                    )
                )
        }
        // getUser()
    }, [friendsSearch])

    const imageSize = 50

    const sendFriendRequestHandler = async ({ uid, profileImage, displayName, name }: Friend) => {
        if (!currentUser) return null
        await fs.doc(`users/${uid}/friendRequests/${currentUser.uid}`).set({
            profileImage: currentUser.profileImage,
            name: currentUser.name,
            displayName: currentUser.displayName,
            sentAt: new Date(),
        })
        await fs.doc(`users/${currentUser.uid}/friendRequests/${uid}`).set({
            profileImage,
            name,
            displayName,
            sentAt: new Date(),
            uid,
        })
        console.log('2')
    }

    const acceptFriendRequest = async ({ uid, profileImage, name, displayName }: Friend) => {
        if (!currentUser) return null
        console.log('10')
        setLoading(true)

        //TODO add transaction
        await fs.doc(`users/${uid}/friendRequests/${currentUser.uid}`).delete()
        await fs.doc(`users/${currentUser.uid}/friendRequests/${uid}`).delete()
        await fs.doc(`users/${currentUser.uid}/friends/${uid}`).set({
            profileImage,
            name,
            displayName,
            sentAt: new Date(),
            uid,
        })
        await fs.doc(`users/${uid}/friends/${currentUser.uid}`).set({
            profileImage,
            name,
            displayName,
            sentAt: new Date(),
            uid,
        })
        console.log('20')
        setLoading(false)
    }

    if (!user) return null
    return (
        <SafeAreaView style={styles.container}>
            <Text>User modal</Text>
            <View style={styles.userContainer}>
                <View
                    style={[
                        styles.imageWrapper,
                        { backgroundColor: Colors[colorSchema].backgroundDimmed },
                    ]}
                >
                    <SvgXml
                        xml={user.profileImage}
                        width={imageSize + 'pt'}
                        height={imageSize + 'pt'}
                    />
                </View>
                <View style={styles.textWrapper}>
                    <Text size='h4' numberOfLines={1}>
                        {user.name}
                    </Text>
                    <Text numberOfLines={1}>@{user.displayName}</Text>
                </View>
            </View>
            <TextInput
                style={styles.input}
                onChangeText={setFriendsSearch}
                value={friendsSearch}
                placeholder='pika'
            />
            <ScrollView>
                {friends.map((friend) => (
                    <UserContainer
                        key={friend.uid}
                        id={friend.uid}
                        name={friend.name}
                        displayName={friend.displayName}
                        profileImage={friend.profileImage}
                        RightComponent={() => (
                            <Pressable
                                style={[
                                    styles.addButton,
                                    { backgroundColor: Colors[colorSchema].backgroundDimmed },
                                ]}
                                onPress={() =>
                                    navigation.navigate('ChatsStack', {
                                        screen: 'Chat',
                                        params: { id: 'asdsad' },
                                    })
                                }
                            >
                                <Feather name='message-circle' size={24} color='black' />
                            </Pressable>
                        )}
                        // RightComponent={() => (
                        //     <Pressable
                        //         style={[
                        //             styles.addButton,
                        //             { backgroundColor: Colors[colorSchema].backgroundDimmed },
                        //         ]}
                        //         onPress={() => sendFriendRequestHandler(friend)}
                        //     >
                        //         <Text>+ Add Friend</Text>
                        //     </Pressable>
                        // )}
                    />
                ))}
                {friendRequests.map((friend) => (
                    <UserContainer
                        key={friend.uid}
                        id={friend.uid}
                        name={friend.name}
                        displayName={friend.displayName}
                        profileImage={friend.profileImage}
                        RightComponent={() => (
                            <Pressable
                                style={[
                                    styles.addButton,
                                    { backgroundColor: Colors[colorSchema].backgroundDimmed },
                                ]}
                                onPress={() => acceptFriendRequest(friend)}
                            >
                                <Text>Accept friend</Text>
                            </Pressable>
                        )}
                    />
                ))}
            </ScrollView>
            <Text>{route.params.id}</Text>
        </SafeAreaView>
    )
}

export default UserModalScreen

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
    },
    input: {
        height: 40,
        marginVertical: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: '#239999',
        color: 'red',
    },
    userContainer: {
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    imageWrapper: {
        width: 50,
        height: 50,
        flex: 0,
        borderRadius: 9999,
        overflow: 'hidden',
    },

    textWrapper: {
        padding: 10,
        flex: 1,
    },
    addButton: {
        position: 'absolute',
        right: 10,
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 100,
    },
})
