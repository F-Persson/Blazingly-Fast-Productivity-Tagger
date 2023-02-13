// listen for ctrl + mouse click
document.addEventListener('mousedown', function (e) {
    if (e.ctrlKey && e.button === 0) {
        let selectedText = getSelectedText();
        let url = window.location.href;
        let title = document.title;
        // setPopup(selectedText, url, title);
        openPopup(selectedText, url, title);
        //openPopup();
        //sendMessageToBackground(selectedText);

    };
    if (e.ctrlKey && e.button === 2) {
        var selectedText = getSelectedText();
        sendMessageToPopup(selectedText);
    };
});

// function setPopup(selectedText, url, title) {
//     (async () => {
//         chrome.runtime.sendMessage({
//             selectedText: selectedText,
//             url: url,
//             title: title,
//             action: "setPopup"
//         });
//     })();
// }


function openPopup(selectedText, url, title) {
    (async () => {
        chrome.runtime.sendMessage({
            selectedText: selectedText,
            url: url,
            title: title,
            action: "createWindow",
        });
    })();
}

// send message to popup (for testing only)
function sendMessageToPopup(Message) {
    (async () => {
        const response = await chrome.runtime.sendMessage({
            action: "msgToPopup",
            msg: Message
        },
            function (response) {
                console.log(response.farewell);
            });
    })();
};

// send message to background (for testing only
function sendMessageToBackground(Message) {
    (async () => {
        chrome.runtime.sendMessage({
            action: "msgToBackground",
        },
            function (response) {
                console.log(response.farewell);
            });
    })();
};

// Open popup




// get selected text
function getSelectedText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}
