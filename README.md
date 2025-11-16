# IDEA9103_tut04_Group_G_HERMAN_INDIVIDUAL
### User Input–Driven Animation (Mouse & Keyboard)

This repository contains my **individual extension** of our group’s p5.js artwork.  
While the group version already includes animated wheels, bead chains and connectors, my individual contribution focuses on adding a **user input** layer so that the composition responds to the viewer’s mouse and keyboard actions.

---

## 1. How to Interact with the Work

After loading the page in a browser, the artwork will automatically display a field of rotating wheels and animated hexagonal bead chains.

You can interact with the work in the following ways:

### Mouse Movement – “Magnet” Effect
- Move the mouse across the canvas.
- Wheels **near the cursor** are gently **pulled toward the mouse**, as if the cursor is a soft magnet.
- The closer a wheel is to the cursor:
  - the more it shifts towards it,
  - and the faster it rotates.
- When the mouse moves away, wheels **smoothly slide back** to their original positions.

### Mouse Click – Freeze / Unfreeze Wheels
- Click on a wheel to **freeze** it in place.
- A frozen wheel:
  - no longer follows the mouse magnet,
  - remains at its current position,
  - is highlighted with an extra outline.
- Click the same wheel again to **unfreeze** it and allow it to move with the mouse again.

### ⌨ Keyboard Controls
- Press **`1`** – Enable mouse magnet mode (default).  
  Wheels respond to the mouse and are attracted to the cursor.
- Press **`2`** – Disable magnet mode.  
  Wheels smoothly return to their original layout and only rotate in place.

These simple controls allow the viewer to gently reshape the motion of the composition and explore the structure of the image through interaction.

---

## 2. Individual Approach to Animating the Group Code

For my individual task, I chose to drive the animation using **interaction (user input)** rather than audio, Perlin noise or purely time-based events.

My design goals were:

- Keep the **visual identity** and **layout** from the group version.
- Add a **subtle behavioural layer** that reacts to the viewer.
- Use only techniques that are consistent with what we learned in the course (mouse input, key input, distance-based motion).

Instead of introducing new graphic elements, I focused on changing **how the wheels behave** when the user interacts:

1. The mouse position acts like a **soft magnet**:
   - each wheel is pulled towards the cursor based on distance;
   - nearby wheels move more, distant wheels move less;
   - rotation speed increases as a wheel approaches the mouse.

2. The user can **freeze** specific wheels:
   - this enables the viewer to “pin” parts of the composition in place,
   - and gradually build a customised arrangement.

3. Two **global modes** are provided:
   - interactive mode (magnet on),
   - and passive mode (magnet off, original layout restored).

In this way, my version does not redesign the artwork itself; instead, it changes how the viewer **experiences and controls** the existing visual system.

---

## 3. Driver Chosen – Interaction / User Input

Among the four options (audio, interaction, Perlin noise, time),  
I chose **interaction (user input)** as the primary driver of my individual animation.

More specifically:

- **Mouse input** (position and clicks) controls:
  - the attraction force applied to each wheel,
  - and the freeze/unfreeze state of wheels.
- **Keyboard input** (keys `1` and `2`) controls:
  - whether the magnet interaction is enabled or disabled.

---

## 4. Animated Properties and How My Version Is Unique

### Animated Properties

In the original group version, the main animations were:

- continuous wheel rotation,
- hex bead oscillations,
- and connector motion.

In my individual version, I added interaction-based animation **only to the wheels**, focusing on:

1. **Wheel Position (`x`, `y`)**
   - Each wheel has:
     - a **base position** (`baseX`, `baseY`) from the group layout,
     - and a **current position** (`x`, `y`) that can shift towards the mouse.
   - When the cursor is close, the wheel moves a small step towards the cursor each frame.
   - When the cursor is far away or the magnet is disabled, the wheel eases back towards its base position.

2. **Wheel Rotation Speed (`rotationSpeed`)**
   - Rotation speed increases slightly when the wheel is near the cursor.
   - It slowly returns to the original `baseRotationSpeed` when the wheel is far from the mouse.

3. **Wheel State (`isFrozen`)**
   - A boolean flag that is toggled when the wheel is clicked.
   - Frozen wheels ignore the magnet effect and remain fixed in place (but may still rotate).

