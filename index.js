'use strict'

const path = require('path')
const fs = require('fs-extra')
const { get, set } = require('lodash')

const files = [
  // 'a',
  // 'b',
  // 'c',
  // 'd',
  // 'e',
  // 'f'
  // 'test'
]

function parseFile(fileName) {
  const { rows } = fileParser(
    path.join(__dirname, `./fixtures/${fileName}.in`),
    { splitInRows: true }
  )
  const [] = rows
  return {}
}

const start = () => {
  files.forEach(fileName => {
    // extract data from file
    const {} = parseFile(fileName)

    // put your core logic here

    // save data
    fs.outputFileSync(`./out/${fileName}.out`, rowsList.join('\n'), { encoding: 'utf-8' })
  })
}

start()
