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
  core, findTeams
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
  const projects = getProjects(projectLines, projectsNumber)
  const orderedProjects = allocateProjectsInRoadmap(projects)

  const result = getRowsFromResult(orderedProjects, contributors)
  // const skills = getSkillsFromContributors(contributors)
  // const result = core(projects, contributors, skills)
  return result
}

const start = () => {
  files.forEach(fileName => {
    const rowsList = parseFile(fileName)

    fs.outputFileSync(
      `./out/${fileName}.out`, 
      rowsList.join('\n'), 
      { encoding: 'utf-8' }
    )
  })
}

start()
