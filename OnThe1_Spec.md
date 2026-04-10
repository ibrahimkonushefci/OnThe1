# OnThe1 - Codex Build Specification

## 1. Role and Working Rules

You are building **OnThe1**, an iOS-first mobile app for beginner social dancers.

The purpose of the app is simple:

- listen to live music
- estimate whether the track is **Salsa** or **Bachata**
- estimate the **BPM**
- find the likely **"1"**
- give the dancer a clear start cue using **beep + vibration**
- optionally continue counting after the cue

This is a beginner-focused app. The product must feel simple, fast, and useful in noisy real-world dance environments.

### Critical working rule
**Do not build the full app in one go.**

Build the app in **strict phases**. After each phase:

1. stop coding
2. summarize what was completed
3. list the files created or changed
4. explain exactly how to test that phase
5. list known limitations
6. wait for the user to confirm before moving to the next phase

Do not move to the next phase unless explicitly told to continue.

### Product quality rules
- Keep the UI clean and minimal.
- Do not invent extra screens or features.
- Do not add sign-in in version 1.
- Do not add monetization in version 1.
- Do not add history or saved settings in version 1.
- Do not add Merengue in version 1.
- Do not build a complex backend in version 1.
- Keep the code modular so authentication, subscriptions, and remote content can be added later.
- Use stubs first for detection logic before any real API integration.
- Make the app feel reliable even if the audio analysis is still a stub.

---

## 2. Product Summary

**App name:** OnThe1

**Target user:** beginner Salsa and Bachata dancers

**Main promise:** OnThe1 helps a dancer hear when to start by finding the likely "1" and signaling it clearly.

### Version 1 includes
1. **Detect**
   - live listening screen
   - estimated genre: Salsa or Bachata
   - estimated BPM
   - likely "1" cue
   - beep + vibration signal
   - optional continuous counting

2. **Practice**
   - Quick Count mode for beginner practice
   - Find the 1 trainer using bundled local practice tracks
   - scoring and feedback

3. **Learn**
   - short static beginner tips
   - no video library
   - no backend content

### Version 1 does not include
- sign-in
- profile tab
- cloud sync
- subscriptions
- saved history
- saved preferences
- Merengue
- video tutorials
- instrument isolation
- advanced AI features beyond genre/BPM/"1" estimation

---

## 3. Tech Stack

Use the following stack unless there is a hard blocker:

- **Framework:** React Native with Expo
- **Language:** TypeScript
- **Navigation:** React Navigation
- **State management:** simple local state first, with a lightweight global store only where truly useful
- **Audio:** Expo audio APIs for playback and recording
- **Haptics:** expo-haptics
- **Styling:** StyleSheet or NativeWind, but choose one and stay consistent
- **Animations:** keep lightweight and native-friendly
- **Testing approach:** manual phase-by-phase testing plus simple unit tests where useful

### Future-ready but not for version 1
- Firebase or another backend can be added later
- auth architecture should be easy to add later
- premium gating should be easy to add later
- content management can be added later

Do not set up Firebase in the first version unless explicitly requested later.

---

## 4. Architecture Rules

### 4.1 General rules
- Separate UI, business logic, and device/service logic.
- Put audio-related helpers in a dedicated folder.
- Put detection-related functions in a dedicated API/service layer.
- Keep reusable UI components in a dedicated components folder.
- Keep feature folders clear and small.

### 4.2 Suggested folder structure
Use something close to this:

```txt
/src
  /api
    detection.ts
  /components
    PrimaryButton.tsx
    ToggleRow.tsx
    StatusCard.tsx
    ResultCard.tsx
    CountDisplay.tsx
    TempoSlider.tsx
    TrackCard.tsx
    ScoreBadge.tsx
    TipCard.tsx
  /constants
    colors.ts
    typography.ts
    spacing.ts
    copy.ts
  /features
    /detect
      DetectScreen.tsx
      useDetectController.ts
      detect.types.ts
    /practice
      PracticeHomeScreen.tsx
      QuickCountScreen.tsx
      FindTheOneScreen.tsx
      practice.types.ts
    /learn
      LearnScreen.tsx
  /navigation
    RootNavigator.tsx
    AppTabs.tsx
    PracticeStack.tsx
  /services
    audioService.ts
    hapticsService.ts
    permissionsService.ts
  /data
    practiceTracks.ts
    learnContent.ts
  /utils
    timing.ts
    format.ts
```

### 4.3 Future auth readiness
Do not build sign-in now, but keep the structure easy to extend later.

