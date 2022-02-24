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
  return projects
}

const testList = [
  'Logging 5 10 5 1',
  'C++ 3',
  'WebServer 7 10 7 2',
  'HTML 3',
  'C++ 2',
  'WebChat 10 20 20 2',
  'Python 3',
  'HTML 3',
]

console.log(JSON.stringify(getProjects(testList), null, 2))

module.exports = { getProjects }