4. **Global Interaction Mode (`magnetEnabled`)**
   - A simple global flag controlled by key presses (`1` and `2`) to turn the magnet behaviour on or off.

### How This Is Unique from Other Group Members

- My version focuses on **distance-based motion and interactivity**:
  - I change how the wheels move in response to the viewer.
- I am the only one in the group who:
  - uses the mouse as a “magnet” to influence wheel positions,
  - and allows users to **freeze/unfreeze** individual elements.

---

## 5. References and Inspiration for the Animation

My individual interaction design was shaped by both artistic and technical references related to cursor-based motion and simple interactive behaviour.

### 5.1 Zach Lieberman – Cursor-Responsive Motion Sketches
I was inspired by **Zach Lieberman’s** daily interactive sketches, where simple shapes (lines, dots, circles) react gently to the viewer’s cursor. Many of his works use small mouse movements to generate expressive motion and distortion in geometric forms.  
This influenced my decision to apply a **soft attraction** to the wheels so that they feel more alive when the user moves the mouse.

Reference: https://zachlieberman.medium.com/

### 5.2 Rafael Rozendaal – Minimal Interactive Websites
**Rafael Rozendaal’s** interactive websites, such as *Into Time* and *Much Better Than This*, demonstrate how very simple user actions (moving or clicking the cursor) can drastically change the experience of a static visual composition.  
This inspired me to keep my own interaction very lightweight and intuitive: instead of introducing complex controls, I relied only on mouse movement, clicking, and two keyboard keys to change the behaviour of the existing wheels.

Reference: https://www.newrafael.com/websites/

### 5.3 p5.js / OpenProcessing – Distance-Based Mouse Interaction
On the technical side, I looked at simple cursor-interaction examples from **p5.js** documentation and **OpenProcessing** sketches. These often use `dist()` and basic easing to move particles or shapes toward the cursor.  
I adapted this idea directly to the wheels, using distance-based interpolation to create the “mouse magnet” effect.

References:  
- p5.js Interactivity: https://p5js.org/learn/interactivity.html  
- OpenProcessing: https://openprocessing.org/

---

## 6. Technical Explanation of the Interaction Code

### 6.1 New State in the `Wheel` Class

I added several properties to each `Wheel`:

this.baseX = x;       // original layout x
this.baseY = y;       // original layout y
this.x = x;           // current animated x
this.y = y;           // current animated y

this.baseRotationSpeed = random(-0.01, 0.01);
this.rotationSpeed = this.baseRotationSpeed;

this.isFrozen = false;  // toggled by mouse clicks

let magnetEnabled = true;  // controlled by keys 1 and 2

### 6.2 Mouse Magnet Behaviour in Wheel:

#### (1) Computes the distance from the mouse to its base position:
- let d = dist(mouseX, mouseY, this.baseX, this.baseY);


#### (2) Defines an influence radius:
- let influenceRadius = this.baseRadius * 4;


#### 3 If the wheel is within this radius, a simple strength factor is computed:
- let strength = 1 - d / influenceRadius;  // from 0 (far) to 1 (very close)


#### (4) The wheel is moved a small step towards the cursor:
- this.x += (mouseX - this.x) * 0.08 * strength;
- this.y += (mouseY - this.y) * 0.08 * strength;


#### (5) The rotation speed increases near the mouse:
- this.rotationSpeed = this.baseRotationSpeed * (1 + 2 * strength);


#### (6) If the wheel is outside the radius or the magnet is disabled (magnetEnabled == false), it eases back:
- this.x += (this.baseX - this.x) * 0.05;
- this.y += (this.baseY - this.y) * 0.05;
- this.rotationSpeed += (this.baseRotationSpeed - this.rotationSpeed) * 0.1;

##### If this.isFrozen is true, the wheel ignores the magnet effect and only gently returns towards its base position.

## 7. Changes Made Compared to the Group Code


Modified files:

- wheel.js

Added base and current positions (baseX, baseY, x, y),

Added isFrozen, baseRotationSpeed, and rotationSpeed logic,

Added magnet behaviour in update(),

Added a highlight outline for frozen wheels in display().

- sketch.js

Added magnetEnabled as a global variable,

Added mousePressed() to toggle wheel isFrozen,

Added keyPressed() to enable/disable the magnet mode.
