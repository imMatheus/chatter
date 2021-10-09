import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import Chat from '@components/chat/Chat'
const ChatsScreen: React.FC = () => {
    return (
        <View>
            <ScrollView>
                <Chat title='Lorem ipsum dolor sit.' />
                <Chat title='Lorem ipsum dolor sit.' />
                <Chat title='Lorem ipsum dolor sit.' />
                <Chat title='Lorem ipsum dolor sit.' />
                <Chat title='Lorem ipsum dolor sit.' />
                <Chat title='Lorem ipsum dolor sit.' />
                <Chat title='Lorem ipsum dolor sit.' />
                <Chat title='Lorem ipsum dolor sit.' />
                <Chat title='Lorem ipsum dolor sit.' />
                <Chat title='Lorem ipsum dolor sit.' />
                <Chat title='Lorem ipsum dolor sit.' />
                <Chat title='Lorem ipsum dolor sit.' />
            </ScrollView>
        </View>
    )
}

export default ChatsScreen

const styles = StyleSheet.create({})
