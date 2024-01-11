import './style.css'

// 声明listItem的类型，用type关键字
type ListItem = {
  id: number,
  item: string,
}

// 获取提交按钮
const form = document.getElementById('form') as HTMLFormElement

form.addEventListener('submit', (event: SubmitEvent) => {
  // 消除默认跳转效果
  event.preventDefault()

  // 获取输入框的内容
  const input = document.getElementById('input') as HTMLInputElement

  const listItem: ListItem = {
    // 利用日期获取随机时间
    id: new Date().getTime(),
    item: input.value
  }

  const ul = document.getElementById('list') as HTMLUListElement;
  const li = document.createElement('li') as HTMLLIElement
  li.innerHTML = listItem.item
  ul.append(li)
})

