async function execute() {
    console.log('Trying to hide news')
    var els = document.querySelectorAll("a[href='/r/news']")
    els.forEach(el => el.remove())
}
execute();
