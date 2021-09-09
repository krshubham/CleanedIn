let initialized = false;

function debounce(func, wait) {
    let timeout
    return function(...args) {
        const context = this
        clearTimeout(timeout)
        timeout = setTimeout(() => func.apply(context, args), wait)
    }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    hideMeta();
    if(request.type === 'NavCompleted') {
        console.log("here in nav completed");
    }
    if(request.type === 'RequestCompleted') {
        console.log("here in request completed");
    }
    sendResponse("Done");
});
/**
 * Returns the div which contains all the feed elements in linkedin
 * @returns {Element}
 */
function getFeed() {
   return document.querySelector('#main > div:last-child > div');
}

function hideMeta() {
    document.querySelectorAll('.comments-post-meta__headline, .feed-shared-actor__description').forEach(element => {
        if(element.className.indexOf("feed-shared-actor__description") !== -1) {
            element.innerHTML = "";
        } else {
            element.style.color = '#f2f2f2';
        }
    });
}

function main() {
    if(!initialized) {
        hideMeta();
        document.querySelector('#main > div:nth-child(3)').onclick = () => {
            hideMeta();
        };
        document.onscroll = debounce(() => {
            hideMeta()
        }, 100);
        initialized = true;
    }
}
main();