// import Dexie, { Table } from 'dexie';
// import { Injectable } from '@angular/core';



// export interface TagItem {
//     id: number;
//     tags?: string[];
//     time: string;
//     selection: string;
//     url: string;
//     title: string;
//     isEditing: boolean;
//     isFlipped: boolean;
//     isShowing: boolean;
// }


// @Injectable({
//     providedIn: 'root'
// })
// export class AppDB extends Dexie {
//     TagItem !: Table<TagItem>;

//     constructor() {
//         super("ngdexieliveQuery");
//         this.version(1).stores({
//             TagItem: 'id,tags,time,selection,url,title,isEditing,isFlipped, isShowing'
//         });
//         this.TagItem = this.table('TagItem');
//     }

//     getAllItems(): Promise<TagItem[]> {
//         return this.TagItem.toArray();
//     }



//     async updateItem(TagItem: TagItem) {
//         await db.TagItem.update(TagItem.id, {
//             tags: TagItem.tags,
//             selection: TagItem.selection,
//             isFlipped: TagItem.isFlipped,
//         });
//     }


// }

// export const db = new AppDB();