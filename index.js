'use strict'

const path = require('path')
const fs = require('fs-extra')
const { get, set } = require('lodash')

const getContributors = require('./src/getContributors')
const getProjects = require('./src/getProjects')

const files = [
  'a_an_example.in.txt',
  // 'b_better_start_small.in.txt',
  // 'c_collaboration.in.txt',
  // 'd_dense_schedule.in.txt',
  // 'e_exceptional_skills.in.txt',
  // 'f_find_great_mentors.in.txt'
]

function parseFile(fileName) {
  const { rows } = fileParser(
    path.join(__dirname, `./fixtures/${fileName}.in`),
    { splitInRows: true }
  )
  const [header, otherRows] = rows
  const [contributorsNumber, projectNumber] = header.split(" ").map(value => Number(value))
  const { contributors, projectLines } = getContributors(otherRows, contributorsNumber)
  const { projects } = getProjects(projectLines, projectNumber)
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
