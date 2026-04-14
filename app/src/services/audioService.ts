import {
  RecordingPresets,
  createAudioPlayer,
  setAudioModeAsync,
  setIsAudioActiveAsync,
  type AudioPlayer,
  type AudioRecorder,
} from 'expo-audio';
import AudioModule from 'expo-audio/build/AudioModule';

export type MeteringSample = {
  metering: number;
  timeMs: number;
};

const cueBeepUri =
  'data:audio/wav;base64,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';

const defaultMode = {
  allowsRecording: false,
  playsInSilentMode: true,
  shouldPlayInBackground: false,
} as const;

const recordingMode = {
  ...defaultMode,
  allowsRecording: true,
} as const;

let cuePlayer: AudioPlayer | null = null;
let practicePlayer: AudioPlayer | null = null;
let recorder: AudioRecorder | null = null;
let audioPrepared = false;

async function activateAudio(mode: typeof defaultMode | typeof recordingMode) {
  await setAudioModeAsync(mode);
  await setIsAudioActiveAsync(true);
  audioPrepared = true;
}

async function ensureCuePlayer() {
  if (!audioPrepared) {
    await activateAudio(defaultMode);
  }

  if (!cuePlayer) {
    cuePlayer = createAudioPlayer(cueBeepUri, {
      keepAudioSessionActive: true,
      updateInterval: 40,
    });
  }

  return cuePlayer;
}

async function ensurePracticePlayer(source?: number) {
  if (!audioPrepared) {
    await activateAudio(defaultMode);
  }

  if (!practicePlayer) {
    practicePlayer = createAudioPlayer(source ?? null, {
      keepAudioSessionActive: true,
      updateInterval: 40,
    });
  } else if (typeof source === 'number') {
    practicePlayer.replace(source);
  }

  return practicePlayer;
}

function createRecorder() {
  return new AudioModule.AudioRecorder({
    ...RecordingPresets.HIGH_QUALITY,
    isMeteringEnabled: true,
    numberOfChannels: 1,
    sampleRate: 44100,
  });
}

export async function playCueBeep(isAccentBeat: boolean) {
  try {
    await activateAudio(defaultMode);
    const player = await ensureCuePlayer();
    player.volume = isAccentBeat ? 1 : 0.72;
    await player.seekTo(0);
    player.play();
  } catch {
    return null;
  }

  return null;
}

export async function playPracticeTrack(source: number) {
  await stopRecordingCapture();
  await activateAudio(defaultMode);
  const player = await ensurePracticePlayer(source);

  player.loop = false;
  player.volume = 1;
  await player.seekTo(0);
  player.play();

  return player;
}

export function getPracticePlaybackPositionMs() {
  if (!practicePlayer) {
    return 0;
  }

  return Math.max(0, Math.round(practicePlayer.currentTime * 1000));
}

export function isPracticeTrackPlaying() {
  return Boolean(practicePlayer?.playing);
}

export async function stopPracticeTrack(resetPosition: boolean = true) {
  try {
    practicePlayer?.pause();

    if (resetPosition && practicePlayer) {
      await practicePlayer.seekTo(0);
    }
  } catch {
    return null;
  }

  return null;
}

export async function captureMeteringWindow(durationMs: number, sampleIntervalMs: number = 40) {
  await stopPracticeTrack(false);
  await activateAudio(recordingMode);

  const nextRecorder = createRecorder();
  recorder = nextRecorder;

  await nextRecorder.prepareToRecordAsync();
  nextRecorder.record();

  const startedAt = Date.now();
  const samples: MeteringSample[] = [];

  return await new Promise<MeteringSample[]>((resolve, reject) => {
    const sampleInterval = setInterval(() => {
      const status = nextRecorder.getStatus();
      samples.push({
        metering: status.metering ?? -160,
        timeMs: Date.now() - startedAt,
      });
    }, sampleIntervalMs);

    const finish = async () => {
      clearInterval(sampleInterval);

      try {
        await nextRecorder.stop();
      } catch {
        // Ignore stop failures when the recorder already stopped.
      } finally {
        if (recorder?.id === nextRecorder.id) {
          recorder = null;
        }
      }

      if (samples.length === 0) {
        reject(new Error('No microphone data captured.'));
        return;
      }

      resolve(samples);
    };

    const timeout = setTimeout(() => {
      clearTimeout(timeout);
      void finish();
    }, durationMs);
  });
}

export async function stopRecordingCapture() {
  if (!recorder) {
    return null;
  }

  try {
    await recorder.stop();
  } catch {
    return null;
  } finally {
    recorder = null;
  }

  return null;
}

export async function stopAudioSession() {
  try {
    await stopRecordingCapture();
    cuePlayer?.pause();
    practicePlayer?.pause();
    if (practicePlayer) {
      await practicePlayer.seekTo(0);
    }
    await setIsAudioActiveAsync(false);
    audioPrepared = false;
  } catch {
    return null;
  }

  return null;
}
