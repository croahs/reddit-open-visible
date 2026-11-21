# Reddit Open Visible

Firefox extension for old Reddit. Press **Alt+Shift+A** on a feed and every
post on screen gets its comments opened in background tabs (in feed order),
then hidden with Reddit's own hide, so it stays hidden on your account.
Logged out, posts are only hidden on the page until reload. Ads are skipped.
With Reddit Enhancement Suite installed, each new tab turns on RES
**show images**.

Change the shortcut in `about:addons` → gear → Manage Extension Shortcuts.
Avoid Alt+letters that open Firefox menus (F, E, V, S, B, P, T, H).

## Try it

`about:debugging` → This Firefox → Load Temporary Add-on → pick
`manifest.json`. Removed when Firefox restarts.

## Install permanently

Regular Firefox only keeps signed add-ons. Signing as unlisted is free:

1. If you forked this, change `browser_specific_settings.gecko.id` in
   `manifest.json` to your own (e.g. `reddit-open-visible@yourname`).
   IDs are unique on addons.mozilla.org.
2. Zip `manifest.json`, `background.js` and `content.js` (files at the zip
   root, no folder).
3. addons.mozilla.org → Developer Hub → Submit a New Add-on → **On your
   own** → upload the zip.
4. Once signed, open the version page and click the `.xpi` link in Firefox.

For updates, bump `version` in `manifest.json` and sign again.

## Files

- `manifest.json` – extension config and default shortcut
- `background.js` – receives the shortcut, opens the tabs
- `content.js` – finds on-screen posts, returns their comment links, hides them
