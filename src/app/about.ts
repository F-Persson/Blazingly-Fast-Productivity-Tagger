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
        isFlipped: true,
        isShowing: true,
        metaDescription: "This is a chrome extension for saving and sharing your bookmarks. It's a work in progress, but you can try it out. It's open source and free to use. If you have any feedback or suggestions please contact me at the bottom of this page."
    },
    {
        title: "TODO:",
        selection: "Make backend in C# for saving and sharing your tagItems\n\nA login option\n\nFor more info please see the github repo.\nYou'll find my contact info at the bottom of this page.",
        url: "https://github.com/F-Persson",
        id: -1,
        tags: ["Tagger", "Version 0.5", "Open Source", "feedback"],
        time: new Date().toLocaleString(),
        isEditing: false,
        isFlipped: true,
        isShowing: true,
        metaDescription: "This is a chrome extension for saving and sharing your bookmarks. It's a work in progress, but you can try it out. It's open source and free to use. If you have any feedback or suggestions please contact me at the bottom of this page."
    },
    {
        title: "How to",
        selection: "On any page:\n\n select some text (optional) and press ctrl + left click to save the page\n\npress ctrl + right click to open this option page\n\nClick the text (this text) to flip any card",
        url: "https://github.com/F-Persson/tagger",
        id: -2,
        tags: ["Instructions", "Info", "Howto"],
        time: new Date().toLocaleString(),
        isEditing: false,
        isFlipped: true,
        isShowing: true,
        metaDescription: "This is a chrome extension for saving and sharing your bookmarks. It's a work in progress, but you can try it out. It's open source and free to use. If you have any feedback or suggestions please contact me at the bottom of this page."
    },
    {
        title: "Privacy Policy",
        selection: "Privacy Policy for Tagger Chrome Extension\n\n I take your privacy seriously. This Privacy Policy explains how I collect, use, and disclose information through our Chrome extension, Tagger.\n\nData Collection\n\n Tagger is a Chrome extension that allows you to save notes and bookmarks. When you use Tagger, your notes and bookmarks are saved locally within the extension on your device. We do not collect or transmit any information about you or your device.\n\n Data Deletion\n\nYou can delete all data associated with Tagger at any time by removing the extension from your Chrome browser. Alternatively, you can delete individual bookmarks or notes by using the 'Delete' button within the extension.\n\nChanges to this Privacy Policy\n\nI reserve the right to modify this Privacy Policy at any time. If we make material changes to this policy, I will notify you here, by email, or by means of a notice on our website prior to the changes becoming effective.\n\n Contact me\n\nIf you have any questions about this Privacy Policy or our privacy practices, please contact us at persson_f@outlook.com.",
        url: "https://github.com/F-Persson/tagger/blob/master/privacy_policy",
        id: -3,
        tags: ["Privacy", "Policy"],
        time: new Date().toLocaleString(),
        isEditing: false,
        isFlipped: true,
        isShowing: true,
        metaDescription: "This is a chrome extension for saving and sharing your bookmarks. It's a work in progress, but you can try it out. It's open source and free to use. If you have any feedback or suggestions please contact me at the bottom of this page."
    }
];