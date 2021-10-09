import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import Chat from '@components/chat/Chat'
import { ChatStackParamList, ChatStackProps } from '@routes/types'
const ChatsScreen: React.FC<ChatStackProps<'Chats'>> = ({ navigation }) => {
    console.log(navigation)

    return (
        <View>
            <ScrollView>
                <Chat
                    title='Lorem ipsum dolor sit.'
                    enterChatHandler={() => navigation.navigate('Chat', { id: 'abcdhj23' })}
                    userPressHandler={() => navigation.navigate('UserModal', { id: 'abcdhj23' })}
                />
                <Chat
                    title='Lorem ipsum dolor sit.'
                    enterChatHandler={() => navigation.navigate('Chat', { id: 'abcdhj23' })}
                />
                <Chat
                    title='Lorem ipsum dolor sit.'
                    enterChatHandler={() => navigation.navigate('Chat', { id: 'abcdhj23' })}
                />
                <Chat
                    title='Lorem ipsum dolor sit.'
                    enterChatHandler={() => navigation.navigate('Chat', { id: 'abcdhj23' })}
                />
            </ScrollView>
        </View>
    )
}

export default ChatsScreen

const styles = StyleSheet.create({})
