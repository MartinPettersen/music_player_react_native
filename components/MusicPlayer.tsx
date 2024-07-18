import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Audio } from "expo-av";
import Bar from "./Bar";
import MenuButton from "./MenuButton";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";

const MusicPlayer = () => {
  const [soundt, setSoundT] = useState<Audio.Sound | null>(null);
  const [duration, setDuration] = useState<number | undefined>(0);
  const [playing, setPlaying] = useState<boolean>(false);
  const [position, setPosition] = useState<any | null>(0);
  const [musicFile, setMusicFile] = useState<string>(
    "../assets/alex-productions-cinematic-epic-emotional-eglair.mp3"
  );
  const [playList, setPlayList] = useState<string[]>([]);
  const [songName, setSongName] = useState<string>("");
  const [newSong, setNewSong] = useState<boolean>(false);

  const chooseFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      if (result.assets !== null) {
        const { uri } = result.assets[0];
        setSongName(result.assets[0].name);
        setMusicFile(uri);

        const { sound } = await Audio.Sound.createAsync({ uri: uri });
        setSoundT(sound);
        const status = await sound.getStatusAsync();
        if (status.isLoaded) {
          setDuration(status.playableDurationMillis);
          setPosition(status.positionMillis);
          if (playing) {
            setPlaying(false);
            setPlaying(true);

            await sound.playAsync();
  
          }
        }
        

        
      }
    } catch (error) {
      console.log(error);
    }

  };

  const createPlaylist = async (uri: string) => {
    const directoryUri = uri.substring(0, uri.lastIndexOf('/'));

    const files = await FileSystem.readDirectoryAsync(directoryUri);
    const audioFiles = files.filter(file => file.endsWith('.mp3') || file.endsWith('.m4a'));

    setPlayList(audioFiles.map(file => `${directoryUri}/${file}`));
  }

  async function playSound() {
    if (soundt === null || newSong == true) {
      const { sound } = await Audio.Sound.createAsync({ uri: musicFile });
      setSoundT(sound);
      const status = await sound.getStatusAsync();
      if (status.isLoaded) {
        setDuration(status.playableDurationMillis);
      }
      setNewSong(false);
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

  const updateTimer = async () => {
    const status = await soundt!.getStatusAsync();
    if (status.isLoaded) {
      setPosition(status.positionMillis);
    }
  };

  useEffect(() => {
    let timer: any;

    if (playing) {
      timer = setInterval(updateTimer, 66);
    } else {
      if (timer) {
        clearInterval(timer);
      }
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [playing]);

  useEffect(() => {
    return soundt
      ? () => {
          soundt.unloadAsync();
        }
      : undefined;
  }, [soundt]);

  return (
    <View style={styles.container}>
      <MenuButton icon={"folder"} styles={[styles.icon]} action={chooseFile} />
      <Text>{songName}</Text>
      <View style={styles.menu}>
        <MenuButton
          icon={"fast-forward"}
          styles={[styles.flip, styles.icon]}
          action={playSound}
        />
        <MenuButton
          icon={playing ? "pause" : "play"}
          styles={[styles.icon]}
          action={playSound}
        />
        <MenuButton
          icon={"fast-forward"}
          styles={[styles.icon]}
          action={playSound}
        />
      </View>
      {duration !== undefined ? (
        <Bar duration={duration} position={position} />
      ) : null}
      <Text>{playList.length}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
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
