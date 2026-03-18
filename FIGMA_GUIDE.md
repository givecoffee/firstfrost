# FirstFrost Figma Design Guide

This guide explains how to recreate the FirstFrost app's design effects in Figma, matching the implemented code.

---

## 🎨 Color System Setup

### 1. Create Color Styles

**Outdoor (Warm) Palette:**
- Sage Green: `#8B9A7E`
- Clay: `#C17855`
- Warm Slate: `#6B7280`
- Earthy Green: `#5F7A61`
- Outdoor BG Gradient: `#9FBF8F` → `#6B8E6F`

**Indoor (Cool) Palette:**
- Frost White: `#F8FAFB`
- Teal: `#3CAEA3`
- Deep Moss: `#2D5F5D`
- Slate Blue: `#4A6FA5`
- Indoor BG Gradient: `#E8F4F8` → `#B8D4DB`

**Frost States:**
- Safe: `#8B9A7E`
- Heads Up: `#D9A74A`
- Action Required: `#C17855`
- Imminent: `#4A5568`
- Tonight: `#2D3748`

### 2. In Figma:
1. Select any shape
2. Click the fill color → Click the styles icon (four dots)
3. Click `+` to create a new color style
4. Name it (e.g., "Outdoor/Sage")
5. Repeat for all colors

---

## 📐 Typography Setup

### 1. Install Fonts
- **Instrument Sans**: For headings, UI elements, buttons, labels
- **Lora**: For body text, organic context
- **Instrument Sans** (with tabular numbers): For data/metrics (pH, temp, etc.)

### 2. Create Text Styles

**In Figma:**
1. Create a text layer
2. Set the font, size, weight, line height
3. Click the text styles icon (four dots) in the properties panel
4. Click `+` to create new text style
5. Name it following your system (e.g., "Heading/H1")

**Recommended Styles:**
```
Heading 1: Instrument Sans, 24px, Semibold, 1.5 line height
Heading 2: Instrument Sans, 20px, Semibold, 1.5 line height
Heading 3: Instrument Sans, 18px, Semibold, 1.5 line height
Body: Lora, 16px, Regular, 1.5 line height
Body Small: Lora, 14px, Regular, 1.5 line height
Label: Instrument Sans, 16px, Medium, 1.5 line height
Data/Metrics: Instrument Sans, varies, Medium/Bold, 1.5 line height
```

**Pro Tip:** Enable "Tabular Nums" in the OpenType features for data text styles to ensure numbers align perfectly.

---

## 🪟 Glassmorphism 2.0 Effect

The signature frosted glass cards are created with this recipe:

### Recipe in Figma:

1. **Create a rectangle** with rounded corners (16-20px radius)

2. **Fill:**
   - Color: White
   - Opacity: 10% (for subtle) or 20-30% (for prominent cards)

3. **Border:**
   - Inside stroke, 1px
   - Color: White
   - Opacity: 20-30%

4. **Effects → Background Blur:**
   - Click `+` in Effects
   - Choose "Background blur"
   - Set blur: 24-40px (higher = more blur)

5. **Shadow (optional but recommended):**
   - Add a Drop Shadow effect
   - X: 0, Y: 8, Blur: 24, Spread: 0
   - Color: Black at 10-15% opacity

### Creating Reusable Glass Card Components:

1. Create the card using the recipe above
2. Add auto-layout (Shift + A)
3. Set padding: 24px all sides
4. Convert to component (Cmd/Ctrl + Alt + K)
5. Name it "Glass Card/Default"
6. Create variants for different states (hover, pressed, etc.)

---

## 🌡️ Frost Countdown Component

This is the hero element. Here's how to build all 5 states as a component set:

### Step 1: Create Base Component

1. **Main Frame** (auto-layout vertical):
   - Width: Fill container or 375px
   - Padding: 24px
   - Corner radius: 16px
   - Gap: 16px

2. **Background:**
   - Apply glassmorphism recipe
   - Background color will change per state

3. **Header Row** (auto-layout horizontal):
   - Gap: 12px
   - Contains: Icon container + Text group

4. **Icon Container:**
   - 48×48px
   - Rounded: 12px
   - Fill: White at 20% opacity
   - Contains: Lucide icon (leaf, cloud, alert, snowflake, bell)

5. **Text Group** (auto-layout vertical):
   - "SAFE" label (uppercase, 12px, semibold, tracking 0.5)
   - "47 Days" (32px, bold, tabular nums)

6. **Message Text:**
   - Body style, white text
   - Example: "First frost expected in ~47 days..."

