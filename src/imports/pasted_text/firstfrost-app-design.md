You are designing for FirstFrost, a gardening app 
serving hydroponic and outdoor gardeners.

## Brand Context
- Name: FirstFrost
- Tone: Knowledgeable but approachable
- Users: Hydroponic gardeners (data-focused) and 
  outdoor gardeners (older demographic, used in sunlight)

## Core App Architecture — Swipeable Dual Interface

The app has TWO primary environments navigated 
by horizontal swipe:

LEFT (Default View) — "Outside"
- This is the default landing screen
- Warmer tones: sage, clay, warm slate, earthy greens
- Shows: outdoor dashboard, current outside 
  temperature, local climate data, plant status 
  for outdoor beds
- HERO ELEMENT: Frost Countdown Banner (see below)
- Swipe indicator on right edge hints toward indoor view

RIGHT View — "Inside / Hydroponics"
- Accessed by swiping right
- Cooler tones: frost white, bioluminescent teal, 
  deep moss, slate blues
- Shows: hydroponic system dashboard, nutrient 
  levels, pH readings, grow light schedules, 
  a notebook/journal for logging observations
- Feels like stepping indoors — UI temperature 
  should shift noticeably but remain cohesive
- Swipe indicator on left edge to return outside

## Swipe Transition Design Rules
- Transition should feel like moving between 
  two physical spaces — not just tab switching
- Background color temperature shifts 
  gradually during the swipe gesture
- A subtle texture shift: outdoor has organic 
  grain, indoor has clean frosted glass
- Persistent elements (nav bar, profile icon) 
  stay fixed during transition
- A small persistent pill indicator shows 
  which environment you are in (like a 
  breadcrumb dot system)

---

## HERO FEATURE: Frost Countdown

The frost countdown is the emotional core 
of the outdoor view. It must convey urgency 
without causing panic.

### Countdown States & Urgency Levels

STATE 1 — Safe (30+ days)
- Tone: Calm, informational
- Color: Sage green
- Message example: 
  "First frost expected in ~47 days. 
  You're in good shape."
- Visual: Subtle leaf icon, relaxed typography

STATE 2 — Heads Up (15–29 days)
- Tone: Gentle urgency
- Color: Warm amber/clay
- Message example:
  "Frost arriving in 18 days. 
  Time to start planning."
- Visual: Frost crystal icon begins to appear

STATE 3 — Action Required (7–14 days)
- Tone: Clear urgency
- Color: Deep amber, bold typography
- Message example:
  "First frost in 9 days. 
  3 plants need attention."
- Visual: Countdown clock motif, 
  actionable CTA button — "See what to do"

STATE 4 — Imminent (1–6 days)
- Tone: Urgent but not alarming
- Color: Deep slate with frost white text, 
  frost crystal accent — NOT harsh red
- Message example:
  "Frost in 3 days. 
  Protect or harvest now."
- Visual: Animated frost crystal forming, 
  pulsing urgency ring around countdown

STATE 5 — Tonight / Tomorrow
- Tone: High alert
- Full-width banner takes over top of screen
- Haptic alert triggered on open
- Message example:
  "Frost tonight. Take action now."
- Must meet WCAG AA contrast in this state
- Icon + color + text + haptic — 
  all four signals used simultaneously

### Countdown must NEVER rely on color alone
- Each state has a unique icon, label, 
  and message — colorblind users must 
  be able to distinguish all 5 states

---

## Climate Information Panel (Outdoor View)

Displayed below or alongside the frost countdown.
Designed to be swipeable horizontally within 
the outdoor view (a nested horizontal scroll 
separate from the main left/right swipe):

CARD 1 (Default visible)
- Current outside temperature
- Feels like / humidity
- Wind (relevant for frost risk)
- Simple weather icon

CARD 2 (Swipe within panel)
- 7-day forecast
- Frost risk indicators per day 
  (icon-based, not color-only)

CARD 3 (Swipe within panel)
- Historical frost data for the user's 
  location
- Average first frost date for their zone
- Variance: "Some years it arrives 2 weeks 
  earlier"

CARD 4 (Swipe within panel)
- Soil temperature (if sensor connected 
  or estimated)
- Relevant context: 
  "Below 50°F slows root growth"

Design rules for climate cards:
- Card width should bleed slightly off-screen 
  to signal swipeability
- Dots or a scroll progress bar below cards
- Cards use glassmorphism style — 
  frosted, layered over outdoor imagery 
  or ambient background

---

## Indoor / Hydroponics View (Right Swipe)

Sections within the indoor view:

HYDRO DASHBOARD
- Active grow trays / systems
- pH level (gauge, not color-only)
- EC / nutrient concentration
- Water temperature
- Days since last nutrient change
- Grow light schedule + current status

NOTEBOOK (below dashboard or tabbed)
- Freeform log entries per plant or system
- Quick-log buttons: 
  "pH adjusted" / "Nutrients topped up" / 
  "New growth observed"
- Photo attachment option
- Timestamped entries
- Searchable

---

## Accessibility Requirements (Non-Negotiable)

- All text contrast meets WCAG 2.2 AA (4.5:1 min)
- Minimum touch targets: 44x44px
- Never use color alone — always pair with 
  icon + label + text
- All 5 frost countdown states distinguishable 
  without color
- Minimum 16px body text, no font weights below 400
- Support dynamic text sizing
- All icons must have visible text labels
- Charts and gauges must be colorblind-safe
- High contrast mode available
- Screen reader logical hierarchy on all screens
- Swipe navigation must have tap-based 
  alternative (toggle button for users who 
  cannot swipe)
- Outdoor view must be legible in direct sunlight 
  (test contrast at 50% brightness)
- Large tap targets for gloved/dirty hands 
  in outdoor context

---

## Typography
- Headings / UI: Instrument Sans
- Body / organic context: Lora
- Data / numbers: Instrument Sans Mono 
  (for pH, EC, temperature readings)
- Minimum body size: 16px
- Line height: 1.5

---

## Visual Style Summary
- Outdoor: Warm, earthy, organic grain texture, 
  natural light feel
- Indoor: Cool, clean, frosted glass, 
  controlled environment feel
- Transition between them should feel intentional 
  and spatial
- Glassmorphism 2.0 for cards throughout
- Iconography: Outline-style, slightly rounded
- Micro-animations tied to growth and urgency states

---

## Component Request
[INSERT SPECIFIC SCREEN OR COMPONENT HERE]

Examples:
- "Design the default outdoor dashboard 
   with frost countdown in STATE 3 — 
   Action Required"
- "Design the swipe transition frame showing 
   the midpoint between outdoor and indoor views"
- "Design the climate information card 
   carousel with all 4 card states"
- "Design the indoor hydroponics dashboard 
   with notebook section below"
- "Design the frost countdown in all 5 
   urgency states as a component set"

---

## Constraints
- Mobile-first (iOS and Android)
- Bottom navigation for one-handed use
- Key actions accessible from bottom of screen
- Works in light, dark, and high contrast modes
- Auto-layout applied to all components
- Design all interactive components with 
  default, hover, pressed, and disabled states