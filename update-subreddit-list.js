const removeSubredditFromList = (subreddit) => {
    chrome.storage.local.get("subreddits", (result) => {
        chrome.storage.local.set(
            { "subreddits": result.subreddits.split(',').filter(s => s !== subreddit).join(',')  }, 
            () =>  setCurrentSubredditList()
        );
    }); 
}

const setSubredditList = (subreddits) => {
    if (subreddits) {
        var ul = document.getElementById("subreddits-list")
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
    let name = document.getElementById('subreddit-input').value
    name = name.replace('r/', '').replaceAll('/', '')
    chrome.storage.local.get("subreddits", (result) => {
        chrome.storage.local.set(
            { "subreddits": `${result.subreddits},${name}`  }, 
            () =>  setCurrentSubredditList()
        );   
    }); 
}

document.getElementById("subreddit-save").addEventListener("click", addToList);
setCurrentSubredditList()
