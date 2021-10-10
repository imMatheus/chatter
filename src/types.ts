import firebase from 'firebase/app'
type User = {
    displayName: string
    name: string
    profileImage: string
    uid: string
} & firebase.User

type Friend = {
    displayName: string
    name: string
    profileImage: string
    uid: string
}

type Message = {
    text: string
    createdAt: Date
    seenBy: string[]
    authorId: string
}

type ChatRoom = {
    participants: string[]
    messages: Message[]
} & firebase.User

export { User, Friend, Message, ChatRoom }
