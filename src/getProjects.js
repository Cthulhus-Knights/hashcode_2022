'use strict'
function getProjects(projectsCsv, projectsNumber) {
  const projects = {}
  let y
  for (let i = 0; i < projectsCsv.length; i = y) {
    const projectLine = projectsCsv[i]
    const [name, daysString, scoreString, bestBeforeString, skillsNumberString] = projectLine.split(' ')
    const days = +daysString
    const score = +scoreString
    const bestBefore = +bestBeforeString
    const skillsNumber = +skillsNumberString
    projects[name] = {
      days,
      score,
      bestBefore,
      skillsNumber,
      skills: []
    }
    for (y = i + 1; y <= i + skillsNumber; y++) {
      const [skillName, skillLevel] = projectsCsv[y].split(' ')
      projects[name].skills.push({
        name: skillName,
        level: +skillLevel
      })
    }
  }
  if (Object.keys(projects).length !== projectsNumber) {
    throw new Error('projects.length !== projectsNumber')
  }
  return projects
}

module.exports = { getProjects }