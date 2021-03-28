const Header = function () {
  const dom = document.getElementById('root')
  const header = document.createElement('div')
  header.innerText = 'Header'
  dom.append(header)
}

export default Header