That means:
- keep navigation modular
- avoid hard-coding assumptions that every user is anonymous forever
- keep app-level providers flexible
- leave a clear future place for auth and subscription gating

Do not create auth screens in version 1.

---

## 5. Navigation Structure

Use a bottom tab navigator with **3 tabs**:

1. **Detect**
2. **Practice**
3. **Learn**

### Inside Practice
Use a stack or nested navigation so Practice can contain:
- Practice Home
- Quick Count
- Find the 1

Do not add a Profile tab.
Do not add a Settings tab in the bottom nav.

A small non-tab settings entry can be added later if needed, but it is not required for version 1.

---

## 6. Screen-by-Screen Product Spec

## 6.1 Detect Tab

### Purpose
The main feature of the app. The user listens to live music, gets an estimated dance style and BPM, and receives a clear cue for the likely "1".

### Core UI sections
- screen header
- short instruction text
- live status card
- result card
- cue controls
- continuous counting area

### Exact screen content

#### Header
- Title: `Detect`
- Optional app mark text near top: `OnThe1`

#### Intro copy
- Headline: `Hear the 1`
- Body: `Place your phone near the music and tap Start Listening.`

#### Controls shown before listening
- Toggle: `Beep cue`
- Toggle: `Vibration cue`
- Toggle: `Continuous count`
- Primary button: `Start Listening`

Defaults:
- Beep cue = ON
- Vibration cue = ON
- Continuous count = ON

#### Idle helper text
- `Best results come from a steady section of the song with clear rhythm.`

#### Permission denied state
- Title: `Microphone access is off`
- Body: `OnThe1 needs microphone access to listen to the music around you.`
- Primary button: `Open Settings`
- Secondary button: `Try Again`

#### Listening state
- Status label: `Listening...`
- Supporting text: `Trying to estimate dance style, BPM, and the 1.`
- Show a pulsing visual element.
- Show a secondary button: `Stop`

#### Detection result state
Display:
- detected style badge: `Salsa` or `Bachata`
- BPM label: `Estimated BPM`
- BPM value: example `96 BPM`
- confidence label if useful: `Best guess`
- cue status text: `Get ready to start on the next 1`

Buttons:
- Primary button: `Listen Again`
- Secondary button: `Stop Count` when continuous count is active

#### Failure state
- Title: `Could not read the rhythm`
- Body: `Try again when the music is louder or steadier.`
- Primary button: `Try Again`

### Detect behavior
- When the user taps Start Listening:
  - request microphone permission if not already granted
  - begin live listening UI
  - call a stubbed detection function first in early phases
- The detection function should return:
  - danceStyle: `"salsa"` or `"bachata"`
  - bpm: number
  - firstBeatOffsetMs: number
  - confidence: optional number
- When a detection result arrives:
  - if beep cue is on, play a short clear beep on the likely "1"
  - if vibration cue is on, vibrate on the likely "1"
  - if continuous count is on, begin a visible rhythm count and ongoing cue pattern
- The app should clearly communicate that the "1" is an estimate, not guaranteed perfect.

### Rhythm display behavior
#### Salsa
Display count pattern:
`1 2 3   5 6 7`

The heavy visual emphasis is on:
- 1
- 5

#### Bachata
Display count pattern:
`1 2 3 Tap`

The heavy visual emphasis is on:
- 1

### Continuous count toggle behavior
- If ON, continue the count after the first cue.
- If OFF, only signal the "1" cue and then stop.

---

## 6.2 Practice Tab

## 6.2.1 Practice Home

### Purpose
Simple entry point for practice features.

### Content
- Title: `Practice`
- Subtitle: `Train your ear before you hit the dance floor.`

### Two main cards
1. **Quick Count**
   - Description: `Choose a style and tempo, then follow the count.`
   - Button: `Open Quick Count`

2. **Find the 1**
   - Description: `Play a practice track and tap when you think the 1 lands.`
   - Button: `Open Trainer`

---

## 6.2.2 Quick Count

### Purpose
A simple beginner practice tool with no live detection.

### Content
- Title: `Quick Count`
- Body: `Pick a dance and tempo, then follow the beat.`

### Controls
- Segmented control or toggle:
  - `Salsa`
  - `Bachata`
- Tempo control:
  - label: `Tempo`
  - default: `100 BPM`
  - allowed range: `70 BPM` to `180 BPM`
- Toggle: `Beep cue`
- Toggle: `Vibration cue`

Defaults:
- style default = Salsa
- tempo default = 100 BPM
- beep default = ON
- vibration default = ON

