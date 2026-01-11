"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface AudioAnalyzerReturn {
  audioLevel: number;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  play: () => Promise<void>;
  pause: () => void;
  toggle: () => Promise<void>;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  load: (src: string) => void;
}

export function useAudioAnalyzer(): AudioAnalyzerReturn {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyzerRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const animationFrameRef = useRef<number>(0);

  const [audioLevel, setAudioLevel] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const initAudioContext = useCallback(() => {
    if (!audioRef.current || audioContextRef.current) return;

    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioContextRef.current = new AudioContextClass();
    analyzerRef.current = audioContextRef.current.createAnalyser();
    analyzerRef.current.fftSize = 256;
    analyzerRef.current.smoothingTimeConstant = 0.8;

    sourceRef.current = audioContextRef.current.createMediaElementSource(audioRef.current);
    sourceRef.current.connect(analyzerRef.current);
    analyzerRef.current.connect(audioContextRef.current.destination);
  }, []);

  const analyzeAudio = useCallback(() => {
    if (!analyzerRef.current) {
      animationFrameRef.current = requestAnimationFrame(analyzeAudio);
      return;
    }

    const dataArray = new Uint8Array(analyzerRef.current.frequencyBinCount);
    analyzerRef.current.getByteFrequencyData(dataArray);

    const average = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
    const normalizedLevel = Math.min(average / 128, 1);
    setAudioLevel(normalizedLevel);

    animationFrameRef.current = requestAnimationFrame(analyzeAudio);
  }, []);

  const load = useCallback((src: string) => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.crossOrigin = "anonymous";
      
      audioRef.current.addEventListener("timeupdate", () => {
        setCurrentTime(audioRef.current?.currentTime || 0);
      });
      
      audioRef.current.addEventListener("loadedmetadata", () => {
        setDuration(audioRef.current?.duration || 0);
      });
      
      audioRef.current.addEventListener("ended", () => {
        setIsPlaying(false);
        setAudioLevel(0);
      });
      
      audioRef.current.addEventListener("play", () => setIsPlaying(true));
      audioRef.current.addEventListener("pause", () => setIsPlaying(false));
    }

    audioRef.current.src = src;
    audioRef.current.load();
  }, []);

  const play = useCallback(async () => {
    if (!audioRef.current) return;
    
    initAudioContext();
    
    if (audioContextRef.current?.state === "suspended") {
      await audioContextRef.current.resume();
    }
    
    await audioRef.current.play();
    analyzeAudio();
  }, [initAudioContext, analyzeAudio]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    cancelAnimationFrame(animationFrameRef.current);
    setAudioLevel(0);
  }, []);

  const toggle = useCallback(async () => {
    if (isPlaying) {
      pause();
    } else {
      await play();
    }
  }, [isPlaying, play, pause]);

  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  }, []);

  const setVolume = useCallback((volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, volume));
    }
  }, []);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      audioRef.current?.pause();
      audioContextRef.current?.close();
    };
  }, []);

  return {
    audioLevel,
    isPlaying,
    currentTime,
    duration,
    play,
    pause,
    toggle,
    seek,
    setVolume,
    load,
  };
}
