'use strict'

function getContributors (otherRows, contributorsNumber) {
   
    let contributorMap = {}
    let contributorIndex = 0
    console.log('contributorIndex: ', contributorIndex)
    for (let currentContributor = 0; currentContributor <= contributorsNumber; currentContributor++) {
        const [contributorName, numberOfSkills] = otherRows[contributorIndex].split(' ')
        contributorMap = {
            [contributorName]: {}
        }

        for (let skillIndex = 0; skillIndex <= numberOfSkills; skillIndex++) {
            const [skillName, skillValue] = otherRows[contributorIndex + 1 + skillIndex]
            console.log('skill', skillName, skillValue)
            contributorMap[contributorName][skillName] = skillValue
        }
        contributorIndex = contributorIndex + numberOfSkills
    }
    // 
    return {
        contributors: {}, 
        projectLines: {}
    }
}

module.exports = getContributors
