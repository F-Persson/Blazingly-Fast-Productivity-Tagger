// listen for ctrl + mouse click
document.addEventListener('mousedown', function (e) {
    if (e.ctrlKey && e.button === 0) {
        let selectedText = getSelectedText();
        if (selectedText === "") {
            selectedText = "Click to edit";
        }
        let url = window.location.href;
        let title = document.title;
        let metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription = metaDescription.getAttribute("content");
        }
        // let html = gethtml();
        openPopup(selectedText, url, title, metaDescription);
    };
    if (e.ctrlKey && e.button === 2) {
        openOptionsTab();
    };
});

function openOptionsTab() {
    chrome.runtime.sendMessage({
        action: "openOptionsTab",
    });
}

// Send message to background.js to open popup
function openPopup(selectedText, url, title, metaDescription) {
    (async () => {
        chrome.runtime.sendMessage({
            selectedText: selectedText,
            url: url,
            title: title,
            action: "createWindow",
            metaDescription: metaDescription
        });
    })();
}

// function gethtml() {
//     const selection = window.getSelection();
//     const range = selection.getRangeAt(0);
//     const container = document.createElement("div");
//     container.appendChild(range.cloneContents());
//     const html = container.innerHTML;
//     return html;
// }

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