7. **Action Button** (optional, appears in states 3-5):
   - Auto-layout, padding: 12px 24px
   - Min height: 44px (accessibility)
   - Background: White at 30% or solid white (state 5)

### Step 2: Create Component Variants

1. Select your component
2. Click "Add variant" in the properties panel
3. Create 5 variants total
4. Add a property called "State" with values:
   - Safe
   - Heads Up
   - Action Required
   - Imminent
   - Tonight

### Step 3: Style Each State

**State 1 - Safe:**
- Background: `#8B9A7E` at 90% opacity
- Icon: Leaf
- No action button

**State 2 - Heads Up:**
- Background: `#D9A74A` at 90% opacity
- Icon: Cloud
- No action button

**State 3 - Action Required:**
- Background: `#C17855` at 90% opacity
- Icon: Alert Triangle
- Button: "See what to do"

**State 4 - Imminent:**
- Background: `#4A5568` at 95% opacity
- Icon: Snowflake (with pulse animation in code)
- Button: "Take action"
- Border: 2px white at 50%

**State 5 - Tonight:**
- Background: `#2D3748` at 95% opacity
- Icon: Bell
- Button: Solid white background, dark text
- Border: 2px white at 60%
- Add outer stroke: 4px white at 30% (ring effect)

### Accessibility Annotations:

Add a note layer to your component:
- "Icon + Label + Text = distinguishable without color"
- "WCAG AA contrast: 4.5:1 minimum"

---

## 📊 Climate Carousel

Create a horizontally scrollable card set.

### In Figma:

1. **Create a Frame** called "Climate Carousel"
   - Width: 375px (mobile)
   - Height: Auto
   - No clip content (allows cards to overflow)

2. **Create Card Frames** (4 total):
   - Width: 320px (85% of viewport = bleed effect)
   - Auto-layout vertical
   - Padding: 24px
   - Gap: 16px
   - Apply glassmorphism effect

3. **Arrange Cards Horizontally:**
   - Place cards side by side
   - Gap: 16px between cards
   - First card aligns to left edge
   - Last card extends beyond frame

4. **Add Scroll Indicators:**
   - Create dots below: 8px circles
   - Active dot: 32px width (pill shape)
   - Inactive dots: 8px circles at 40% opacity

### Scroll Interaction Prototype:

1. Create separate frames for each scroll state
2. Connect with "While Scrolling" trigger
3. Animate scroll progress indicators

**Better Approach:** Use Figma's horizontal scroll property:
1. Select the parent frame
2. Set overflow: Horizontal scrolling
3. Turn on "Clip content"

---

## 🔄 Swipeable Dual Interface

Creating the transition between Outdoor and Indoor views:

### Method 1: Interactive Component (Recommended)

1. **Create two frames:**
   - "Outdoor View" - 375×812px
   - "Indoor View" - 375×812px

2. **Create transition frame:**
   - "Transition State" - shows both views at 50% opacity blend

3. **Background Gradient Animation:**
   - Outdoor: Linear gradient 135°, `#9FBF8F` → `#6B8E6F`
   - Indoor: Linear gradient 135°, `#E8F4F8` → `#B8D4DB`
   - Transition: Use Smart Animate between states

4. **Set up Interactions:**
   - Trigger: Drag (right for Indoor, left for Outdoor)
   - Action: Navigate to frame
   - Animation: Smart Animate
   - Easing: Ease out, 300ms

5. **Add Swipe Indicators:**
   - 3 vertical pills (8×32px each)
   - Position: Right edge for Outdoor, left edge for Indoor
   - Opacity: 50%
   - Color: White

### Method 2: Prototype with Variants

1. Create a component with two variants: "Outdoor" and "Indoor"
2. Change background gradient per variant
3. Use "Change to" interaction with drag trigger
4. Enable Smart Animate

---

## 🎯 Touch Targets (Accessibility)

All interactive elements MUST be minimum 44×44px.

### In Figma:

1. Create a component called "Touch Target Guide"
   - 44×44px rectangle
   - Red stroke at 50% opacity
   - Lock this layer

2. Use this as an overlay when designing buttons:
   - Your button should fill at least this space
   - Padding can be inside, but the clickable area = 44×44px

3. **Create Button Component:**
   - Min width: 44px
   - Min height: 44px
   - Auto-layout with padding: 12px 24px
   - Text: 16px minimum

---

## 📱 Component States

Create interactive states for all buttons and cards:

### Button States Component:

1. Create base button
2. Add variants:
   - Default
   - Hover (bg opacity +10%)
   - Pressed (bg opacity +20%, scale 0.98)
   - Disabled (opacity 50%, no pointer)

