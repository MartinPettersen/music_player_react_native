import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Audio } from "expo-av";
import { Feather } from "@expo/vector-icons";

const MusicPlayer = () => {
  const [sound, setSound] = useState<Audio.Sound | null>();
  const [playing, setPlaying] = useState<boolean>(false);

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/alex-productions-cinematic-epic-emotional-eglair.mp3")
    );
    setSound(sound);
    if (!playing) {
        await sound.playAsync();
    } else {
        await sound.pauseAsync()
    }
    setPlaying(!playing);
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={playSound}>
        <Feather
          name={playing? "pause": "play"}
          size={25}
          color={"black"}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MusicPlayer;
