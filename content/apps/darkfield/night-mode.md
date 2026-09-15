---
title: Setting up Night Mode
description: How to turn your iPhone's screen red for stargazing using iOS accessibility settings, and how to toggle it with the Action Button, Back Tap, or Shortcuts.
eleventyNavigation:
  parent: Darkfield
  key: night-mode
  title: Night Mode
---

Your eyes take 20–30 minutes to fully adapt to the dark, and a single glance at a bright white phone screen can undo most of that. Red light is the least disruptive to dark adaptation, which is why astronomers use red torches and why observatories light their control rooms in red.

Darkfield doesn't ship its own red-screen mode — iOS already has a much better one built in. Because it's a system-level setting, it turns *everything* red: Darkfield, your star charts, Messages, the lock screen, the Home Screen, notifications — the lot. That's exactly what you want at the eyepiece.

This page walks through setting it up once, then wiring it to a physical button so you can toggle it in the dark without looking at the screen.

## Turn on the red colour filter

1. Open **Settings**.
2. Go to **Accessibility** › **Display & Text Size** › **Colour Filters**.
3. Turn on **Colour Filters**.
4. From the list of filters, choose **Colour Tint**.
5. Two sliders appear underneath: **Intensity** and **Hue**.

<div class="img-container-40">
  {% image "./color-filter-settings.png", "iOS Colour Filters settings with Colour Tint selected and both the Intensity and Hue sliders dragged fully to the right", "(max-width: 48rem) 100vw, 20rem", [400, "auto"] %}
</div>

### Setting intensity and hue

The screenshot above shows the settings you're aiming for:

- **Intensity** — drag this **all the way to the right**. At lower intensities the filter only tints the screen, and you'll still get plenty of blue and green light leaking through. At maximum, everything is rendered in shades of a single colour.
- **Hue** — drag this **all the way to the right** too. The hue slider runs through the colour wheel; the far right end is a deep red. (The far left is also red, but the right-hand end gives the purer, deeper tone you want.)

The row of coloured pencils at the top of the screen is a live preview. When both sliders are at maximum, every pencil should look red — if you can still make out green or blue ones, nudge the sliders further.

### Reduce brightness too

A red screen is only half the job; a *bright* red screen still hurts. While you're in **Display & Text Size**, also turn on **Reduce White Point** and set it to around 75–100%. This dims the brightest parts of the screen well below what the normal brightness slider allows.

Combined with the brightness slider at its lowest and Dark Mode enabled, this gets the screen dim enough to read comfortably next to a telescope.

## Toggle it with a button

You won't want to dig through Settings every time you look up from the eyepiece. iOS gives you several ways to flip the filter on and off with a single physical gesture.

### Action Button (iPhone 15 Pro and later)

The Action Button is the best option if your iPhone has one — it works with gloves on, without looking, and even from the lock screen.

1. Go to **Settings** › **Action Button**.
2. Swipe to **Accessibility**.
3. Tap **Choose a feature** and select **Colour Filters**.

Now press and hold the Action Button to toggle the red filter. If you'd rather keep the Action Button for something else, the options below work on every iPhone.

### Accessibility Shortcut (triple-click the side button)

1. Go to **Settings** › **Accessibility** › **Accessibility Shortcut** (it's at the very bottom).
2. Tick **Colour Filters**.

Triple-click the side button (or the Home button on older iPhones) to toggle it. If you tick more than one feature here, a menu will pop up each time asking which one you want — so keep it to just Colour Filters if you want a single-press toggle.

### Back Tap

1. Go to **Settings** › **Accessibility** › **Touch** › **Back Tap**.
2. Choose **Double Tap** or **Triple Tap**, and select **Colour Filters**.

Two quick taps on the back of the phone will toggle the filter. This works through most cases.

### Control Centre

1. Open Control Centre, then tap **+** in the top-left and choose **Add a Control**.
2. Search for **Accessibility Shortcuts** and add it.

Provided Colour Filters is set as your Accessibility Shortcut (see above), tapping this control toggles it. You can also add Reduce White Point and Dark Mode controls alongside it for a compact "night panel".

## Automate it with Shortcuts

For a truly hands-off setup, the Shortcuts app can turn the filter on and off for you. The **Set Colour Filters** action lets any shortcut or automation switch it.

### Turn it on when you open Darkfield

1. Open the **Shortcuts** app and go to the **Automation** tab.
2. Tap **+** › **App**.
3. Choose **Darkfield**, tick **Is Opened**, and select **Run Immediately**.
4. Tap **Next**, then **New Blank Automation**.
5. Add the **Set Colour Filters** action and set it to **Turn On**.

You can add a second automation for **Is Closed** that turns it off again — though if you're at the telescope you'll probably want to leave it on until you're back indoors.

### Turn it on at sunset

1. In the **Automation** tab, tap **+** › **Time of Day**.
2. Choose **Sunset**, add an offset if you like (for example 30 minutes after), and set it to repeat **Daily**.
3. Tap **Next**, add **Set Colour Filters** › **Turn On**, and optionally **Set Appearance** › **Dark** and **Set Brightness** to a low value.

Pair this with a **Sunrise** automation that turns everything back off.

### Build a "Night Mode" shortcut

If you'd rather bundle everything into one tap, create a shortcut that:

- **Set Colour Filters** › Toggle
- **Set Appearance** › Dark
- **Set Brightness** › 10%
- **Set Focus** › Do Not Disturb (optional, so notifications don't light the screen)

Add it to your Home Screen, the Lock Screen widget area, or a Control Centre **Shortcut** control — or assign the whole shortcut to the Action Button via **Settings** › **Action Button** › **Shortcut**.

## Things to know

- **Screenshots and photos aren't affected.** The filter is applied at the display level, so anything you capture will look normal.
- **The camera preview is red too**, which can make it hard to frame an astrophotography shot. Toggle the filter off briefly if you need to see true colours.
- **Face ID still works** in the dark — the sensors are infrared and don't rely on the screen.
- **Apple Watch** has its own **Colour Filters** setting under **Settings** › **Accessibility**, so you can give it the same treatment.
- **Mac and iPad** both have identical Colour Filters settings under **System Settings › Accessibility › Display** (Mac) and **Settings › Accessibility › Display & Text Size** (iPad), so Darkfield on a larger screen can be just as dark-adaptation-friendly.
