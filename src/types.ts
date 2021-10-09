import firebase from 'firebase/app'
type User = {
    displayName: string
    profileImage: string
} & firebase.User

export { User }
