import firebase from 'firebase/app'
type User = {
    displayName: string
} & firebase.User

export { User }
