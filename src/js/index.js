import Header from './header'
import Content from './content'
import avatar from '../images/avatar.jpg'
import style from '../css/index.scss'
import creactAvatar from './creactAvatar'

new Header()
new Content()

const img = new Image()
img.src = avatar
img.classList.add(style.avatar)

document.getElementById('root').append(img)

creactAvatar()

console.log(102)