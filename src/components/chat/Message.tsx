import React from 'react'
import { StyleSheet } from 'react-native'
import { Text, View } from '@components/Themed'
import Colors, { theme } from '@constants/Colors'

interface MessageProps {
    text: string
    fromMe?: boolean
}

const Message: React.FC<MessageProps> = ({ text, fromMe }) => {
    return (
        <View
            background='backgroundDimmed'
            style={[styles.container, fromMe ? styles.sent : styles.received]}
        >
            <Text style={[styles.text, fromMe ? styles.sentText : styles.receivedText]}>
                {text}
            </Text>
        </View>
    )
}

export default Message

const styles = StyleSheet.create({
    container: {
        padding: 12,
        borderRadius: 20,
        marginTop: 8,
        maxWidth: '80%',
    },
    sent: {
        alignSelf: 'flex-end',
        borderTopRightRadius: 0,
        backgroundColor: theme,
    },
    received: {
        borderTopLeftRadius: 0,
        alignSelf: 'flex-start',
        // backgroundColor: Colors.light.backgroundDimmed,
    },
    sentText: {
        color: Colors.dark.text,
    },
    receivedText: {},
    text: {},
})
