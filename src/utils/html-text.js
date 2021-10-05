// html->text
export function parseToText(str) {
  str = str.replace(/<br\s*[\/]?>/gi, '\n')
  str = str.replace(/<\/?[^>]*>/g, '') //去除HTML tag
  str = str.replace(/[ | ]*\n/g, '\n') //去除行尾空白
  str = str.replace(/\n[\s| | ]*\r/g, '\n') //去除多余空行
  str = str.replace(/ /gi, '') //去掉
  return str
}

// text->html
export function parseToHtml(str) {
  str = str.replace(/\n/gi, '<br/>')
  str = `<p>${str}</p>`
  return str
}
