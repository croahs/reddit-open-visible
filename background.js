// Tabs opened by the shortcut carry this hash so content.js turns on
// RES "show images" there, and only there.
const SHOW_IMAGES_HASH = "#rov-show-images";

browser.commands.onCommand.addListener(async (command) => {
  if (command !== "open-visible") return;
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
  if (!tab) return;
  const urls = await browser.tabs.sendMessage(tab.id, "open-visible").catch(() => []);
  let index = tab.index + 1;
  for (const raw of urls) {
    const u = new URL(raw);
    u.hash = SHOW_IMAGES_HASH;
    await browser.tabs.create({ url: u.href, active: false, index: index++, openerTabId: tab.id });
  }
});
