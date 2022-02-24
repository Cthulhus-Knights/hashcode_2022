'use strict'

function allocateProjectsInRoadmap(projects) {
  return projects
}

function allocateContributorsInProjects(contributors, projects, skills) {
  let counterProjectAllocated = 0
  
  return Object.entries(projects).map(([projectName, project]) => {
    const {skills: projectSkills} = project
    // console.log('projectSkills', projectSkills)
    // console.log('skills', skills)

    
    const peopleAssigned = projectSkills.reduce((acc, {name, level}) => {
      const contributorsWithSkill = skills[name]
      // console.log('contributorsWithSkill', contributorsWithSkill)
      const findContributorByLevel = contributorsWithSkill.find(c => {
        return contributors[c][name] >= level
      })
      // console.log('findContributorByLevel', findContributorByLevel)
      if (findContributorByLevel && !acc.includes(findContributorByLevel)) {
        acc.push(findContributorByLevel)
      }
      return acc
    }, []).filter(item => item)

    if (peopleAssigned.length < project.skillsNumber) {
      return {
        projectName,
        peopleAssigned: []
      }
    }
    
    return {
      projectName,
      peopleAssigned
    }
  })
}

// 3
// WebServer
// Bob Anna
// Logging
// Anna
// WebChat
// Maria Bob

function findSkillNeeded (contributors, skillName, skillLevel) {
  
  // return person
  return 
} 

function core(projects, contributors, skills) {
  const orderedProjects = allocateProjectsInRoadmap(projects)
  const contributorsInProjects = allocateContributorsInProjects(contributors, orderedProjects, skills)
  const filteredContributorsInProjects = contributorsInProjects.filter(({ peopleAssigned }) => {
    return peopleAssigned.length > 0
  })
  // console.log('contributorsInProjects', filteredContributorsInProjects)
  return filteredContributorsInProjects
}


/*
  [
    {
      projectName: 'webServer',
      peopleAssigned: [
        'Bob',
        'Anna'
      ]
    },
    {
      projectName: 'Logging',
      peopleAssigned: [
        'Anna'
      ]
    },
    {
      projectName: 'webChat',
      peopleAssigned: [
        'Maria'
      ]
    }
  ]
*/


module.exports = {
  core,
  allocateContributorsInProjects,
  allocateProjectsInRoadmap,
}
