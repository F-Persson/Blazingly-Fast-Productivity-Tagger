chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.action === "createWindow") {
            openPopup(request.selectedText, request.url, request.title, request.metaDescription);
        };
        if (request.action === "openOptionsTab") {
            openOptionsTab();
        };
    }
);

// open options tab
function openOptionsTab() {
    chrome.tabs.create({
        url: "index.html#options",
    });
};


//openPopup;
function openPopup(selectedText, url, title, metaDescription) {
    chrome.windows.getCurrent(function (currentWindow) {
        const windowWidth = 500;
        const windowHeight = 350;
        const left = Math.round(
            currentWindow.left + (currentWindow.width - windowWidth) / 2
        );
        const top = Math.round(
            currentWindow.top + (currentWindow.height - windowHeight) / 2
        );
        const popupUrl = `index.html#popup?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&selectedText=${encodeURIComponent(selectedText)}&metaDescription=${encodeURIComponent(metaDescription)}`;
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