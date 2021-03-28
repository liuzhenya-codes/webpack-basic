const Content = function () {
  const dom = document.getElementById('root')
  const content = document.createElement('div')
  content.innerText = 'Content'
  dom.append(content)
}

export default Content