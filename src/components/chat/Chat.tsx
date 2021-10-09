import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { useAuth } from '@context/AuthContext'
import { SvgXml } from 'react-native-svg'
import { Text, View } from '@components/Themed'
import { ChatStackParamList, ChatStackProps } from '@routes/types'
interface ChatProps {
    title: string
    enterChatHandler: () => void
    userPressHandler?: () => void
}

const Chat: React.FC<ChatProps> = ({ title, enterChatHandler, userPressHandler }) => {
    const { currentUser } = useAuth()
    const imageSize = 50
    if (!currentUser) return null
    return (
        <View>
            <Pressable style={styles.container} onPress={enterChatHandler}>
                <Pressable style={styles.imageWrapper} onPress={userPressHandler}>
                    <View style={[styles.image]}>
                        <SvgXml
                            xml={currentUser.profileImage}
                            width={imageSize + 'pt'}
                            height={imageSize + 'pt'}
                        />
                    </View>
                </Pressable>
                <View style={styles.textWrapper}>
                    <Text size='h5' style={styles.titleText} numberOfLines={2}>
                        {title}
                        <Text style={styles.dateText} size='subtitle'>
                            3h
                        </Text>
                    </Text>
                    <Text style={styles.messageText} numberOfLines={1}>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error animi
                        quisquam accusantium molestias autem magni impedit quidem excepturi, maxime
                        iste!
                    </Text>
                </View>
            </Pressable>
        </View>
    )
}

export default Chat

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
    },
    image: {
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

{
    /* <View style={[styles.image, { position: 'absolute', bottom: 0, right: 0 }]}>
<SvgXml
    xml={currentUser.profileImage}
    width={imageSize + 'pt'}
    height={imageSize + 'pt'}
/>
</View>
<View style={[styles.image, { position: 'absolute', bottom: 0, left: 0 }]}>
<SvgXml
    xml={currentUser.profileImage}
    width={imageSize + 'pt'}
    height={imageSize + 'pt'}
/>
</View>
<View style={[styles.image, { position: 'absolute', top: 0, left: 0 }]}>
<SvgXml
    xml={currentUser.profileImage}
    width={imageSize + 'pt'}
    height={imageSize + 'pt'}
/>
</View>
<View style={[styles.image, { position: 'absolute', top: 0, right: 0 }]}>
<SvgXml
    xml={currentUser.profileImage}
    width={imageSize + 'pt'}
    height={imageSize + 'pt'}
/> */
}
// </View>
