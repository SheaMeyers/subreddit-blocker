const execute = () => {
  chrome.storage.local.get("subreddits", (result) => {
    result.subreddits.split(",").forEach((subreddit) => {
      var els = document.querySelectorAll(`a[href^='/r/${subreddit}/' i]`);
      els.forEach((el) =>
        el.parentElement.parentElement.parentElement.parentElement.remove()
      );
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

const onNodeInsert = debounce(() => execute());

document.addEventListener("DOMNodeInsertedIntoDocument", onNodeInsert, true);
