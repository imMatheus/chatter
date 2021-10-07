import { Text, View } from '@components/Themed'
import React from 'react'
import Message from '@components/chat/Message'

import { ScrollView, StyleSheet } from 'react-native'

const ChatScreen: React.FC = ({}) => {
    const t =
        ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus voluptatum voluptatibus ipsa dolorem laboriosam vitae sed architecto molestias vero officiis?'
    const tt =
        ' Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates perspiciatis sunt, tenetur eveniet quia cupiditate minima sit reiciendis sint! Quia quod magni doloremque, quae exercitationem officiis natus molestias ullam! Eligendi odit dolor labore fuga laborum rem iste ipsa perspiciatis maxime?'
    return (
        <View style={styles.container}>
            <ScrollView>
                <Message text={tt} />
                <Message text='hello world' fromMe />
                <Message text={t} fromMe />
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
