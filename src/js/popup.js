import "../css/popup.css";
import {DOWNLOAD_SOURCE, SHOW_SOURCE} from "./common/events";

chrome.storage.local.get('source', function (result) {
    document.getElementById('source').value = result.source;
});

chrome.storage.local.get('enabled', function (result) {
    document.getElementById('toggle').textContent = result.enabled ? "Hide Locators" : "Show Locators";
});

document.getElementById('load').onclick = function () {
    let source = document.getElementById('source').value;
    chrome.storage.local.set({"source": source});
    chrome.runtime.sendMessage({type: DOWNLOAD_SOURCE, data: source}, function (response) {
        console.log(response);
    });
};

document.getElementById('toggle').onclick = function () {
    chrome.storage.local.get('enabled', function (result) {
        console.log(result);
        chrome.storage.local.set({"enabled": !result.enabled});
        document.getElementById('toggle').textContent = !result.enabled ? "Hide Locators" : "Show Locators";
        chrome.runtime.sendMessage({type: SHOW_SOURCE}, function (response) {
            console.log(response);
        });
    });
};
