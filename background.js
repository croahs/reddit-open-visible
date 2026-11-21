// Tabs opened by the shortcut carry this hash so content.js turns on
// RES "show images" there, and only there.
const SHOW_IMAGES_HASH = "#rov-show-images";

browser.commands.onCommand.addListener(async (command) => {
  if (command !== "open-visible") return;
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
  const urls = await browser.tabs.sendMessage(tab.id, "open-visible").catch(() => []);
  urls.forEach((url, i) => {
    browser.tabs.create({ url: url + SHOW_IMAGES_HASH, active: false, index: tab.index + 1 + i, openerTabId: tab.id });
  });
});
