import React from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import { Text } from '@components/Themed'
import Colors, { theme } from '@constants/Colors'
import { useAuth } from '@context/AuthContext'
import { SvgXml } from 'react-native-svg'

interface MessageProps {
    text: string
    fromMe?: boolean
    image?: string
}

const imageSize = 32

const Message: React.FC<MessageProps> = ({ text, fromMe, image }) => {
    const { currentUser } = useAuth()

    console.log(fromMe)

    if (!currentUser) return null
    return (
        <View style={[styles.outerWrapper, fromMe ? styles.alignRight : {}]}>
            {!fromMe && (
                <Pressable
                    style={[
                        styles.imageWrapper,
                        { backgroundColor: Colors.light.backgroundDimmed },
                    ]}
                >
                    <View style={[styles.image]}>
                        <SvgXml
                            xml={image || currentUser.profileImage}
                            width={imageSize + 'pt'}
                            height={imageSize + 'pt'}
                        />
                    </View>
                </Pressable>
            )}
            <View
                style={[
                    styles.container,
                    { backgroundColor: fromMe ? theme : Colors.light.backgroundDimmed },
                ]}
            >
                <Text style={fromMe && { color: '#fff' }}>{text}</Text>
            </View>
        </View>
    )
}

export default Message

const styles = StyleSheet.create({
    outerWrapper: {
        marginTop: 8,
        flexDirection: 'row',
    },
    alignRight: {
        alignSelf: 'flex-end',
    },
    container: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        maxWidth: '80%',
        borderRadius: 15,
        borderBottomLeftRadius: 0,
    },
    imageWrapper: {
        width: imageSize,
        height: imageSize,
        overflow: 'hidden',
        borderRadius: 50,
        flex: 0,
        marginRight: 8,
    },
    image: {
        overflow: 'hidden',
        backgroundColor: 'transparent',
    },
})

// #1 iMessage style
// container: {
//     padding: 14,
//     borderRadius: 20,
//     marginTop: 8,
//     maxWidth: '80%',
// },
// sent: {
//     alignSelf: 'flex-end',
//     borderTopRightRadius: 0,
//     backgroundColor: theme,
// },
// received: {
//     borderTopLeftRadius: 0,
//     alignSelf: 'flex-start',
// },
// sentText: {
//     color: Colors.dark.text,
// },

// #2 slack style
// import React from 'react'
// import { StyleSheet, Pressable } from 'react-native'
// import { Text, View } from '@components/Themed'
// import Colors, { theme } from '@constants/Colors'
// import { useAuth } from '@context/AuthContext'
// import { SvgXml } from 'react-native-svg'

// interface MessageProps {
//     text: string
//     fromMe?: boolean
//     image?: string
// }

// const Message: React.FC<MessageProps> = ({ text, fromMe, image }) => {
//     const { currentUser } = useAuth()
//     const imageSize = 50
//     if (!currentUser) return null
//     return (
//         <View style={styles.outerWrapper}>
//             <Pressable style={styles.imageWrapper}>
//                 <View style={[styles.image]}>
//                     <SvgXml
//                         xml={image || currentUser.profileImage}
//                         width={imageSize + 'pt'}
//                         height={imageSize + 'pt'}
//                     />
//                 </View>
//             </Pressable>

//             <View
//                 // background='backgroundDimmed'
//                 style={[styles.container]}
//             >
//                 <Text size='h5'>
//                     Matheus Mendes
//                     <View>
//                         <Text size='subtitle' style={{ paddingLeft: 8 }}>
//                             6:34PM
//                         </Text>
//                     </View>
//                 </Text>
//                 <Text>{text}</Text>
//             </View>
//         </View>
//     )
// }

// export default Message

// const styles = StyleSheet.create({
//     outerWrapper: {
//         marginTop: 8,
//         flexDirection: 'row',
//         // backgroundColor: '#d6d6d6',
//     },
//     container: {
//         paddingHorizontal: 8,
//         paddingVertical: 4,
//         maxWidth: '80%',
//     },
//     imageWrapper: {
//         width: 50,
//         height: 50,
//         flex: 0,
//     },
//     image: {
//         overflow: 'hidden',
//         backgroundColor: 'transparent',
//     },
// })
