import React, { useState, useEffect, useLayoutEffect } from 'react'
import {
    KeyboardAvoidingView,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TextInput,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native'
import { Text, View } from '@components/Themed'
import useColorScheme from '@hooks/useColorScheme'
import Colors from '@constants/Colors'
import { theme } from '@constants/Colors'
import { createAvatar } from '@dicebear/avatars'
import * as style from '@dicebear/open-peeps'
import { SvgXml } from 'react-native-svg'
import { RegistrationStackProps } from '@routes/types'
import { useAuth } from '@context/AuthContext'
const AVATAR_SIZE = 100

const RegistrationScreen: React.FC<RegistrationStackProps<'Login'>> = ({ navigation }) => {
    const [email, setEmail] = useState('acc')
    const [name, setName] = useState('ass')
    const [displayName, setDisplayName] = useState('ass')
    const [password, setPassword] = useState('123456')
    const [error, setError] = useState('')
    const [avatar, setAvatar] = useState('')
    const [loading, setLoading] = useState(false)

    const { signup } = useAuth()

    const signupHandler = async () => {
        if (!loading) {
            setLoading(true)
            const err = await signup(email, password, name, displayName, avatar)
            console.log(err)
            if (err) {
                setError(err.message)
            }
            setLoading(false)
        }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [navigation])

    useEffect(() => {
        let svg = createAvatar(style, {
            seed: displayName,
            // scale: AVATAR_SIZE,
        })

        setAvatar(svg)
    }, [displayName])

    const colorScheme = useColorScheme()

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView>
                        <Text size='title' style={{ fontFamily: 'AvenirNext-UltraLight' }}>
                            {`Welcome to Chatter \nlets get started`}
                        </Text>
                        <Text>{error}</Text>
                        {avatar !== '' && (
                            <View style={styles.avatarContainer}>
                                <SvgXml xml={avatar} width='100pt' height='100pt' />
                            </View>
                        )}
                        <Text>Email</Text>
                        <TextInput
                            style={[
                                styles.input,
                                {
                                    backgroundColor: Colors[colorScheme].backgroundDimmed,
                                    color: Colors[colorScheme].text,
                                },
                            ]}
                            keyboardType='email-address'
                            onChangeText={setEmail}
                            value={email}
                            placeholder='e.g: john@doe.com'
                        />
                        <Text>Name</Text>
                        <TextInput
                            style={[
                                styles.input,
                                {
                                    backgroundColor: Colors[colorScheme].backgroundDimmed,
                                    color: Colors[colorScheme].text,
                                },
                            ]}
                            onChangeText={setName}
                            value={name}
                        />

                        <Text>Displayname</Text>
                        <TextInput
                            style={[
                                styles.input,
                                {
                                    backgroundColor: Colors[colorScheme].backgroundDimmed,
                                    color: Colors[colorScheme].text,
                                },
                            ]}
                            onChangeText={(text) =>
                                setDisplayName(
                                    text
                                        .substring(1)
                                        .trim()
                                        .split('')
                                        .filter((n) => n !== '')
                                        .join('')
                                )
                            }
                            value={'@' + displayName}
                        />

                        <Text>Password</Text>
                        <TextInput
                            style={[
                                styles.input,
                                {
                                    backgroundColor: Colors[colorScheme].backgroundDimmed,
                                    color: Colors[colorScheme].text,
                                },
                            ]}
                            onSubmitEditing={signupHandler}
                            onChangeText={setPassword}
                            value={password}
                            autoCorrect={false}
                            placeholder='e.g: pizza123'
                        />

                        <Pressable
                            style={styles.buttonContainer}
                            onPress={signupHandler}
                            disabled={loading}
                        >
                            <Text size='h4' style={{ textAlign: 'center' }}>
                                Sign Up
                            </Text>
                        </Pressable>
                        {loading && (
                            <View style={{ backgroundColor: 'pink', width: 40, height: 40 }}></View>
                        )}
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default RegistrationScreen

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 15,
        flex: 1,
    },
    avatarContainer: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
        borderRadius: 5,
        alignSelf: 'center',
        marginBottom: 16,
    },
    input: {
        marginBottom: 12,
        padding: 14,
        borderRadius: 16,
    },
    buttonContainer: {
        width: 220,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 12,
        backgroundColor: theme,
        textAlign: 'center',
        alignSelf: 'center',
        borderRadius: 9999,
    },
})