### In Properties Panel:
1. Add property "State"
2. Values: Default, Hover, Pressed, Disabled
3. Style each variant accordingly

### Prototype Interactions:
- While Hovering → Change to Hover
- While Pressing → Change to Pressed
- If disabled prop = true → Change to Disabled

---

## 📐 Auto-Layout Best Practices

Every card and component should use auto-layout:

### Steps:

1. **Select your frame**
2. **Press Shift + A** to add auto-layout
3. **Configure:**
   - Direction: Vertical (most cards) or Horizontal
   - Gap: 12-16px for cards, 8px for tight groups
   - Padding: 16-24px for cards
   - Resizing: Hug contents or Fill container

4. **Nested Auto-Layouts:**
   - Header row: Horizontal auto-layout
   - Card body: Vertical auto-layout
   - Button group: Horizontal auto-layout

---

## 🎭 Animations & Micro-interactions

### Pulse Animation (for urgent states):

Figma doesn't do this natively, but you can:

1. **Create animation frames:**
   - Frame 1: Opacity 100%, Scale 1
   - Frame 2: Opacity 60%, Scale 1.1
   - Frame 3: Back to Frame 1

2. **Connect with After Delay:**
   - Frame 1 → Frame 2 (After 500ms)
   - Frame 2 → Frame 3 (After 500ms)
   - Frame 3 → Frame 1 (After 500ms)
   - Animation: Smart Animate, Ease In Out

### Gradient Transition:

1. Create component with two states
2. Change gradient colors between states
3. Use Smart Animate (300ms, Ease Out)
4. Trigger: On click or On drag

---

## 🔤 Data/Metrics Display

Use tabular numbers for all metrics:

### In Figma:

1. **Select your text layer** with numbers (pH, temp, etc.)
2. **Text properties → ... (More options)**
3. **OpenType Features → Enable:**
   - Tabular Nums (tnum)
   - This ensures all numbers have same width
   - Critical for aligned data displays

### Styling Data:
- Font: Instrument Sans
- Weight: Medium or Semibold
- Size: 24-48px for hero metrics
- Color: White (on glass cards)
- Line height: 1.2 (tighter for big numbers)

---

## 📦 Component Organization

Organize your components in the Assets panel:

```
Components/
├── Glass Cards/
│   ├── Base Card
│   ├── Image Card
│   ├── Stat Card
│   └── Product Card
├── Frost Countdown/
│   ├── State 1 - Safe
│   ├── State 2 - Heads Up
│   ├── State 3 - Action
│   ├── State 4 - Imminent
│   └── State 5 - Tonight
├── Buttons/
│   ├── Primary
│   ├── Secondary
│   └── Ghost
├── Inputs/
│   └── Search Bar
├── Cards/
│   ├── Plant Card
│   ├── Climate Card
│   └── Status Card
└── Navigation/
    ├── View Toggle
    └── Swipe Indicators
```

### Naming Convention:
- Category/Component/Variant
- Example: "Button/Primary/Hover"

---

## ✅ Accessibility Checklist

Before finalizing your Figma design:

- [ ] All text meets WCAG AA (4.5:1 contrast)
- [ ] Touch targets are minimum 44×44px
- [ ] Color is never the only indicator (icon + label + text)
- [ ] All 5 frost states visually distinct without color
- [ ] Font size minimum 16px for body text
- [ ] Line height minimum 1.5
- [ ] Font weight minimum 400 (no light weights)
- [ ] Alternative to swipe gesture (toggle button)
- [ ] Outdoor view legible at 50% brightness

### Checking Contrast in Figma:

1. **Install "Stark" plugin** (free)
2. Select text + background
3. Run Stark → Check Contrast
4. Ensure it passes WCAG AA (4.5:1 for text, 3:1 for UI)

---

## 🎨 Exporting Assets

### For Development Handoff:

1. **Create a Dev Mode view:**
   - Enable Dev Mode (top right toggle)
   - Developers can inspect spacing, colors, fonts

2. **Mark for Export:**
   - Icons: SVG, 1x
   - Images: PNG, 2x and 3x for retina
   - Components: No export needed (reference in Dev Mode)

3. **Create Spec Annotations:**
   - Use FigJam or Comment tool
   - Annotate spacing, behavior, states
   - Link to component variants

---

## 🚀 Prototyping the Full Experience

### Create Interactive Prototype:

1. **Setup Frames:**
   - Outdoor View (default)
   - Indoor View
   - Frost Countdown detail
   - Plant detail modal

