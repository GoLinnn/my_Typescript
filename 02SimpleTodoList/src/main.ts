import './style.css'

// 声明listItem的类型，用type关键字
type ListItem = {
  id: string,
  item: string,
}

// 在整个页面（或者文档）被完全加载和解析完成后（也就是全部的DOM构建完成后），执行render函数。
document.addEventListener('DOMContentLoaded', render)

// 获取提交按钮
const form = document.getElementById('form') as HTMLFormElement

form.addEventListener('submit', (event: SubmitEvent) => {
  // 消除默认跳转效果
  event.preventDefault()

  // 获取输入框的内容
  const input = document.getElementById('input') as HTMLInputElement

  const listItem: ListItem = {
    // 利用日期获取随机时间
    id: new Date().getTime().toString(),
    item: input.value
  }

  // 将输入存储到本地
  localStorage.setItem(listItem.id, listItem.item)

  render()
  // 清空输入框内容
  input.value = ''
})

// 渲染函数
function render(): void {
  const ul = document.getElementById('list') as HTMLUListElement
  ul.innerHTML = "";  // 清空列表

  for (let i = 0; i < localStorage.length; i++) {
    let itemKey = localStorage.key(i)
    // getItem需要的参数是字符串，要先判断itemKey是否为空
    if (itemKey !== null) {
      let itemValue = localStorage.getItem(itemKey?.toString())

      if (itemValue === null) return
      // 添加li
      const li = document.createElement('li') as HTMLLIElement
      li.innerHTML = itemValue
      ul.append(li)
      // 添加删除按钮
      const btn_delete = document.createElement('button') as HTMLButtonElement
      btn_delete.textContent = 'X'
      btn_delete.addEventListener('click', () => {
        localStorage.removeItem(itemKey!) //!非空断言操作符，已经检查过itemKey不为null.
        render() // 从localStorage移除项后，重新渲染列表
      })
      li.append(btn_delete)
    }
  }
}