### Buttons
- Primary button: `Start Count`
- Secondary button while active: `Stop`

### Count display
#### Salsa
- display `1 2 3   5 6 7`
- visually accent 1 and 5

#### Bachata
- display `1 2 3 Tap`
- visually accent 1

### Behavior
- this screen must work fully offline
- no live detection required
- timing should feel steady and simple
- support both audible and haptic cueing

---

## 6.2.3 Find the 1 Trainer

### Purpose
Help users practice recognizing the "1" using bundled tracks.

### Content
- Title: `Find the 1`
- Body: `Listen to the track and tap when you think the 1 lands.`

### Track list
Ship version 1 with bundled local practice tracks only.

Use placeholder track names if needed:
- `Salsa Basic 1`
- `Salsa Basic 2`
- `Salsa Midtempo`
- `Bachata Basic 1`
- `Bachata Basic 2`
- `Bachata Midtempo`

Store metadata in a local data file.

Each track should have:
- id
- title
- style
- bpm
- local asset reference
- expected "1" timing data or beat map needed for scoring

### Track card content
- track title
- style label
- bpm label
- button: `Start`

### Session controls
- playback
- restart
- tap target button or full-screen tap area
- session status
- score summary

### Scoring rules
Use beginner-friendly scoring:
- **Perfect**: within ±100ms
- **Good**: within ±220ms
- **Early** or **Late**: beyond that window

### During the session show
- current tap result
- total attempts
- perfect count
- average timing offset if feasible

### End of session summary
- Title: `Session Complete`
- Show:
  - perfect taps
  - good taps
  - early/late taps
  - hit rate
  - average offset
- Primary button: `Try Again`
- Secondary button: `Back to Practice`

### Notes
- Use local bundled practice audio in version 1
- Do not build remote uploads in version 1
- Keep the trainer simple and reliable

---

## 6.3 Learn Tab

### Purpose
Give beginners a short explanation of what they are hearing and how to use the app.

### Content
- Title: `Learn`
- Subtitle: `Short tips to help you hear the beat.`

### Static cards
#### Card 1
- Title: `What is the 1?`
- Body: `The 1 is the beat many dancers use to start the basic step. If you can hear the 1, it becomes easier to enter the dance at the right moment.`

#### Card 2
- Title: `Salsa basics`
- Body: `A simple Salsa count is 1 2 3, then 5 6 7. Many dancers listen for a strong recurring pulse that helps them find the next phrase.`

#### Card 3
- Title: `Bachata basics`
- Body: `A simple Bachata count is 1 2 3 Tap. The tap often gives beginners a clear cycle to follow.`

#### Card 4
- Title: `How to use Detect`
- Body: `Hold your phone close enough to the music, wait for the result, then use the cue to start on the next 1.`

#### Card 5
- Title: `Practice tip`
- Body: `Do not try to hear every instrument. First find the steady pulse, then listen for where the pattern repeats.`

No backend content is needed for this tab in version 1.

---

## 7. Visual and UX Direction for Implementation

Use a dark, music-focused design.

### Design rules
- high contrast
- large tap targets
- strong readability in dark environments
- minimal clutter
- clean modern feel
- rhythm visuals should be bold and obvious
- animation should support clarity, not decoration

### Preferred visual tone
- dark background
- bright accent color for active beats
- subtle secondary surfaces/cards
- rounded cards and buttons
- big central action button on the Detect screen

### Accessibility rules
- ensure readable text contrast
- support reduced motion if simple to add
- avoid tiny touch targets
- keep the important action visible without scrolling on key screens

---

## 8. Detection Logic Requirements

## 8.1 Early development requirement
In early phases, detection must be stubbed.

Create a function such as:

```ts
type DetectionResult = {
  danceStyle: 'salsa' | 'bachata';
  bpm: number;
  firstBeatOffsetMs: number;
  confidence?: number;
};
```

Stub behavior:
- wait about 2 to 3 seconds
- return hardcoded mock data
- allow switching between sample Salsa and Bachata results during development if helpful

Example mock results:
- Salsa, 96 BPM, firstBeatOffsetMs 800
- Bachata, 128 BPM, firstBeatOffsetMs 600

## 8.2 Real integration later
Only after the UI flow is tested should Codex move toward real audio capture and API integration.

Important:
- do not promise perfect "1" detection
- treat it as a likely estimate
- handle noisy environments gracefully
- surface failure states clearly

---

## 9. Audio and Haptics Requirements

### Beep cue
- short
- clear
- not harsh
- easy to hear in a dance environment

