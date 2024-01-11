import ListItem from "./ListItem";

interface List {
    list: ListItem[],// 表示有ListItem类为元素组成的数组
    load(): void,
    save(): void,
    clearList(): void,
    addItem(itemObj: ListItem): void,
    removeItem(id: string): void
}