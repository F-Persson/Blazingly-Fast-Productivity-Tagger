import { TagItem } from 'src/app/db.service';

export const aboutItem: TagItem[] = [
    {
        title: "Hi, my name is Francis, I'm a software developer",
        selection: "I developed this extension to improve my software skills and learn Angular.\n\nI hope that you also find it helpful.",
        url: "https://fpersson.com",
        id: 0,
        tags: ["about", "contact", "help", "feedback"],
        time: new Date().toLocaleString(),
        isEditing: false,
        isFlipped: false,
        isShowing: true,
    },
    {
        title: "TODO:",
        selection: "Make backend in C# for saving and sharing your tagItems\n\nA login option\n\nFor more info please see the github repo.\nYou'll find my contact info at the bottom of this page.",
        url: "https://github.com/F-Persson",
        id: -1,
        tags: ["Tagger", "Version 0.5", "Open Source", "feedback"],
        time: new Date().toLocaleString(),
        isEditing: false,
        isFlipped: false,
        isShowing: true,
    },
    {
        title: "How to",
        selection: "On any page:\n\n select some text (optional) and press ctrl + left click to save the page\n\npress ctrl + right click to open this option page\n\nClick the text (this text) to flip any card",
        url: "https://tothechromeextensionurl.com",
        id: -2,
        tags: ["Instructions", "Info", "Howto"],
        time: new Date().toLocaleString(),
        isEditing: false,
        isFlipped: true,
        isShowing: true,
    }
];