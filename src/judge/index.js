'use strict'

const path = require('path')
const fileParser = require('../fileParser')

const files = ['b']

function judgeSystem() {
  console.log('received files --> ', files)
  const scores = []
  files.forEach(fileName => {
    const { rows: outputRows } = fileParser(
      `./out/${fileName}.out`,
      { splitInRows: true } 
    )

    const { rows: inputRows } = fileParser(
      `./fixtures/${fileName}.in`,
      { splitInRows: true }
    )
    scores.push({ file: fileName, score: judge(inputRows, outputRows)})
  })
  console.log('scores --> ', JSON.stringify(scores))
}

function extractServerData(rawServers) {
  const servers = {}
  rawServers.forEach((server, index) => {
    const [size, capacity] = server.split(' ').map(value => +value)
    servers[index] = { size, capacity }
  })
  return servers
}

// server row - first server column - pool
// 0 1 0
function extractPools(inputRows, outputRows){
  const pools = {}
  const [header] = inputRows
  const [_, __, unallocatableSlotsNumber] = header.split(' ')
  const rawServers = inputRows.slice(+unallocatableSlotsNumber + 1)
  const serversData = extractServerData(rawServers)
  outputRows.forEach((server, index) => {
    if (server !== 'x' && server.trim() !== '') {
      const [row, startingColumn, poolId] = server.split(' ').map(value => +value)
      if (!pools[poolId]) {
        pools[+poolId] = {
          servers: []
        }
      }
      pools[poolId].servers.push({ row: +row, startingColumn, capacity: +serversData[index].capacity })
    }
  })
  return pools
}

function convertPools(pools) {
  return Object.keys(pools).sort().map(id => {
    return { id, servers: pools[id].servers }
  })
}

function judge(inputRows, outputRows) {
  const poolsObject = extractPools(inputRows, outputRows)
  const poolsList = convertPools(poolsObject)
  const [header] = inputRows
  const [rowsNumber, slotsPerRow, unallocatableSlotsNumber, poolsNumber, serversNumber] = header.split(' ').map(value => +value)
  return getMinCapacity(poolsList, rowsNumber)
}
/**
 * {
    "id": "1",
    "servers": [
      {
        "row": "1",
        "startingColumn": "0",
        "capacity": "10"
      },
      {
        "row": "0",
        "startingColumn": "4",
        "capacity": "5"
      }
    ]
  }
 */
function getMinCapacity(pools, rowsNumber) {
  const garanteedCapacities = pools.map(pool => getGaranteedCapacity(pool, rowsNumber))
  return Math.min(...garanteedCapacities)
}

function getGaranteedCapacity(pool, rowsNumber) {
  const maxCapacity = getSumOfCapacities(pool)
  const capacitiesForBrokenRows = []
  for (let rowId = 0; rowId < rowsNumber; rowId++) {
    capacitiesForBrokenRows.push(maxCapacity - getSumOfCapacities(pool, rowId))
  }
  return Math.min(...capacitiesForBrokenRows)
}

function getSumOfCapacities(pool, rowId) {
  const { servers } = pool
  return servers.reduce((acc, server) => {
    if (rowId === undefined || rowId === server.row) {
      return server.capacity + acc
    }
    return acc
  }, 0)
}

judgeSystem()

module.exports = {
  judge: judgeSystem
}

// server row - first server column - pool
// 0 1 0
/**
 * pools:{
 *    0: [0, 1, 2]
 * }
 * 
 * servers:{
 *   0: {
 *     row: 1,
 *     startingColumn: 3
 *     capacity: 5
 *   }
 * }
 */
/**
 * R - righe
 * S - slot per riga
 * U - slot non disponibili
 * P - pool da creare
 * M - server da allocare
 */

/**
 * per ogni pool, la sua capacità garantita è data da:
 *  il minimo delle somme della capacità del pool meno 
 * 
 * 1. struttura dati a partire dal file
 * 2.1. per ogni pool, prendiamo i server che lo compongono e proviamo a buttare giu la relativa riga
 * 2.2. la capacità garantita del pool è la capacità più bassa estratta
 */