import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { useAuth } from '@context/AuthContext'
import { SvgXml } from 'react-native-svg'
import { Text, View } from '@components/Themed'
import { ChatStackParamList, ChatStackProps } from '@routes/types'
import Colors from '@constants/Colors'
import useColorScheme from '@hooks/useColorScheme'
const imageSize = 50

interface UserContainerProps {
    name: string
    displayName: string
    profileImage: string
}

const UserContainer: React.FC<UserContainerProps> = ({ name, displayName, profileImage }) => {
    const colorSchema = useColorScheme()
    return (
        <View>
            <Pressable style={styles.container}>
                <Pressable
                    style={[
                        styles.imageWrapper,
                        { backgroundColor: Colors[colorSchema].backgroundDimmed },
                    ]}
                >
                    <SvgXml xml={profileImage} width={imageSize + 'pt'} height={imageSize + 'pt'} />
                </Pressable>
                <View style={styles.textWrapper}>
                    <Text size='h4' style={styles.titleText} numberOfLines={2}>
                        {name}
                    </Text>
                    <Text style={styles.messageText} numberOfLines={1}>
                        @{displayName}
                    </Text>
                </View>
            </Pressable>
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
    titleText: {},
    dateText: {
        paddingLeft: 10,
    },
    messageText: {},
})
