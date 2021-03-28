const createItem = function () {
  const btn = document.createElement('button')
  btn.innerText = '添加'
  btn.onclick = function () {
    const item = document.createElement('div')
    item.innerText = 'item'
    item.classList.add('item')
    document.body.appendChild(item)
  }
  document.body.appendChild(btn)
}

export default createItem