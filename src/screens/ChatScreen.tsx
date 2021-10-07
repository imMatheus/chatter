import { Text, View } from '@components/Themed'
import React from 'react'
import Message from '@components/chat/Message'
import { ScrollView } from 'react-native'

const ChatScreen: React.FC = ({}) => {
    return (
        <View>
            <Text>hello world</Text>
            <ScrollView style={{ backgroundColor: 'orange' }}>
                <Message text='hello world' />
                <Message text='hello world' />
                <Message text='hello world' />
                <Message text='hello world' />
                <Message text='hello world' />
                <Message text='hello world' />
            </ScrollView>
        </View>
    )
}

export default ChatScreen
