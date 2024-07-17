import { getTimeFormatted } from "@/hooks/useGetFormattedTime";
import React from "react";
import { View, Text, StyleSheet } from "react-native";


type Props = {
  duration: number;
  position: number;
};

const Bar = ({ duration, position }: Props) => {
  const rubrikk = duration / 100;

  return (
    <View style={styles.container}>
      <View style={styles.barContainer}>
        <View
          style={[styles.positionBar, { width: `${position / rubrikk}%` }]}
        />
        <View
          style={[
            styles.durationBar,
            { width: `${(duration - position) / rubrikk}%` },
          ]}
        />
      </View>
      <View style={styles.timerContainer}>
        <Text>{getTimeFormatted(position)}</Text>
        <Text>{getTimeFormatted(duration - position)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 18,
    width: "60%",
  },
  barContainer: {
    width: "100%",
    flexDirection: "row",
  },
  durationBar: {
    backgroundColor: "#52525b",
    height: 6,
  },
  positionBar: {
    backgroundColor: "#dc2626",
    height: 6,
  },
  timerContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
});

export default Bar;
