/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
        interface RegistrationParamList extends RegistrationStackParamList {}
        interface ChatParamList extends ChatStackParamList {}
    }
}

// registration routes
export type RegistrationStackParamList = {
    Login: undefined
    Signup: undefined
    ForgotPassword: undefined
}

export type RegistrationStackProps<T extends keyof RegistrationStackParamList> = {
    navigation: StackNavigationProp<RegistrationStackParamList, T>
    route: RouteProp<RegistrationStackParamList, T>
}

// root routes
export type RootStackParamList = {
    Root: NavigatorScreenParams<RootTabParamList> | undefined
    Modal: undefined
    UserModal: {
        id: string
    }
    NotFound: undefined
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
    RootStackParamList,
    Screen
>

export type RootTabParamList = {
    TabOne: undefined
    TabTwo: undefined
    ChatsStack: NavigatorScreenParams<ChatStackParamList> | undefined
    UserModal: {
        id: string
    }
}

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
>

// chat routes
export type ChatStackParamList = {
    Chat: {
        id: string
    }
    Chats: undefined
    UserModal: {
        id: string
    }
}

export type ChatStackProps<T extends keyof ChatStackParamList> = {
    navigation: StackNavigationProp<ChatStackParamList, T>
    route: RouteProp<ChatStackParamList, T>
}
