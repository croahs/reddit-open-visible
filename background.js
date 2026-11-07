browser.commands.onCommand.addListener(async (command) => {
  if (command !== "open-visible") return;
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
  const urls = await browser.tabs.sendMessage(tab.id, "open-visible").catch(() => []);
  urls.forEach((url, i) => {
    browser.tabs.create({ url, active: false, index: tab.index + 1 + i, openerTabId: tab.id });
  });
});
