const removeSubredditFromList = (subreddit) => {
    chrome.storage.local.get("subreddits", (result) => {
        chrome.storage.local.set(
            { "subreddits": result.subreddits.split(',').filter(s => s !== subreddit).join(',')  }, 
            () =>  setCurrentSubredditList()
        );
    }); 
}

const setSubredditList = (subreddits) => {
    var ul = document.getElementById("subreddits-list")
    ul.innerHTML = ""    
    subreddits.split(',').forEach(subreddit => {
        if(subreddit) {
            let li = document.createElement("li")
            li.innerHTML = subreddit
            li.classList = "list-group-item d-flex justify-content-between align-items-center"
            let button = document.createElement("button")
            button.innerHTML = "X"
            button.classList = "btn btn-danger"
            button.onclick = () => removeSubredditFromList(subreddit)
            li.appendChild(button)
            ul.appendChild(li)
        }
    })
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
        const newSubreddits = result.subreddits ? 
            result.subreddits.split(',').concat([name]).sort().join(',') : 
            name
        chrome.storage.local.set(
            { "subreddits": newSubreddits }, 
            () =>  setCurrentSubredditList()
        );   
    }); 
}

document.getElementById("subreddit-input").addEventListener("keypress", (e) => e.key === "Enter" ? addToList() : null);
document.getElementById("subreddit-save").addEventListener("click", addToList);
setCurrentSubredditList()
