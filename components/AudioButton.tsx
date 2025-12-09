// components/AudioButton.tsx - SIN REBOBINADO LENTO
import { MaterialIcons } from "@expo/vector-icons";
import { Audio, AVPlaybackStatus } from "expo-av";
import React, { useEffect, useRef, useState } from "react";
import { TouchableOpacity } from "react-native";

// CACHE GLOBAL
const audioCache = new Map<string, Audio.Sound>();

interface AudioButtonProps {
  audioUrl: string;
  autoPlay?: boolean;
  onTiming?: (timing: { load: number; play: number }) => void;
}

export function AudioButton({ audioUrl, autoPlay = false, onTiming }: AudioButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const soundRef = useRef<Audio.Sound | null>(null);

  // Cargar audio
  useEffect(() => {
    let mounted = true;

    const loadAudio = async () => {
      const loadStart = Date.now();

      try {
        // Usar cache si existe
        if (audioCache.has(audioUrl)) {
          console.log(`✅ CACHE HIT: ${audioUrl.substring(0, 40)}...`);
          soundRef.current = audioCache.get(audioUrl)!;
          setIsLoaded(true);

          if (onTiming) onTiming({ load: 1, play: 0 });

          if (autoPlay && mounted) {
            await playAudio();
          }
          return;
        }

        console.log(`🔄 LOADING: ${audioUrl.substring(0, 40)}...`);

        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
        });

        const { sound } = await Audio.Sound.createAsync(
          { uri: audioUrl },
          { shouldPlay: false },
          onPlaybackStatusUpdate
        );

        soundRef.current = sound;
        audioCache.set(audioUrl, sound);

        if (mounted) {
          setIsLoaded(true);
          const loadTime = Date.now() - loadStart;
          if (onTiming) onTiming({ load: loadTime, play: 0 });

          if (autoPlay) {
            await playAudio();
          }
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    loadAudio();

    return () => {
      mounted = false;
    };
  }, [audioUrl]);

  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (!status.isLoaded) return;

    const wasPlaying = isPlaying;
    setIsPlaying(status.isPlaying);

    // 🚨 TRUCO: Detener al 90% para evitar "terminado"
    if (status.isPlaying && status.durationMillis) {
      const progress = status.positionMillis / status.durationMillis;

      if (progress >= 0.9 && !status.didJustFinish) {
        // Detener ANTES de que termine completamente
        setTimeout(async () => {
          if (soundRef.current) {
            await soundRef.current.stopAsync();
            await soundRef.current.setPositionAsync(0);
            setIsPlaying(false);
            console.log("⏹️ Detenido al 90% (evita rebobinado lento)");
          }
        }, 10);
      }
    }

    if (status.didJustFinish) {
      console.log("🏁 Terminó completamente (esto es lento para reiniciar)");
      setIsPlaying(false);
    }
  };

  const playAudio = async () => {
    if (!soundRef.current) return;

    const playStart = Date.now();

    try {
      const status = await soundRef.current.getStatusAsync();

      if (status.isLoaded) {
        if (status.isPlaying) {
          // Pausar si ya está reproduciendo
          await soundRef.current.pauseAsync();
          setIsPlaying(false);
        } else {
          // 🚨 IMPORTANTE: Solo rebobinar si está cerca del final
          // Si está al inicio o medio, play directamente
          const isNearEnd = status.durationMillis && status.positionMillis >= status.durationMillis * 0.9;

          if (isNearEnd) {
            console.log("🔁 Cerca del final, rebobinando...");
            await soundRef.current.setPositionAsync(0);
          }

          await soundRef.current.playAsync();
          setIsPlaying(true);

          const playTime = Date.now() - playStart;
          console.log(`▶️ Play: ${playTime}ms (${isNearEnd ? "rebobinado" : "directo"})`);

          if (onTiming) {
            onTiming({ load: 0, play: playTime });
          }
        }
      }
    } catch (error) {
      console.error("Play error:", error);
    }
  };

  const handlePress = async () => {
    await playAudio();
  };

  // Estado visual
  const getButtonStyle = () => {
    if (!isLoaded) {
      return { bg: "#CCCCCC", icon: "hourglass-empty", color: "#888" };
    }

    if (isPlaying) {
      return { bg: "#007AFF", icon: "pause", color: "white" };
    }

    // Verificar si el audio está cerca del final
    const isNearEnd = soundRef.current
      ? (async () => {
          try {
            const status = await soundRef.current!.getStatusAsync();
            return status.isLoaded && status.durationMillis && status.positionMillis >= status.durationMillis * 0.9;
          } catch {
            return false;
          }
        })()
      : Promise.resolve(false);

    // Esto es un ejemplo - en realidad necesitaríamos estado para esto
    return { bg: "#34C759", icon: "play-arrow", color: "white" };
  };

  const buttonStyle = getButtonStyle();

  if (!isLoaded) {
    return (
      <TouchableOpacity
        style={{
          padding: 12,
          backgroundColor: buttonStyle.bg,
          borderRadius: 20,
          opacity: 0.7,
        }}
        disabled
      >
        <MaterialIcons name={buttonStyle.icon as any} size={24} color={buttonStyle.color} />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        padding: 12,
        backgroundColor: buttonStyle.bg,
        borderRadius: 20,
      }}
    >
      <MaterialIcons name={buttonStyle.icon as any} size={24} color={buttonStyle.color} />
    </TouchableOpacity>
  );
}
