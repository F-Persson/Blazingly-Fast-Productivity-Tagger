// listen for ctrl + mouse click
document.addEventListener('mousedown', function (e) {
    if (e.ctrlKey && e.button === 0) {
        let selectedText = getSelectedText()
        let url = window.location.href;
        let title = document.title;
        let metaDescription = document.querySelector('meta[name="description"]') ? document.querySelector('meta[name="description"]').getAttribute("content") : selectedText;
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

// get selected text
function getSelectedText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
        // for different browsers
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    if (text === "") {
        return "Click to edit";
    }
    return text;
}