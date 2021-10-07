import React, { useState } from 'react'
import { StyleSheet, View, TextInput } from 'react-native'
import { Text } from '@components/Themed'
interface LoginScreenProps {}

const LoginScreen: React.FC<LoginScreenProps> = () => {
    const [text, onChangeText] = useState('Useless Text')

    return (
        <View>
            <Text>Hello world</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                placeholder='pika'
            />
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
})
