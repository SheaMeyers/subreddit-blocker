const execute = () => {
    setTimeout(() => {
        chrome.storage.local.get("subreddits", (result) => {
            result.subreddits.split(',').forEach(subreddit => {
                var els = document.querySelectorAll(`a[href='/r/${subreddit}/']`)
                els.forEach(el => el.parentElement.parentElement.parentElement.parentElement.remove())
            })
        })
    }, 5000)
}
execute();
