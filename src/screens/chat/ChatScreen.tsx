import { Text, View } from '@components/Themed'
import React from 'react'
import Message from './components/Message'
import { useAuth } from '@context/AuthContext'
import { ScrollView, StyleSheet } from 'react-native'

const ChatScreen: React.FC = ({}) => {
    const { currentUser } = useAuth()
    console.log(currentUser?.displayName)
    console.log(currentUser?.name)

    const t = 'Sed architecto molestias vero officiis?'
    const tt = 'Fugarem iste ipsa perspiciatis maxime?'

    return (
        <View style={styles.container}>
            <ScrollView>
                <Message text={t} />
                <Message text='hello world' fromMe />
                <Message text={tt} />
                <Message text='hello world' fromMe />
                <Message
                    text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum mollitia pariatur dolores velit, alias similique reiciendis optio quaerat fugiat explicabo?'
                    fromMe
                />
            </ScrollView>
        </View>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        height: '100%',
        paddingHorizontal: 12,
        paddingBottom: 12,
    },
})
