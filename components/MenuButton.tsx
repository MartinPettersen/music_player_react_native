import { Feather } from '@expo/vector-icons'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
type FeatherIconName = keyof typeof Feather.glyphMap

type Props = {
    styles: any[],
    action: () => void,
    icon: FeatherIconName
}

const MenuButton = ({styles, action, icon}: Props) => {
  return (
    <TouchableOpacity onPress={action}>
    <View style={[...styles]}>
      <Feather name={icon} size={30} color={"#52525b"} />
    </View>
  </TouchableOpacity>
  )
}

export default MenuButton