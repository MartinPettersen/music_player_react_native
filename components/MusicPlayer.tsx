import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import { Feather } from "@expo/vector-icons";
import Bar from "./Bar";

const MusicPlayer = () => {
  const [soundt, setSoundT] = useState<Audio.Sound | null>(null);
  const [duration, setDuration] = useState<number | undefined>(0);
  const [playing, setPlaying] = useState<boolean>(false);
  const [position, setPosition] = useState<any | null>(0);

  async function playSound() {
    if (soundt === null) {
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/alex-productions-cinematic-epic-emotional-eglair.mp3")
      );
      setSoundT(sound);
      const status = await sound.getStatusAsync();
      if (status.isLoaded) {
        setDuration(status.playableDurationMillis);
      }
      await sound.playAsync();
    } else {
      if (!playing) {
        if (position) {
          await soundt.playFromPositionAsync(position);
        } else {
          await soundt.playAsync();
        }
      } else {
        const status = await soundt.getStatusAsync();
        if (status.isLoaded) {
          setPosition(status.positionMillis);

          await soundt.pauseAsync();
        }
        await soundt.pauseAsync();
      }
    }
    setPlaying(!playing);
  }

  const updateTimer = async() => {
    const status = await soundt!.getStatusAsync();
    if (status.isLoaded) {
      setPosition(status.positionMillis);
    }

  }

  useEffect(() => {
    let timer: any;
    
    if (playing) {
      timer = setInterval(updateTimer, 66)
    } else {
      if (timer) {
        clearInterval(timer)
      }
    } 

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  },[playing])
  
  
  useEffect(() => {
    return soundt
      ? () => {
          soundt.unloadAsync();
        }
      : undefined;
  }, [soundt]);

  return (
    <View style={styles.container}>
      <View style={styles.menu}>
        <TouchableOpacity onPress={playSound}>
          <View style={[styles.flip, styles.icon]}>
            <Feather name={"fast-forward"} size={30} color={"#52525b"} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={playSound}>
          <View style={styles.icon}>
            <Feather
              name={playing ? "pause" : "play"}
              size={30}
              color={"#52525b"}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={playSound}>
          <View style={styles.icon}>
            <Feather name={"fast-forward"} size={30} color={"#52525b"} />
          </View>
        </TouchableOpacity>
      </View>
      {duration !== undefined ? (
        <Bar duration={duration} position={position} />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  },
  menu: {
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
