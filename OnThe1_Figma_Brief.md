# OnThe1 - Figma Design Brief

## 1. Goal

Design the first version of **OnThe1**, a mobile app for beginner social dancers.

The app helps users:
- identify whether music is **Salsa** or **Bachata**
- find the likely **"1"**
- get a clear start cue
- practice hearing and following the beat

This is a version 1 product. The design should feel polished, modern, and focused, but not overloaded.

Design for **iPhone first**.

---

## 2. Product Direction

### Core idea
A dancer is in class, social dancing, or practicing. They want help hearing when to start. OnThe1 should make that moment easier.

### Product feeling
The app should feel:
- clear
- confident
- modern
- beginner-friendly
- music-focused
- readable in dark environments

### Do not make it feel
- cluttered
- overly technical
- gamified in a childish way
- enterprise-like
- too minimalist to the point of confusion

---

## 3. Audience

Primary audience:
- beginner Salsa dancers
- beginner Bachata dancers
- people who struggle to find the beat or the "1"
- users in classes, socials, or at-home practice

Design for people who may be nervous, new, and in a noisy environment.

---

## 4. App Structure

Create a bottom tab app with **3 tabs**:

1. **Detect**
2. **Practice**
3. **Learn**

### Practice has sub-screens
- Practice Home
- Quick Count
- Find the 1

Do not design:
- Profile tab
- sign-in flow
- subscription screens
- history screens
- saved settings screens
- video library
- Merengue support

---

## 5. Screen Inventory

Create high-fidelity designs for:

1. **Detect - Idle**
2. **Detect - Listening**
3. **Detect - Result**
4. **Detect - Permission Denied**
5. **Detect - Failed Detection**
6. **Practice Home**
7. **Quick Count - Idle**
8. **Quick Count - Running**
9. **Find the 1 - Track List**
10. **Find the 1 - Active Session**
11. **Find the 1 - Session Complete**
12. **Learn**
13. Optional lightweight global sheet or modal for simple app info, if needed

Create a clickable prototype for the primary flows.

---

## 6. Content and Copy

Use this product copy exactly unless a very small UI adjustment is needed.

## 6.1 Detect

### Idle state
- Screen title: `Detect`
- Hero title: `Hear the 1`
- Body: `Place your phone near the music and tap Start Listening.`
- Toggles:
  - `Beep cue`
  - `Vibration cue`
  - `Continuous count`
- Main button: `Start Listening`
- Helper text: `Best results come from a steady section of the song with clear rhythm.`

### Listening state
- Screen title: `Detect`
- Hero title: `Listening...`
- Body: `Trying to estimate dance style, BPM, and the 1.`
- Secondary button: `Stop`

### Result state
- Screen title: `Detect`
- Hero title: `Hear the 1`
- Result labels:
  - style chip: `Salsa` or `Bachata`
  - label: `Estimated BPM`
  - example value: `96 BPM`
  - status text: `Get ready to start on the next 1`
- Buttons:
  - `Listen Again`
  - `Stop Count` when continuous count is active

### Permission denied
- Title: `Microphone access is off`
- Body: `OnThe1 needs microphone access to listen to the music around you.`
- Buttons:
  - `Open Settings`
  - `Try Again`

### Failed detection
- Title: `Could not read the rhythm`
- Body: `Try again when the music is louder or steadier.`
- Button: `Try Again`

---

## 6.2 Practice Home
- Screen title: `Practice`
- Subtitle: `Train your ear before you hit the dance floor.`

### Card 1
- Title: `Quick Count`
- Body: `Choose a style and tempo, then follow the count.`
- Button: `Open Quick Count`

### Card 2
- Title: `Find the 1`
- Body: `Play a practice track and tap when you think the 1 lands.`
- Button: `Open Trainer`

---

## 6.3 Quick Count
- Screen title: `Quick Count`
- Body: `Pick a dance and tempo, then follow the beat.`
- Style selector:
  - `Salsa`
  - `Bachata`
- Label: `Tempo`
- Example value: `100 BPM`
- Toggles:
  - `Beep cue`
  - `Vibration cue`
- Buttons:
  - `Start Count`
  - `Stop`

---

## 6.4 Find the 1

### Track list
- Screen title: `Find the 1`
- Body: `Listen to the track and tap when you think the 1 lands.`

Track examples:
- `Salsa Basic 1`
- `Salsa Basic 2`
- `Salsa Midtempo`
- `Bachata Basic 1`
- `Bachata Basic 2`
- `Bachata Midtempo`

