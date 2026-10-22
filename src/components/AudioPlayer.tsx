"use client";

import React, { useState, useEffect, useRef } from "react";
import { Music, VolumeX, Sparkles } from "lucide-react";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const isPlayingRef = useRef(false);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  // Play a soft, beautiful classical romantic harp/piano sequence
  const startRomanticMelody = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      isPlayingRef.current = true;
      setIsPlaying(true);

      // Romantic chord notes (frequencies in Hz): Canon / romantic harp cadence
      // Dmaj -> Amaj -> Bmin -> F#min -> Gmaj -> Dmaj -> Gmaj -> Amaj
      const progression = [
        [293.66, 369.99, 440.0, 587.33], // D4, F#4, A4, D5
        [220.00, 329.63, 440.0, 554.37], // A3, E4, A4, C#5
        [246.94, 293.66, 369.99, 493.88], // B3, D4, F#4, B4
        [185.00, 277.18, 369.99, 440.00], // F#3, C#4, F#4, A4
        [196.00, 293.66, 392.00, 493.88], // G3, D4, G4, B4
        [220.00, 277.18, 329.63, 440.00], // A3, C#4, E4, A4
      ];

      let chordIdx = 0;
      let noteIdx = 0;

      const playNextNote = () => {
        if (!isPlayingRef.current || !ctx) return;

        const currentChord = progression[chordIdx];
        const freq = currentChord[noteIdx];

        // Synthesize gentle harp / bell chime
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Warm sine wave with subtle triangle warmth
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const now = ctx.currentTime;
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.045, now + 0.08); // soft gentle attack
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8); // dreamy lingering decay

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 2.0);

        noteIdx++;
        if (noteIdx >= currentChord.length) {
          noteIdx = 0;
          chordIdx = (chordIdx + 1) % progression.length;
        }

        timeoutIdRef.current = setTimeout(playNextNote, 420);
      };

      playNextNote();
    } catch (e) {
      console.warn("Audio playback not supported or blocked", e);
    }
  };

  const stopMelody = () => {
    isPlayingRef.current = false;
    setIsPlaying(false);
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      stopMelody();
    } else {
      startRomanticMelody();
    }
  };

  useEffect(() => {
    return () => {
      isPlayingRef.current = false;
      if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Soundwaves or playing text */}
      {isPlaying && (
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-noir-900/90 border border-gold-500/40 backdrop-blur-md shadow-lg shadow-gold-500/10 text-xs text-gold-300 animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          <span>Playing Romantic Waltz</span>
          <span className="flex items-end gap-0.5 h-3">
            <span className="w-0.5 h-2 bg-gold-400 animate-pulse" />
            <span className="w-0.5 h-3 bg-gold-400 animate-pulse delay-75" />
            <span className="w-0.5 h-1.5 bg-gold-400 animate-pulse delay-150" />
          </span>
        </div>
      )}

      {/* Button widget */}
      <button
        onClick={toggleMusic}
        title={isPlaying ? "Pause Ambient Music" : "Play Romantic Music"}
        className={`group relative flex items-center justify-center w-12 h-12 rounded-full border transition-all duration-500 shadow-xl ${
          isPlaying
            ? "bg-gold-500/20 border-gold-400 shadow-gold-500/20 text-gold-300"
            : "bg-noir-800/80 border-gold-500/30 hover:border-gold-400 text-gold-400 hover:text-gold-200"
        } backdrop-blur-md`}
      >
        {isPlaying ? (
          <div className="relative flex items-center justify-center">
            <Music className="w-5 h-5 animate-spin-slow text-gold-400" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
        ) : (
          <div className="relative flex items-center justify-center">
            <VolumeX className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </div>
        )}
      </button>
    </div>
  );
}
