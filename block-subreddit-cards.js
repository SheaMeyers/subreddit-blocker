const removeCards = () => {
  chrome.storage.local.get("subreddits", (result) => {
    result.subreddits.split(",").forEach((subreddit) => {
      var link = `r/${subreddit}`
      var els = document.querySelectorAll(`a[href$='${link}/' i]`);
      els.forEach((el) => {
        if (el.innerText.toLowerCase() === link.toLowerCase()) {
          if (el.href.includes("old.reddit.com")) {
            el.parentElement.parentElement.parentElement.parentElement.remove()
          }
          else {
            el.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.remove()
          }
        }
      });
    });
  });
};

const debounce = (func) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, 500);
  };
};

const onNodeInsert = debounce(() => removeCards());

const observer = new MutationObserver(onNodeInsert);
observer.observe(document.body, { subtree: true, childList: true });
