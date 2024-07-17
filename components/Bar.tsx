import React from 'react'
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  duration: number;
  position: number;
}

const Bar = ({duration, position}: Props) => {

  const getSeconds = (milliseconds: number) => {
    return Math.round(milliseconds / 1000);
  }

  const formattStartingZero = (timeUnit: number) => {

    if (timeUnit < 10 ) {
      return `0${timeUnit}`
    }
    return timeUnit
  }

  const getMinuttes = (seconds: number) => {
    console.log(seconds)
    const rest = seconds % 60
    console.log(rest)

    //`
    return `${formattStartingZero(Math.floor(seconds / 60))}:${formattStartingZero(rest)}`;
  }

  const getTimeFormatted = (milliseconds: number) => {


    return getMinuttes(getSeconds(milliseconds))

  }

  return (
    <View style={styles.container}>
      <Text>{getTimeFormatted(position)}|{getTimeFormatted(duration)}</Text>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 18,
  }
})

export default Bar