#!/usr/bin/env python3

import math
import struct
import wave
from pathlib import Path


SAMPLE_RATE = 22050
MASTER_GAIN = 0.48


TRACKS = [
    {
        "filename": "salsa-basic-1.wav",
        "style": "salsa",
        "bpm": 85,
        "cycles": 5,
        "lead_in_ms": 1600,
        "root": 196.0,
    },
    {
        "filename": "salsa-basic-2.wav",
        "style": "salsa",
        "bpm": 92,
        "cycles": 5,
        "lead_in_ms": 1500,
        "root": 207.65,
    },
    {
        "filename": "salsa-midtempo.wav",
        "style": "salsa",
        "bpm": 105,
        "cycles": 6,
        "lead_in_ms": 1450,
        "root": 220.0,
    },
    {
        "filename": "bachata-basic-1.wav",
        "style": "bachata",
        "bpm": 110,
        "cycles": 5,
        "lead_in_ms": 1400,
        "root": 174.61,
    },
    {
        "filename": "bachata-basic-2.wav",
        "style": "bachata",
        "bpm": 118,
        "cycles": 5,
        "lead_in_ms": 1350,
        "root": 185.0,
    },
    {
        "filename": "bachata-midtempo.wav",
        "style": "bachata",
        "bpm": 125,
        "cycles": 6,
        "lead_in_ms": 1300,
        "root": 196.0,
    },
]


def clamp(sample: float) -> int:
    return max(-32767, min(32767, int(sample * 32767)))


def add_sine(buffer, start_index, duration_seconds, frequency, amplitude, decay=5.5):
    sample_count = int(duration_seconds * SAMPLE_RATE)
    for index in range(sample_count):
        target_index = start_index + index
        if target_index >= len(buffer):
            break

        t = index / SAMPLE_RATE
        envelope = math.exp(-decay * t)
        value = math.sin(2 * math.pi * frequency * t)
        overtone = 0.35 * math.sin(2 * math.pi * frequency * 2 * t)
        buffer[target_index] += amplitude * envelope * (value + overtone)


def add_click(buffer, start_index, duration_seconds, amplitude, brightness):
    sample_count = int(duration_seconds * SAMPLE_RATE)
    for index in range(sample_count):
        target_index = start_index + index
        if target_index >= len(buffer):
            break

        t = index / SAMPLE_RATE
        envelope = math.exp(-18 * t)
        tone = math.sin(2 * math.pi * brightness * t)
        overtone = 0.55 * math.sin(2 * math.pi * brightness * 2.3 * t)
        buffer[target_index] += amplitude * envelope * (tone + overtone)


def add_hat(buffer, start_index, duration_seconds, amplitude):
    sample_count = int(duration_seconds * SAMPLE_RATE)
    for index in range(sample_count):
        target_index = start_index + index
        if target_index >= len(buffer):
            break

        t = index / SAMPLE_RATE
        noise = math.sin(index * 12.9898) * math.sin(index * 78.233)
        envelope = math.exp(-32 * t)
        buffer[target_index] += amplitude * envelope * noise


def add_pad(buffer, duration_seconds, frequency, amplitude):
    sample_count = int(duration_seconds * SAMPLE_RATE)
    for index in range(sample_count):
        if index >= len(buffer):
            break

        t = index / SAMPLE_RATE
        slow_fade = 0.9 + 0.1 * math.sin(2 * math.pi * 0.12 * t)
        value = (
            math.sin(2 * math.pi * frequency * t)
            + 0.5 * math.sin(2 * math.pi * frequency * 1.5 * t)
            + 0.35 * math.sin(2 * math.pi * frequency * 2 * t)
        )
        buffer[index] += amplitude * slow_fade * value


