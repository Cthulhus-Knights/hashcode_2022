'use strict'

function getRowsFromResult(result) {
  // return result
  return result.reduce(
    (acc, { projectName, peopleAssigned }) => {
      acc.push(...[projectName, peopleAssigned.join(' ')])
      return acc
    },
    [result.length]
  )
}

const testRowsFromResult = [
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

// console.log(JSON.stringify(getRowsFromResult(testRowsFromResult, null, 2)))

module.exports = { getRowsFromResult }