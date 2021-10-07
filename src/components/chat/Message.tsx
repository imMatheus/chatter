import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from '@components/Themed'

interface MessageProps {
    text: string
}

const Message: React.FC<MessageProps> = ({ text }) => {
    return (
        <View>
            <Text style={{ color: 'red' }}>{text}</Text>
        </View>
    )
}

export default Message

const styles = StyleSheet.create({})
