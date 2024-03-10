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
            let pel = el.parentElement
            while (pel) {
              // Reddit feed has two styles for it's feed.  The style it uses appears to be random
              // 1. Handles newer style where there is just a border between "cards"
              if (pel.nodeName === 'SHREDDIT-POST') {
                pel.remove()
                pel = null
              } 
              // 2. Handles older style where each post looks like an actual card
              else if (pel.dataset.adclicklocation || pel.classList.contains('Post')) {
                newPel = pel.parentElement
                pel.remove()
                pel = newPel
              } 
              else {
                pel = pel.parentElement
              }
            }
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
