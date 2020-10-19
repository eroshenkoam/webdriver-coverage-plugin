import "../css/popup.css";
import {DOWNLOAD_SOURCE, SHOW_SOURCE} from "./common/events";
import {getState} from "./common/commons";

chrome.storage.local.get('source', function (result) {
    document.getElementById('source').value = result.source;
});

document.getElementById('load').onclick = function () {
    let source = document.getElementById('source').value;
    chrome.storage.local.set({"source": source});
    chrome.runtime.sendMessage({type: DOWNLOAD_SOURCE, data: source}, function (response) {
        console.log(response);
    });
};

chrome.storage.local.get('state', function (result) {
    let state = getState(result)
    document.getElementById('enabled').textContent = state.enabled ? "Hide Locators" : "Show Locators";
});

document.getElementById('enabled').onclick = function () {
    chrome.storage.local.get('state', function (result) {
        let state = getState(result)
        chrome.storage.local.set({"state": {...state, enabled: !state.enabled}});
        document.getElementById('enabled').textContent = !state.enabled ? "Hide Locators" : "Show Locators";
        chrome.runtime.sendMessage({type: SHOW_SOURCE}, function (response) {
            console.log(response);
        });
    });
};

chrome.storage.local.get('state', function (result) {
    let state = getState(result)
    document.getElementById('onpage').textContent = state.onpage ? "Page Only: Off" : "Page Only: On";
});

document.getElementById('onpage').onclick = function () {
    chrome.storage.local.get('state', function (result) {
        let state = getState(result)
        console.log(result);
        chrome.storage.local.set({"state": {...state, onpage: !state.onpage}});
        document.getElementById('onpage').textContent = state.onpage ? "Page Only: On" : "Page Only: Off";
        chrome.runtime.sendMessage({type: SHOW_SOURCE}, function (response) {
            console.log(response);
        });
    });
};
