/*移除HTML标签代码*/
export function parseToText(str) {
  str = str.replace(/<br\s*[\/]?>/gi, '\n')
  str = str.replace(/<\/?[^>]*>/g, '') //去除HTML tag
  str = str.replace(/[ | ]*\n/g, '\n') //去除行尾空白
  str = str.replace(/\n[\s| | ]*\r/g, '\n') //去除多余空行
  str = str.replace(/ /gi, '') //去掉
  return str
}
//转意符换成普通字符
export function parseToHtml(str) {
  str = str.replace(/\n/gi, '<br/>')
  str = `<p>${str}</p>`
  return str
}
