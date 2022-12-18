const execute = () => {
    setTimeout(() => {
        console.log('Trying to hide')
        var els = document.querySelectorAll("a[href='/r/aww/']")
        console.log('Got els ' + els.length)
        els.forEach(el => el.parentElement.parentElement.parentElement.parentElement.remove())
    }, 2000)
}
execute();
