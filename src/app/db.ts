import Dexie, { Table } from 'dexie';


export interface TagItem {
    id: number;
    tags?: string[];
    time: string;
    selection: string;
    url: string;
    title: string;
    html: string;
}

export class AppDB extends Dexie {
    TagItem !: Table<TagItem>;

    constructor() {
        super("ngdexieliveQuery");
        this.version(4).stores({
            TagItem: 'id,tags,time,selection,url,title,html'
        });
        this.TagItem = this.table('TagItem');
    }

    getAllItems(): Promise<TagItem[]> {
        return this.TagItem.toArray();
    }
}

export const db = new AppDB();