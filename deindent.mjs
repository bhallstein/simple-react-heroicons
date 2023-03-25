export default function deindent(str) {
  str = str.replace(/^( *\n)*/, '')
  str = str.replace(/(\n *)*$/, '')
  const lines = str.split('\n')
  const min_indent = lines
    .filter(line => line.match(/^ +/))
    .map(line => line.match(/^ +/)[0].length)
    .reduce((accum, n) => n < accum ? n : accum, 999999)

  if (min_indent === 0) {
    return str
  }

  const regex = new RegExp(`^ {${min_indent}}`)
  return lines
    .map(line => line.replace(regex, ''))
    .join('\n')
}
