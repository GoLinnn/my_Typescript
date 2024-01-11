import ListItem from "./ListItem";

interface List {
    list: ListItem[],// 表示以ListItem类为元素组成的数组
    load(): void,
    save(): void,
    clearList(): void,
    addItem(itemObj: ListItem): void,
    removeItem(id: string): void,
}

export default class FullList implements List {
    //由于所有FullList实例的操作都会影响到一个共享的数据源（这里是_list列表），为了保持数据一致，避免出现多个实例操作数据带来的冲突，采用了单例模式。
    // instance是FullList类的静态属性，可以直接通过类名访问，如FullList.instance。instance 属性直接属于 FullList 类，而不是 FullList 的具体实例。因此，类的所有实例都会共享这一个 instance 属性，而这个属性又被赋值为 new FullList()，也就是 FullList 类的一个实例，所以最终的结果就是所有所需的 FullList 操作最终都围绕着这一个实例进行，这保证了单例的唯一性。
    // 通过将构造函数设置为私有，并使用静态属性存储类的唯一实例，我们确保了整个应用程序中 FullList 的所有实例都是一样的，也就实现了单例模式。
    static instance: FullList = new FullList()
    // 私有构造函数，只能在类内创建实例
    private constructor(private _list: ListItem[] = []) { }

    get list(): ListItem[] {
        return this._list
    }
    load(): void {
        const storedList: string | null = localStorage.getItem('myList') //从本地存储中获取名为 'myList' 的数据
        if (typeof storedList !== 'string') return // 如果获取到的不是 string 类型的数据，就结束方法
        const parsedList: { _id: string, _item: string, _checked: boolean }[] = JSON.parse(storedList) // 用 JSON.parse() 把字符串转换为 JavaScript 对象
        parsedList.forEach(itemObj => { // 遍历从数据库取出的数组，加入到列表中
            const newListItem = new ListItem(itemObj._id, itemObj._item, itemObj._checked)
            FullList.instance.addItem(newListItem) // 把 ListItem 对象添加到列表中
        })
    }
    save(): void {
        // 把列表数据转换为 JSON 字符串，并保存到本地存储中
        localStorage.setItem('myList', JSON.stringify(this._list))
    }
    clearList(): void {
        this._list = []
        this.save()
    }
    addItem(itemObj: ListItem): void {
        this._list.push(itemObj)
        this.save()
    }
    removeItem(id: string): void {
        this._list = this._list.filter(item => item.id !== id)
        this.save()
    }
}