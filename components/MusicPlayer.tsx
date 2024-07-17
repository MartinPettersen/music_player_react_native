import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import { Feather } from "@expo/vector-icons";

const MusicPlayer = () => {
  const [soundt, setSoundT] = useState<Audio.Sound | null>(null);
  const [playing, setPlaying] = useState<boolean>(false);
  const [position, setPosition] = useState<any | null>(0);

  async function playSound() {
    if (soundt === null) {

      const { sound } = await Audio.Sound.createAsync(
        require("../assets/alex-productions-cinematic-epic-emotional-eglair.mp3")
      );
      setSoundT(sound);
    } else {

      if (!playing) {
        const test = 50000;
        if (position) {
          console.log("test");
          await soundt.playFromPositionAsync(position);
        } else {
          await soundt.playAsync();
        }
      } else {
        const status = await soundt.getStatusAsync();
        if (status.isLoaded) {
          setPosition(status.positionMillis);
          console.log(status.positionMillis);
          await soundt.pauseAsync();
        }
        await soundt.pauseAsync();
      }
    }
    setPlaying(!playing);
  }

  useEffect(() => {
    return soundt
      ? () => {
          soundt.unloadAsync();
        }
      : undefined;
  }, [soundt]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={playSound}>
        <View style={[styles.flip, styles.icon]}>
          <Feather name={"fast-forward"} size={30} color={"black"} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={playSound}>
        <View style={styles.icon}>
          <Feather
            name={playing ? "pause" : "play"}
            size={30}
            color={"black"}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={playSound}>
        <View style={styles.icon}>
          <Feather name={"fast-forward"} size={30} color={"black"} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  flip: { transform: [{ scaleX: -1 }] },
  icon: {
    marginHorizontal: 18,
  },
});

export default MusicPlayer;
