/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import * as React from 'react'
import { Text as DefaultText, View as DefaultView } from 'react-native'

import Colors from '@constants/Colors'
import useColorScheme from '@hooks/useColorScheme'
// 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle' | 'paragraph'
const TextSizes = {
    title: { size: 28, weight: '900' },
    h1: { size: 25, weight: '800' },
    h2: { size: 23, weight: '800' },
    h3: { size: 21, weight: '700' },
    h4: { size: 18, weight: '700' },
    h5: { size: 16, weight: '600' },
    h6: { size: 14, weight: '600' },
    paragraph: { size: 14, weight: 'normal' },
    subtitle: { size: 12, weight: '300' },
} as const

export type TextProps = DefaultText['props'] & {
    color?: keyof typeof Colors.light & keyof typeof Colors.dark
    size?: keyof typeof TextSizes
}
export type ViewProps = DefaultView['props'] & {
    background?: keyof typeof Colors.light & keyof typeof Colors.dark
}

export function Text(props: TextProps) {
    const { style, size = 'paragraph', color = 'text', ...otherProps } = props

    const theme = useColorScheme()

    return (
        <DefaultText
            style={[
                {
                    color: Colors[theme][color],
                    fontSize: TextSizes[size].size,
                    fontWeight: TextSizes[size].weight,
                },
                style,
            ]}
            {...otherProps}
        />
    )
}

export function View(props: ViewProps) {
    const { style, background = 'background', ...otherProps } = props

    const theme = useColorScheme()

    return (
        <DefaultView
            style={[{ backgroundColor: Colors[theme][background] }, style]}
            {...otherProps}
        />
    )
}
