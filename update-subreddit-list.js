const removeSubredditFromList = (subreddit) => {
    chrome.storage.local.get("subreddits", (result) => {
        let subRedditsArray = result.subreddits.split(',')
        subRedditsArray = subRedditsArray.filter(s => s !== subreddit)
        chrome.storage.local.set({ "subreddits": subRedditsArray.join(',')  }, () =>  setCurrentSubredditList());
    }); 
}

const setSubredditList = (subreddits) => {
    var ul = document.getElementById("subreddits-list")
    if (subreddits) {
        ul.innerHTML = ""
        subreddits.split(',').forEach(subreddit => {
            let li = document.createElement("li")
            li.innerHTML = subreddit
            let button = document.createElement("button")
            button.innerHTML = "X"
            button.onclick = () => removeSubredditFromList(subreddit)
            li.appendChild(button)
            ul.appendChild(li)
        })
    }
}

const setCurrentSubredditList = () => {
    chrome.storage.local.get("subreddits", (result) => {
        document.getElementById("subreddit-input").value = ""
        setSubredditList(result.subreddits)
    })
}

const addToList = () => {
    const name = document.getElementById('subreddit-input').value
    chrome.storage.local.get("subreddits", (result) => {
        chrome.storage.local.set({ "subreddits": `${result.subreddits},${name}`  }, () =>  setCurrentSubredditList());   
    }); 
}

document.getElementById("subreddit-save").addEventListener("click", addToList);
setCurrentSubredditList()
