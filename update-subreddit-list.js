const setCurrentSubredditList = () => {
    chrome.storage.local.get("subreddits", (result) => {
        document.getElementById("subreddits-list").innerHTML = result.subreddits
        document.getElementById("subreddit-input").value = ""
    });
}

const addToList = () => {
    const name = document.getElementById('subreddit-input').value
    chrome.storage.local.set({ "subreddits": name }, () =>  setCurrentSubredditList());    
}

document.getElementById("subreddit-save").addEventListener("click", addToList);
setCurrentSubredditList()
