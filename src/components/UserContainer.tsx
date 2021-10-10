import React from 'react'
import { View, Pressable, StyleSheet } from 'react-native'
import { useAuth } from '@context/AuthContext'
import { SvgXml } from 'react-native-svg'
import { Text } from '@components/Themed'
import { ChatStackParamList, ChatStackProps } from '@routes/types'
import Colors from '@constants/Colors'
import useColorScheme from '@hooks/useColorScheme'
import { fs } from '@src/firebase'

const imageSize = 50

interface UserContainerProps {
    name: string
    displayName: string
    profileImage: string
    id: string
    RightComponent?: React.FC
}

const UserContainer: React.FC<UserContainerProps> = ({
    name,
    displayName,
    profileImage,
    id,
    RightComponent,
}) => {
    const { currentUser } = useAuth()
    const colorSchema = useColorScheme()

    return (
        <View style={styles.container}>
            <View
                style={[
                    styles.imageWrapper,
                    { backgroundColor: Colors[colorSchema].backgroundDimmed },
                ]}
            >
                <SvgXml xml={profileImage} width={imageSize + 'pt'} height={imageSize + 'pt'} />
            </View>
            <View style={styles.textWrapper}>
                <Text size='h4' numberOfLines={1}>
                    {name}
                </Text>
                <Text numberOfLines={1}>@{displayName}</Text>
            </View>
            {RightComponent && <RightComponent />}
        </View>
    )
}

export default UserContainer

const styles = StyleSheet.create({
    container: {
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    imageWrapper: {
        width: 50,
        height: 50,
        flex: 0,
        borderRadius: 9999,
        overflow: 'hidden',
    },

    textWrapper: {
        padding: 10,
        flex: 1,
    },
    dateText: {
        paddingLeft: 10,
    },
})