### Vibration cue
- strong enough to notice
- should support repeated pulses in continuous count mode

### Timing behavior
- prioritize predictable timing
- avoid complex timing logic early
- start with simple count timing derived from BPM

---

## 10. Reusable Components

Build reusable UI components early.

Required components:
- PrimaryButton
- SecondaryButton
- ToggleRow
- StatusCard
- ResultCard
- CountDisplay
- TempoSlider
- TrackCard
- ScoreBadge
- TipCard
- EmptyState

Do not over-engineer the component library.
Build only what this app needs.

---

## 11. Phased Execution Plan

Follow this order strictly.

## Phase 1 - Project setup and navigation
### Goals
- initialize the Expo app with TypeScript if needed
- set up the folder structure
- set up React Navigation
- create the bottom tabs:
  - Detect
  - Practice
  - Learn
- create Practice nested navigation:
  - Practice Home
  - Quick Count
  - Find the 1
- add placeholder content for each screen
- add a simple theme foundation

### Acceptance criteria
- app runs
- all tabs work
- Practice sub-navigation works
- no broken imports
- placeholder screens are readable

### Stop rule
After Phase 1 is complete, stop and wait.

---

## Phase 2 - UI foundation and reusable components
### Goals
- create color, spacing, and typography constants
- create reusable UI components listed above
- replace rough placeholders with real screen layouts
- implement the dark visual style
- ensure Detect, Practice Home, and Learn all have near-final structure

### Acceptance criteria
- main layouts exist
- buttons, cards, toggles, and count displays are reusable
- screens look cohesive
- no business logic required yet

### Stop rule
After Phase 2 is complete, stop and wait.

---

## Phase 3 - Quick Count feature
### Goals
- build Quick Count fully
- style selector works
- tempo control works
- Start Count and Stop work
- beep and vibration toggles work
- count display updates correctly for Salsa and Bachata

### Acceptance criteria
- Quick Count works offline
- count timing is stable
- both styles display the correct count pattern
- haptics and sound cues can be turned on/off

### Stop rule
After Phase 3 is complete, stop and wait.

---

## Phase 4 - Find the 1 trainer with local tracks
### Goals
- add bundled local practice tracks
- build the Find the 1 trainer flow
- implement playback
- implement tap detection and scoring
- show live feedback and end-of-session summary

### Acceptance criteria
- user can choose a bundled track
- track plays
- taps are scored
- summary is shown at end
- at least a few local tracks are wired correctly

### Stop rule
After Phase 4 is complete, stop and wait.

---

## Phase 5 - Detect screen UI with stubbed detection
### Goals
- build Detect screen with full UI
- implement microphone permission flow
- implement pulsing listening state
- create stubbed detection service
- show result state with style, BPM, and likely "1"
- trigger beep and vibration cue
- support continuous count on/off

### Acceptance criteria
- Detect screen works end-to-end with mock data
- permission states are handled
- result states are clear
- cueing works
- continuous count can be toggled

### Stop rule
After Phase 5 is complete, stop and wait.

---

## Phase 6 - Polish and reliability pass
### Goals
- improve loading, error, and empty states
- clean up copy and edge cases
- reduce UI roughness
- improve timing stability where possible
- make the app feel ready for early real-world testing

### Acceptance criteria
- no obviously broken flows
- no confusing placeholder text
- smooth enough for MVP testing
- code is organized and readable

### Stop rule
After Phase 6 is complete, stop and wait.

---

## Phase 7 - Real audio capture and detection integration
Do not begin this phase unless explicitly requested after the MVP stub has been tested.

### Goals
- capture microphone audio
- send audio data to a real detection API or backend
- replace stubbed detection
- keep the same UI contract
- handle errors and uncertainty gracefully

### Acceptance criteria
- real audio path works in development
- detection service returns real data
- failures are handled
- app still feels stable

### Stop rule
After Phase 7 is complete, stop and wait.

---

## 12. What Codex Must Report After Each Phase

At the end of each phase, report:

1. what was built
2. which files changed
3. how to test it
4. what is still stubbed or incomplete
5. what the next phase would be

Do not silently continue.

---

## 13. Future Expansion Notes

The codebase should be ready for future additions such as:
- sign-in
- profile/account area
- premium feature gating
- more dances
- remote lesson content
- usage tracking
- saved settings
- subscription paywall

But none of those should appear in version 1.

---

## 14. Final Product Principles

OnThe1 version 1 should feel:
- simple
- clear
- beginner-friendly
- fast to understand
- useful in real dance situations

When in doubt, choose simplicity over feature depth.
