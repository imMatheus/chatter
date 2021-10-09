import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Button, Pressable, SafeAreaView, StyleSheet, TextInput } from 'react-native'
import { Text, View } from '@components/Themed'
import useColorScheme from '@hooks/useColorScheme'
import { theme } from '@constants/Colors'
import { createAvatar } from '@dicebear/avatars'
import * as style from '@dicebear/open-peeps'
import { SvgXml } from 'react-native-svg'
import { RegistrationStackProps } from '../routes/types'

const LoginScreen: React.FC<RegistrationStackProps<'Login'>> = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [avatar, setAvatar] = useState<any>('')

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [navigation])

    useEffect(() => {
        let svg = createAvatar(style, {
            seed: email,

            // ... and other options
        })

        setAvatar(svg)
    }, [email])

    const colorScheme = useColorScheme()

    return (
        <SafeAreaView>
            <Text size='title' style={{ fontFamily: 'AvenirNext-UltraLight' }}>
                Whats yor name
            </Text>
            {avatar !== '' ? (
                <SvgXml xml={avatar} width='100pt' height='100pt' />
            ) : (
                <Text>svg</Text>
            )}
            <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder='pika'
            />
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholder='pika'
            />
            <Pressable style={styles.buttonContainer}>
                <Text size='h4' style={{ textAlign: 'center' }}>
                    Login
                </Text>
            </Pressable>
            <Button
                title="Don't have an account? Create one"
                onPress={() => navigation.navigate('Signup')}
            />
        </SafeAreaView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: '#239999',
        color: 'red',
    },
    buttonContainer: {
        width: 220,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: theme,
        textAlign: 'center',
        alignSelf: 'center',
        borderRadius: 9999,
    },
})
