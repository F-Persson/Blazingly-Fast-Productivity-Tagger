chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.action === "createWindow") {
            openPopup(request.selectedText, request.url, request.title);
        };
        if (request.action === "msgToBackground") {
            sendResponse({ farewell: "Msg received in background script" });
        };
    }
);


//openPopup;
function openPopup(selectedText, url, title) {
    chrome.windows.getCurrent(function (currentWindow) {
        const windowWidth = 400;
        const windowHeight = 350;
        const left = Math.round(
            currentWindow.left + (currentWindow.width - windowWidth) / 2
        );
        const top = Math.round(
            currentWindow.top + (currentWindow.height - windowHeight) / 2
        );
        const popupUrl = `index.html#popup?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&selectedText=${encodeURIComponent(selectedText)}`;
        chrome.windows.create({
            url: popupUrl,
            type: "popup",
            width: windowWidth,
            height: windowHeight,
            left: left,
            top: top,
        });
    });
};