Track card should include:
- title
- style
- bpm
- `Start` button

### Active session
Show:
- track title
- progress
- large tap target
- latest result feedback
- score summary preview
- playback controls if needed

### Session complete
- Title: `Session Complete`
- Show:
  - perfect taps
  - good taps
  - early/late taps
  - hit rate
  - average offset
- Buttons:
  - `Try Again`
  - `Back to Practice`

---

## 6.5 Learn
- Screen title: `Learn`
- Subtitle: `Short tips to help you hear the beat.`

Cards:
1. `What is the 1?`
   - `The 1 is the beat many dancers use to start the basic step. If you can hear the 1, it becomes easier to enter the dance at the right moment.`

2. `Salsa basics`
   - `A simple Salsa count is 1 2 3, then 5 6 7. Many dancers listen for a strong recurring pulse that helps them find the next phrase.`

3. `Bachata basics`
   - `A simple Bachata count is 1 2 3 Tap. The tap often gives beginners a clear cycle to follow.`

4. `How to use Detect`
   - `Hold your phone close enough to the music, wait for the result, then use the cue to start on the next 1.`

5. `Practice tip`
   - `Do not try to hear every instrument. First find the steady pulse, then listen for where the pattern repeats.`

---

## 7. UX Requirements

### Detect tab
This is the main screen of the app. It should feel like the hero screen.

Requirements:
- the main action should be obvious immediately
- toggles should be visible without feeling crowded
- the listening state should feel alive
- the result state should feel encouraging and easy to read
- the rhythm/count display should be large and clear

### Practice
Requirements:
- approachable for beginners
- no confusing menus
- clear separation between Quick Count and Find the 1
- the tap trainer should make the tap target impossible to miss

### Learn
Requirements:
- calm and readable
- card-based layout is acceptable
- content should be quick to scan

---

## 8. Visual Direction

### General style
- dark theme first
- premium but not flashy
- music-focused
- high contrast
- slightly energetic
- clean rounded surfaces
- strong hierarchy

### Environment consideration
The app may be used:
- in dark dance venues
- during classes
- in practice sessions at home

So the UI must stay readable in low-light conditions.

### Visual priorities
- large primary CTA
- strong status feedback
- easy-to-read BPM number
- obvious active beat/count state
- very clear tap zones

---

## 9. Color Direction

Use a dark UI with one strong primary accent and one supporting accent.

Suggested approach:
- background: deep charcoal / near black
- surface cards: slightly lighter dark gray
- primary accent: vivid electric blue, cyan, or purple
- success/active beat: bright accent highlight
- warning/error: warm but tasteful

Avoid:
- too many accent colors
- washed-out gray UI
- neon overload
- light theme as the main version

The important thing is readability and beat clarity.

---

## 10. Typography Direction

Use typography that feels modern and clear.

Requirements:
- bold hero titles
- readable body copy
- highly legible numbers for BPM and count display
- good spacing between sections
- avoid tiny captions unless absolutely necessary

BPM and count numbers should feel visually important.

---

## 11. Component Guidance

Design reusable components for:
- primary button
- secondary button
- toggle row
- status card
- result card
- count display
- track card
- score badge
- tip card

Create clear component states:
- default
- pressed
- disabled if needed
- active / selected
- loading for main CTA if useful

---

## 12. Motion Guidance

Use motion to support rhythm.

Recommended:
- subtle pulse animation in Listening state
- soft emphasis on active beat in count display
- gentle transitions between states

Avoid:
- too much bounce
- decorative motion that distracts
- excessive animation layers

---

## 13. Prototype Requirements

Create a clickable prototype for these flows:

### Flow 1
Detect Idle -> Listening -> Result

### Flow 2
Practice Home -> Quick Count -> Running state

### Flow 3
Practice Home -> Find the 1 -> Active Session -> Session Complete

### Flow 4
Learn tab open and scroll

---

## 14. Deliverables

Please produce:
1. a mobile-first Figma file
2. final high-fidelity screens
3. a basic component set
4. a clickable prototype
5. developer-ready spacing, colors, and text styles
6. exportable screen references for engineering handoff

---

## 15. Final Design Principle

OnThe1 should feel like a simple, smart dance companion.

When in doubt:
- make it clearer
- make it easier to read
- make the main action more obvious
- keep the experience simple for beginners
