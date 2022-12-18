const setCurrentSubredditList = () => {
    chrome.storage.local.get("subreddits", (result) => {
        document.getElementById("subreddits-list").innerHTML = result.subreddits
        document.getElementById("subreddit-input").value = ""
    });
}

const addToList = () => {
    const name = document.getElementById('subreddit-input').value
    chrome.storage.local.get("subreddits", (result) => {
        chrome.storage.local.set({ "subreddits": `${result.subreddits},${name}`  }, () =>  setCurrentSubredditList());   
    }); 
}

document.getElementById("subreddit-save").addEventListener("click", addToList);
setCurrentSubredditList()