2. **Add Interactions:**
   - Swipe left: Outdoor → Indoor
   - Swipe right: Indoor → Outdoor
   - Tap "See what to do": Show action sheet
   - Tap plant card: Open detail modal

3. **Prototype Settings:**
   - Device: iPhone 15 Pro
   - Background: Transparent or #000000
   - Starting frame: Outdoor View

4. **Present:**
   - Click Play (▶) button
   - Share link with stakeholders
   - Enable commenting for feedback

---

## 💡 Advanced Tips

### Gradient Temperature Shift:

Create a smooth transition feel between views:

1. Create 3 frames: Outdoor, Transition (50%), Indoor
2. Gradient stops for Transition frame:
   - Calculate midpoint between outdoor and indoor colors
   - Outdoor `#9FBF8F` + Indoor `#E8F4F8` = Mid `#C4DAC3`

3. Connect with Smart Animate for smooth shift

### Texture Overlay:

For "organic grain" on outdoor view:

1. Create a rectangle same size as frame
2. Fill: Noise texture (100% scale)
3. Blend mode: Overlay
4. Opacity: 3-5%
5. Lock layer

For "clean frosted glass" on indoor view:

1. Use Background Blur (already applied to cards)
2. No noise texture overlay

### Component Properties:

Use boolean properties for conditional elements:

1. **Select component**
2. **Add property: Boolean**
3. **Name it** (e.g., "Show Alert Badge")
4. **Layer visibility:** Link layer to property
5. **Now you can** toggle features on/off per instance

---

## 📱 Responsive Design

While FirstFrost is mobile-first, here's how to plan for tablet:

### In Figma:

1. **Create separate frames:**
   - Mobile: 375px
   - Tablet: 768px

2. **Use Constraints:**
   - Cards: Left + Right + Top (stretches horizontally)
   - Centered content: Center + Top

3. **Auto-Layout Wrap:**
   - Grid of cards: Enable "Wrap" in auto-layout
   - Cards will flow to new rows on larger screens

---

## 🎯 Quick Reference: Key Measurements

```
Font Sizes:
- Minimum body: 16px
- Small text: 14px (use sparingly)
- Headings: 18px, 20px, 24px

Spacing Scale:
- XS: 4px
- S: 8px
- M: 12px
- L: 16px
- XL: 24px
- 2XL: 32px

Radii:
- Buttons: 12px
- Cards: 16-20px
- Pills: 9999px (full round)

Touch Targets:
- Minimum: 44×44px
- Preferred: 48×48px

Opacity Scale (for glass):
- Subtle: 10%
- Medium: 20%
- Strong: 30%
- Border: 20-30%

Blur:
- Light glass: 16px
- Medium glass: 24px
- Heavy glass: 40px
```

---

## 🤝 Collaboration Tips

### Working with Developers:

1. **Use consistent naming** (match component names to code)
2. **Document interactions** (comments or FigJam)
3. **Share color/text styles** (developers can export)
4. **Enable Dev Mode** (shows CSS, measurements)
5. **Version your designs** (save iterations as pages)

### Design Handoff Checklist:

- [ ] All components are named consistently
- [ ] Color styles match CSS variables
- [ ] Text styles documented
- [ ] Interactive states shown (hover, pressed, disabled)
- [ ] Accessibility annotations added
- [ ] Prototype demonstrates key interactions
- [ ] Assets exported (icons, images)
- [ ] Measurements annotated (if not using Dev Mode)

---

## 🎬 Next Steps

Now that you understand the system:

1. **Start with the color styles** (foundation)
2. **Create typography styles** (readability)
3. **Build the glass card component** (reusable)
4. **Create the frost countdown** (hero feature)
5. **Design full views** (outdoor, indoor)
6. **Add interactions** (swipe, taps)
7. **Test accessibility** (contrast, touch targets)
8. **Prototype and iterate** (get feedback)

---

## 📚 Resources

**Figma Learn:**
- Auto-layout: figma.com/best-practices/creating-dynamic-designs-with-auto-layout
- Components: figma.com/best-practices/components-styles-and-shared-libraries
- Prototyping: figma.com/best-practices/everything-you-need-to-know-about-prototyping-in-figma

**Accessibility:**
- WCAG Guidelines: w3.org/WAI/WCAG22/quickref
- Stark Plugin: getstark.co
- Contrast Checker: webaim.org/resources/contrastchecker

**Fonts:**
- Instrument Sans: fonts.google.com/specimen/Instrument+Sans
- Lora: fonts.google.com/specimen/Lora

---

Happy designing! 🌱❄️
