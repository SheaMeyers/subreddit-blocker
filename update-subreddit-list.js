const setCurrentSubredditList = () => {
    chrome.storage.local.get("subreddits", (result) => {
        document.getElementById("subreddit-input").value = ""
        var ul = document.getElementById("subreddits-list")
        result.subreddits.split(',').forEach(subreddit => {
            let li = document.createElement("li")
            li.innerHTML = subreddit
            ul.appendChild(li)
        })
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
