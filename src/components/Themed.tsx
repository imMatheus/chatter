/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import * as React from 'react'
import { Text as DefaultText, View as DefaultView } from 'react-native'

import Colors from '@constants/Colors'
import useColorScheme from '@hooks/useColorScheme'

export type TextProps = DefaultText['props'] & {
    color?: keyof typeof Colors.light & keyof typeof Colors.dark
}
export type ViewProps = DefaultView['props'] & {
    background?: keyof typeof Colors.light & keyof typeof Colors.dark
}

export function Text(props: TextProps) {
    const { style, color = 'text', ...otherProps } = props

    const theme = useColorScheme()

    return <DefaultText style={[{ color: Colors[theme][color] }, style]} {...otherProps} />
}

export function View(props: ViewProps) {
    const { style, background = 'background', ...otherProps } = props

    const theme = useColorScheme()
    console.log('~~~~')
    console.log(Colors[theme][background])

    return (
        <DefaultView
            style={[{ backgroundColor: Colors[theme][background] }, style]}
            {...otherProps}
        />
    )
}
