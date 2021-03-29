// import '@babel/polyfill'

const a = [
  new Promise(() => {}),
  new Promise(() => {})
]

a.map(item => {
  console.log(item)
})