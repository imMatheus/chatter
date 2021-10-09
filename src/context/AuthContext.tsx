import React, { createContext, useContext, useState, useEffect } from 'react'
import firebase from 'firebase/app'
import { auth, fs } from '@src/firebase'
import { User } from '@src/types'
import getNameCombinations from '../utils/getNameCombinations'

type errorTypes = 'email' | 'password' | 'name' | 'displayName' | 'image' | 'server'

async function signup(
    email: string,
    password: string,
    name: string,
    displayName: string,
    imageUrl: string | ArrayBuffer
): Promise<{ message: string; type: errorTypes } | null> {
    const usersNamesRef = fs.collection('users').where('displayName', '==', displayName)
    const doc: firebase.firestore.DocumentData = await usersNamesRef.get()
    if (doc.exists) {
        // checking if the display name already exist
        return { message: 'Display name already exist', type: 'displayName' }
    }

    if (displayName.trim().length < 2) {
        return { message: 'Display name must be 2 or more characters long', type: 'displayName' }
    }

    if (!imageUrl) {
        return { message: 'Please pick a profile image.', type: 'image' }
    }

    if (password?.length < 6) {
        return { message: 'Password has to be 6 or more characters', type: 'password' }
    }
    if (!name) {
        return { message: 'Please provide a name', type: 'name' }
    }

    try {
        await auth.createUserWithEmailAndPassword(email, password)
        const disassembledDisplayName = getNameCombinations(displayName)
        console.log('---------------------------------------')

        console.log(disassembledDisplayName)

        await fs // firestore
            .collection('users')
            .doc(auth.currentUser!.uid) // adding a doc with the the id of the users uid
            .set({
                displayName: displayName,
                disassembledDisplayName: disassembledDisplayName,
                email: email,
                name: name,
                userUID: auth.currentUser?.uid,
                profileImage: imageUrl,
            }) // setting its info
    } catch (error: any & firebase.auth.Error) {
        console.log(error.message)
        console.log(error.code)

        return {
            message: error.message,
            type: error.code === 'auth/invalid-email' ? 'email' : 'server',
        }
    }
    return null
}
function login(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return auth.signInWithEmailAndPassword(email, password)
}
async function logout() {
    await auth.signOut()
}
async function resetPassword(email: string) {
    try {
        await auth.sendPasswordResetEmail(email)
    } catch (error: any) {
        return error.message
    }
}
interface Context {
    currentUser: User | null
    fetchingUser: boolean
    logout: () => Promise<void>
    login: (email: string, password: string) => Promise<firebase.auth.UserCredential>
    signup: (
        email: string,
        password: string,
        name: string,
        displayName: string,
        imageUrl: string | ArrayBuffer
    ) => Promise<{ message: string; type: errorTypes } | null>
    resetPassword: (email: string) => Promise<unknown>
}

const AuthContext = createContext<Context>({
    currentUser: null,
    logout,
    fetchingUser: false,
    login,
    signup,
    resetPassword,
})

export function useAuth() {
    return useContext(AuthContext)
}

export const AuthProvider: React.FC = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const [fetchingUser, setFetchingUser] = useState(false)

    useEffect(() => {
        setFetchingUser(true)
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            const fetchUser = async (user: firebase.User | any) => {
                if (!user) return null
                // getting the users data from firestore
                const response = fs.collection('users').doc(user.uid)
                const data = await response.get()
                console.log('data', data.data())

                return { ...user, ...data.data() }
            }
            const response = await fetchUser(user)
            console.log('response', response)

            setCurrentUser(response)
            setFetchingUser(false)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        fetchingUser,
        logout,
        login,
        signup,
        resetPassword,
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