def add_salsa_arrangement(buffer, beat_ms, lead_in_ms, cycles, root_frequency):
    cycle_length_beats = 8
    clave_offsets = [0, 1.5, 3, 4.5, 6]

    add_pad(buffer, len(buffer) / SAMPLE_RATE, root_frequency / 2, 0.018)

    total_beats = cycles * cycle_length_beats
    for beat_index in range(total_beats):
        cycle_position = beat_index % cycle_length_beats
        time_ms = lead_in_ms + beat_index * beat_ms
        start_index = int(time_ms / 1000 * SAMPLE_RATE)

        add_click(
            buffer,
            start_index,
            0.085,
            0.22 if cycle_position == 0 else 0.12,
            1150 if cycle_position == 0 else 920,
        )

        if cycle_position in {0, 4}:
            add_sine(
                buffer,
                start_index,
                0.22,
                root_frequency if cycle_position == 0 else root_frequency * 1.12,
                0.24 if cycle_position == 0 else 0.18,
                7.2,
            )

        if cycle_position in {1, 2, 5, 6}:
            add_click(buffer, start_index, 0.06, 0.08, 680)

        eighth_index = int((time_ms + beat_ms / 2) / 1000 * SAMPLE_RATE)
        add_hat(buffer, eighth_index, 0.03, 0.016)

    for cycle in range(cycles):
        cycle_start_ms = lead_in_ms + cycle * cycle_length_beats * beat_ms
        for offset in clave_offsets:
            start_index = int((cycle_start_ms + offset * beat_ms) / 1000 * SAMPLE_RATE)
            add_click(buffer, start_index, 0.045, 0.14, 1550)


def add_bachata_arrangement(buffer, beat_ms, lead_in_ms, cycles, root_frequency):
    cycle_length_beats = 8

    add_pad(buffer, len(buffer) / SAMPLE_RATE, root_frequency / 2, 0.015)

    total_beats = cycles * cycle_length_beats
    for beat_index in range(total_beats):
        cycle_position = beat_index % cycle_length_beats
        time_ms = lead_in_ms + beat_index * beat_ms
        start_index = int(time_ms / 1000 * SAMPLE_RATE)

        chord_frequency = root_frequency * (1.0 if cycle_position < 4 else 1.18)
        add_click(
            buffer,
            start_index,
            0.08,
            0.2 if cycle_position in {0, 4} else 0.12,
            980 if cycle_position not in {3, 7} else 1350,
        )
        add_sine(buffer, start_index, 0.16, chord_frequency, 0.1, 9)

        if cycle_position in {0, 4}:
            add_sine(buffer, start_index, 0.24, root_frequency / 2, 0.18, 8)

        if cycle_position in {3, 7}:
            add_click(buffer, start_index, 0.06, 0.16, 1750)

        sixteenth_index = int((time_ms + beat_ms * 0.5) / 1000 * SAMPLE_RATE)
        add_hat(buffer, sixteenth_index, 0.025, 0.012)


def render_track(output_path: Path, config):
    beat_ms = 60000 / config["bpm"]
    duration_ms = config["lead_in_ms"] + config["cycles"] * 8 * beat_ms + 2000
    total_samples = int(duration_ms / 1000 * SAMPLE_RATE)
    buffer = [0.0] * total_samples

    if config["style"] == "salsa":
        add_salsa_arrangement(
            buffer,
            beat_ms,
            config["lead_in_ms"],
            config["cycles"],
            config["root"],
        )
    else:
        add_bachata_arrangement(
            buffer,
            beat_ms,
            config["lead_in_ms"],
            config["cycles"],
            config["root"],
        )

    samples = bytearray()
    for sample in buffer:
        samples.extend(struct.pack("<h", clamp(sample * MASTER_GAIN)))

    with wave.open(str(output_path), "wb") as wav_file:
        wav_file.setnchannels(1)
        wav_file.setsampwidth(2)
        wav_file.setframerate(SAMPLE_RATE)
        wav_file.writeframes(samples)


def main():
    project_root = Path(__file__).resolve().parents[1]
    practice_dir = project_root / "app" / "assets" / "practice"
    practice_dir.mkdir(parents=True, exist_ok=True)

    for track in TRACKS:
        render_track(practice_dir / track["filename"], track)


if __name__ == "__main__":
    main()
