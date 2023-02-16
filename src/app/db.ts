import Dexie, { Table } from 'dexie';


export interface TagItem {
    id: number;
    tags?: string[];
    time: string;
    selection: string;
    url: string;
    title: string;
    // id: number;
    // tags?: string[];
    // time: string;
    // selection?: string;
    // url: string;
    // title?: string;
}

export class AppDB extends Dexie {
    TagItem !: Table<TagItem>;

    constructor() {
        super("ngdexieliveQuery");
        this.version(3).stores({
            TagItem: 'id,tags,time,selection,url,title'
        });
        this.TagItem = this.table('TagItem');
    }

    getAllItems(): Promise<TagItem[]> {
        return this.TagItem.toArray();
    }
}

export const db = new AppDB();

        //     this.addSeedData();
        // }
        // private addSeedData(): void {
        //     this.TagItem.bulkAdd(
        //         [
        //             {
        //                 id: 0,
        //                 time: "13 feb 2030",
        //                 selection: "About this page",
        //                 url: "https://example.com",
        //                 title: "search here",
        //                 tags: ["Hello", "World"]
        //             },
        //             {
        //                 id: 1,
        //                 time: "31 march 2050",
        //                 selection: "Im a searchengine",
        //                 url: "https://bing.com",
        //                 title: "Bing",
        //                 tags: ["Bing", "search", "engine", "searchengine"]
        //             },
        //             {
        //                 id: 2,
        //                 time: "13 aug 1999",
        //                 selection: "C# MVC API tutorial",
        //                 url: "https://w3school.com",
        //                 title: "MVC API",
        //                 tags: ["funny", "programming", "Api", "C#", "MVC"]
        //             },
        //             {
        //                 id: 3,
        //                 time: "13 aug 1980",
        //                 selection: "Turn App into An Offline ToDo app",
        //                 url: "https://dexie.org/docs/Tutorial/Angular",
        //                 title: "Get started with Dexie in Angular",
        //                 tags: ["Dexie", "Angular", "Offline", "ToDo", "App"]
        //             },
        //         ]);