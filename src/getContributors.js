'use strict'

function getContributors(otherRows, contributorsNumber) {
  let contributorIndex = 0
  const contributorMap = {}
  for (let currentContributor = 0; currentContributor < contributorsNumber; currentContributor++) {
    const [contributorName, numberOfSkills] = otherRows[contributorIndex].split(" ")
    const numberOfSkillsAsNumber = +numberOfSkills
    contributorMap[contributorName] = {}

    for (let skillIndex = 0; skillIndex < numberOfSkillsAsNumber; skillIndex++) {
      const [skillName, skillValue] = otherRows[contributorIndex + 1 + skillIndex].split(" ")
      contributorMap[contributorName][skillName] = +skillValue
    }
    contributorIndex = contributorIndex + numberOfSkillsAsNumber + 1
  }

  const projectLines = otherRows.slice(contributorIndex)

  return {
    contributors: contributorMap,
    projectLines
  }
}

const testList = [
  'Anna 1',
  'C++ 2',
  'Bob 2',
  'HTML 5',
  'CSS 5',
  'Maria 1',
  'Python 3',
  'Logging 5 10 5 1',
  'C++ 3',
  'WebServer 7 10 7 2',
  'HTML 3',
  'C++ 2',
  'WebChat 10 20 20 2',
  'Python 3',
  'HTML 3',
]

console.log(JSON.stringify(getContributors(testList, 3)))

module.exports = { getContributors }
