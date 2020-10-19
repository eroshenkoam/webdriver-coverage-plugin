import {HIDE_SOURCE, SHOW_SOURCE} from "./common/events";
import {splitAndShowInfo} from "./hotspot/spltPage";
import {removePrevElements, showElements} from "./hotspot/showSource";
import {printTooltip} from "./hotspot/mouseOver";
import '../css/content.css'

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.action === SHOW_SOURCE) {
            try {
                var splattedBody = document.getElementById('bodyWrapper');
                if (typeof (splattedBody) === 'undefined' || splattedBody === null) {
                    splitAndShowInfo(request);
                }
                removePrevElements();
                showElements(request);
                sendResponse({text: "ok"});
            } catch (e) {
                sendResponse({text: "error"})
            }
        }
        if (request.action === HIDE_SOURCE) {
            removePrevElements();
        }
    })
;

document.onmouseover = function (event) {
    let target = event.target;

    let isTooltip = target.classList.contains("test-coverage");
    if (isTooltip) {
        printTooltip(target);
    }
};

let hasNewNode = true;

var observer = new MutationObserver(function (mutations) {
    for (let mutation of mutations) {
        if (hasNewNode) {
            break;
        }
        for (let node of mutation.addedNodes) {
            if (!(node instanceof HTMLElement)) {
                continue;
            }
            if (node.matches(".test-coverage")) {
                continue;
            }
            hasNewNode = true;
            break;
        }
    }
});
observer.observe(document.body, {subtree: true, childList: true});

function wroomwroom() {
    if (hasNewNode) {
        chrome.runtime.sendMessage({text: "mutation", type: SHOW_SOURCE}, function (response) {
            console.debug("mutation");
        });
        hasNewNode = false;
    }
}

setInterval(wroomwroom, 1000);
