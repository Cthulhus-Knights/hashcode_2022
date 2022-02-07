'use strict'

const path = require('path')
const fileParser = require('./src/fileParser')
const fs = require('fs-extra')
const { get, set } = require('lodash')
const { coreLogic } = require('./src/coreLogic')
const { judge } = require('./src/judge')

const files = [
  // 'a',
  'b',
  // 'c',
  // 'd',
  // 'e',
  // 'f'
  // 'test'
]

function parseFile(fileName) {
  const { rows } = fileParser(
    path.join(__dirname, `./fixtures/${fileName}.in`),
    { splitInRows: true }
  )
  const [
    datacenter,
    ...rest
  ] = rows

  const [rowsNumber, slotsNumberPerRow, unavailableNumberSlots, poolsNumber, serversNumber] = datacenter.split(" ")
  const unavailableSlots = rest.slice(0, Number(unavailableNumberSlots))
  const arrayOfUnavailableSlot = []
  for (const unavailableSlot of unavailableSlots) {
    const [rowIndex, slotIndex] = unavailableSlot.split(" ")
    arrayOfUnavailableSlot.push({ rowIndex, slotIndex })
  }

  const serversProperties = rest.slice(Number(unavailableNumberSlots))
  const arrayOfServersProperties = []
  for (const serverProperties of serversProperties) {
    const [size, capacity] = serverProperties.split(" ")
    arrayOfServersProperties.push({ size, capacity })
  }

  return {
    rowsNumber,
    slotsNumberPerRow,
    unavailableNumberSlots,
    poolsNumber,
    serversNumber,

    arrayOfUnavailableSlot,
    arrayOfServersProperties
  }
}

const start = () => {
  files.forEach(fileName => {
    // ci aspettiamo un array di elementi da ciclare
    const {
      rowsNumber,
      slotsNumberPerRow,
      unavailableNumberSlots,
      poolsNumber,
      serversNumber,

      arrayOfUnavailableSlot,
      arrayOfServersProperties
    } = parseFile(fileName)

    let output = ''

    const matrix = []
    /**
     * 0 means available slot 
     * 1 means occupied slot by a server
     * 2 means that the slot is broken, so unavailable
     */
    // prepare matrix with all available slots
    for (let i = 0; i < rowsNumber; i++) {
      const matrixRow = []
      for (let j = 0; j < slotsNumberPerRow; j++) {
        // 0 
        matrixRow.push(0)
      }
      matrix.push(matrixRow)
    }

    // set unavailable
    for (let i = 0; i < unavailableNumberSlots; i++) {
      // 2 
      matrix[arrayOfUnavailableSlot[i].rowIndex][arrayOfUnavailableSlot[i].slotIndex] = 2
    }

    const emptyConsecutiveSlotsArray = []

    for (let row = 0; row < rowsNumber; row++) {
      const preserveIndexRow = row
      const preserveIndexSlot = 0

      let startSlot = 0
      let endSlot = rowsNumber

      const splitted = matrix[row].join(' ').replace(/2/g, '2*2').split('2').filter(item => item.trim())
      const { consecutiveSlotItem } = splitted.reduce((acc, item, index) => {
        if (item === '*') {
          acc.unavaibleCount = acc.unavaibleCount + 1
          return acc
        }
        const sanitize = item.trim()
        const size = sanitize.split(' ').length

        acc.consecutiveSlotItem.push({
          row: preserveIndexRow,
          startSlot: acc.unavaibleCount,
          endSlot: size + acc.unavaibleCount - 1,
          size
        })

        acc.unavaibleCount += size

        return acc
      }, {
        unavaibleCount: 0,
        consecutiveSlotItem: []
      })

      emptyConsecutiveSlotsArray.push(...consecutiveSlotItem)
    }

    const rowsList = coreLogic(
      rowsNumber,
      slotsNumberPerRow,
      poolsNumber,
      emptyConsecutiveSlotsArray,
      arrayOfServersProperties
    )

    fs.outputFileSync(`./out/${fileName}.out`, rowsList.join('\n'), { encoding: 'utf-8' })
  })

  judge()
}

start()

module.exports = {
  fileParser,
}
