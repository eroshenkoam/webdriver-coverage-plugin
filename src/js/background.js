import '../img/icon-128.png'
import '../img/icon-34.png'
import {DOWNLOAD_SOURCE, SHOW_SOURCE} from "./common/events";
import {downloadDataAction, showPinsAction} from "./hotspot/actions";

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.type === DOWNLOAD_SOURCE) {
            downloadDataAction(request.data);
            sendResponse({text: "ok"});
        }

        if (request.type === SHOW_SOURCE) {
            showPinsAction();
            sendResponse({text: "ok"});
        }
    });
