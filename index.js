'use strict'

const path = require('path')
const fs = require('fs-extra')
const { get, set } = require('lodash')

const fileParser = require('./src/fileParser')
const { getContributors, getSkillsFromContributors } = require('./src/getContributors')
const { getProjects } = require('./src/getProjects')
const { getRowsFromResult } = require('./src/getRowsFromResult')
const {
  allocateProjectsInRoadmap,
  contributorsInProjects,
  core
} = require('./src/core')

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
    path.join(__dirname, `./input_data/${fileName}`),
    { splitInRows: true }
  )

  const [header, ...otherRows] = rows
  const [contributorsStringNumber, projectsStringNumber] = header.split(" ").map(Number)

  const contributorsNumber = +contributorsStringNumber
  const projectsNumber = +projectsStringNumber
  const { contributors, projectLines } = getContributors(otherRows, contributorsNumber)
  // console.log('contributors', JSON.stringify(contributors, null, 2))
  // console.log('projectLines', JSON.stringify(projectLines, null, 2))

  const projects = getProjects(projectLines, projectsNumber)
  const skills = getSkillsFromContributors(contributors)

  // console.log('projects', JSON.stringify(projects, null, 2))

  const result = core(projects, contributors, skills)
  return result
}

const start = () => {
  files.forEach(fileName => {
    // extract data from file
    const result = parseFile(fileName)
    
    const rowsList = getRowsFromResult(result)

    // put your core logic here

    // save data
    fs.outputFileSync(`./out/${fileName}.out`, rowsList.join('\n'), { encoding: 'utf-8' })
  })
}

start()
