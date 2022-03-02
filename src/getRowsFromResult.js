'use strict'

const {findTeams} = require('./core')

function getRowsFromResult(orderedProjects, contributors) {
  const findTeamsForProjects = findTeams(orderedProjects, contributors)
  console.log('findTeamsForProjects', orderedProjects)

  const projectToStartAfter = findTeamsForProjects.filter(project => {
    console.log('project', project)
    return Object.values(project)[0].length < project
  })
  console.log('projectToStartAfter', projectToStartAfter)

  return result.reduce((acc, project) => {
    const [projectName, projectContributors] = Object.entries(project)[0]
    acc.push(projectName)
    acc.push(projectContributors.join(' '))
    return acc
  }, [result.length])
}

module.exports = { getRowsFromResult }