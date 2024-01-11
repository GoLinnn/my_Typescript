// 定义一个Item接口
export interface Item {
    id: string,
    item: string,
    checked: boolean,
}
// 创建一个类 ListItem，这个类满足 Item 接口的定义，即，它具有 Item 接口规定的属性和方法，并将 ListItem 类作为模块的默认导出
//ListItem类实现（implements）Item接口，即这个类满足接口的结构
export default class ListItem implements Item {
    constructor(
        private _id: string = '',
        private _item: string = '',
        private _checked: boolean = false,
    ) { }
    //需要对三个私有变量创建 getter（获取器）和 setter（设置器）方法，使得外部可以通过 .id、.item 和 .checked 访问和修改这三个私有变量 _id、_item 和 _checked 。这样，从类的外部看， ListItem 类就具备了 id, item, checked 这三个属性，从而正确地实现了 Item 接口。
    get id(): string {
        return this._id
    }

    set id(id: string) {
        this._id = id
    }
    get item(): string {
        return this._item
    }

    set item(item: string) {
        this._item = item
    }
    get checked(): boolean {
        return this._checked
    }

    set checked(checked: boolean) {
        this._checked = checked
    }
}
// 使用set get的好处：对于使用者来说，他们可以像访问和修改公开属性一样使用这些getter和setter，而不需要知道对应的私有属性。同时，编写类代码的开发者可以在getter和setter中插入自定义的逻辑，例如进行输入值的检查，或者在属性被获取或设置时执行一些额外的操作。