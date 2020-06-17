import "../../css/sidebar.css";
import moment from "moment";
import {showElements} from "./showSource";

const wrapAll = (target, wrapper = document.createElement('div')) => {
    [...target.childNodes].forEach(child => wrapper.appendChild(child));
    target.appendChild(wrapper);
    return wrapper
};

function getTestItems(locator) {
    let items = "";
    locator.tests.forEach(test => {
        let duration = moment.duration(test.duration, 'milliseconds');
        let durationTime = moment()
            .seconds(duration.seconds())
            .minutes(duration.minutes())
            .format('mm:ss');
        items += '<li class="test-item">';
        if (test.url) {
            items += `<a target="_blank" href="${test.url}">${test.name}</a>`;
        } else {
            items += `<span>${test.name}</span>`
        }
        items += `<span class="status status-${test.status}">${test.status}</span>`;
        items += `<span class="time">(${durationTime})</span>`;
        items += '</li>'
    });
    return items;
}

function getTestsFromLocators(locators) {
    let tests = "<ul class='test-list'>";
    locators.forEach(locator => {
        if (locator.fullPath !== null) {
            tests += getTestItems(locator)
        }
    });
    tests += "</ul>";
    return tests;
}

function barTabs() {
    var info = document.createElement("div");
    info.id = "coverageInfoBar";

    info.innerHTML =
        '<div class="coverageInfoBar">' +
        '<section id="section1"></section>' +
        '</div>';
    return info;
}

export function splitAndShowInfo(source) {
    if (source === null || source === undefined) {
        return;
    }

    const bodyWrapper = wrapAll(document.body);
    bodyWrapper.id = "bodyWrapper";

    var bar = document.createElement("div");
    bar.classList.add("infoBar");

    // Refresh
    let refreshB = document.createElement("button");
    refreshB.onclick = function () {
        showElements(source);
    };
    refreshB.innerHTML = "Обновить локаторы";
    bar.appendChild(refreshB);

    // Tabs
    bar.appendChild(barTabs());

    var row = document.createElement("div");
    row.classList.add("pageContainer");

    row.appendChild(bodyWrapper);
    row.appendChild(bar);
    document.body.appendChild(row);

    var section1 = document.getElementById("section1");
    section1.innerHTML = getTestsFromLocators(source);
}
