import avatar from '../images/avatar.jpg'

const creactAvatar = function () {
  const img = new Image()
  img.src = avatar
  img.classList.add('avatar')
  document.getElementById('root').append(img)
}

export default creactAvatar