import { func1 } from './tree-shaking'

func1(123)

function trim (string) {
  // 先将字符串转为数组
  const stringToArray = string.split('')
  // 清除数组左边的空白项
  const leftNulIndex = stringToArray.findIndex(char => char !== ' ')
  stringToArray.splice(0, leftNulIndex)
  // 清除数组右边的空白项
  stringToArray.reverse()
  const rightNulIndex = stringToArray.findIndex(char => char !== ' ')
  stringToArray.splice(0, rightNulIndex)
  // 将数组顺序调整回来
  stringToArray.reverse()
  // 将调整完毕的数组重新转为字符串，即为最终结果
  const result = stringToArray.join('')
  return result
}