import {HIDE_SOURCE, SHOW_SOURCE} from "../common/events";
import {getState} from "../common/commons";

let locators;

export function showPinsAction() {
    console.log("Show Pins Action")
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.storage.local.get('state', function (result) {
            let state = getState(result)
            if (state && state.enabled) {
                console.log("Show source");
                chrome.tabs.sendMessage(tabs[0].id, {
                    text: "showSource",
                    action: SHOW_SOURCE,
                    onpage: state.onpage,
                    data: locators
                }, function (response) {
                    console.log("show sent " + response.text);
                });
            } else {
                console.log("Hide source");
                chrome.tabs.sendMessage(tabs[0].id, {
                    text: "showSource",
                    action: HIDE_SOURCE,
                    data: locators
                }, function (response) {
                    console.log("show sent " + response.text);
                });
            }
        });
    });
}

export function downloadDataAction(source) {
    let xhr = new XMLHttpRequest();

    xhr.open("GET", source);
    xhr.timeout = 10000;
    xhr.send();
    xhr.onreadystatechange = function () {
        console.log("xhr.readystate = " + xhr.readyState);
        if (xhr.readyState === 4) {
            console.log("xhr" + xhr.response.length);
            console.log("xhr" + typeof (xhr.responseText));

            locators = JSON.parse(xhr.responseText);
            showPinsAction();
        }
    };
}
