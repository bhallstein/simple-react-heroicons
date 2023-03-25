import { execSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { chdir } from 'node:process'
import deindent from './deindent.mjs'

execSync('mkdir -p build')
execSync('mkdir -p icons-src')
execSync('mkdir -p icons')
chdir('build')

execSync('npm pack @graywolfai/react-heroicons')
execSync('tar -zxf graywolfai-react-heroicons*.tgz')
execSync('rm graywolfai-react-heroicons*.tgz')

const str = readFileSync('package/dist/index.jsx').toString()
const funcs = Array.from(str.matchAll(/export[\s\S]+?}\);\n/g))
  .map(func => func[0])

funcs.forEach(func => {
  const name = func.match(/const ([\w]+)/)[1]
  const code = func.match(/<svg[\s\S]+<\/svg>/)[0]
    .replace(' ref={ref}', '')

  writeFileSync(`../icons-src/${name}.js`, deindent(`
    import React from 'react'
    export default function ${name}(props) {
      return ${code}
    }
  `))
})

chdir('../')
execSync(`
  npx swc \\
    $(find icons-src -name '*.js' -o -name '*.js' -type f) \\
    -d icons \\
    --config-file swcrc.json
`)

execSync('rm -rf build')
execSync('rm -rf icons-src')