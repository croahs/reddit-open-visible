// Old Reddit posts: <div class="thing link" data-permalink>; ads carry .promoted.
const POST_SELECTOR = ".thing.link[data-permalink]:not(.promoted)";

function isOnScreen(el) {
  const r = el.getBoundingClientRect();
  return r.height > 0 && r.bottom > 0 && r.top < window.innerHeight;
}

browser.runtime.onMessage.addListener((msg) => {
  if (msg !== "open-visible") return;

  // Collect first, hide after: hiding shifts the layout and would pull
  // posts below the fold into view mid-loop.
  const visible = [...document.querySelectorAll(POST_SELECTOR)].filter(isOnScreen);
  const urls = visible.map((post) => new URL(post.dataset.permalink, location.origin).href);
  // Reddit's own hide link saves the hide to the account. Logged out there
  // is no link, so fall back to hiding the row on this page only.
  visible.forEach((post) => {
    const hideLink = post.querySelector('a[data-event-action="hide"]');
    if (hideLink) hideLink.click();
    else post.style.display = "none";
  });

  return Promise.resolve(urls);
});
