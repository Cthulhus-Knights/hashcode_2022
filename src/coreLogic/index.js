'use strict'

function buildAllocateServer(slotsBlock) {
  return (server, serverIndex) => {
    const { size: serverSize, capacity: serverCapacity, index } = server
    let serverAllocation = {
      isAllocated: false,
      index,
    }
    for (let i = 0; i < slotsBlock.length; i++) {
      const slotBlock = slotsBlock[i]

      console.log('slotBlock', slotBlock, serverSize, serverCapacity)
      if (serverSize <= slotBlock.size) {
        serverAllocation = {
          index,
          isAllocated: true,
          position: {
            row: slotBlock.row,
            column: slotBlock.startSlot,
          }
        }
        if (serverSize === slotsBlock.size) {
          slotsBlock.splice(i)
        } else {
          slotsBlock[i] = {
            ...slotBlock,
            startSlot: slotBlock.startSlot + Number(serverSize),
            size: slotBlock.size - serverSize
          }
        }
        break
      }
    }
    return serverAllocation
  }
}

function buildDispatchServers(poolsNumber) {
  let poolId = 0
  return serverAllocation => {
    const newAllocation = {
      ...serverAllocation,
      pool: poolId
    }
    poolId = (poolId + 1) % poolsNumber
    return newAllocation
  }
}

function coreLogic(
  rowsNumber,
  slotsNumberPerRow,
  poolsNumber,
  slotsBlocks,
  servers
) {
  const allocateServers = buildAllocateServer(slotsBlocks)
  const dispatchServers = buildDispatchServers(poolsNumber)
  const serversAllocation = servers
    .map((server, index) => { return { ...server, index } })
    .sort((a, b) => b.capacity - a.capacity)
    .map(allocateServers)
    .map(dispatchServers)
  // console.log(JSON.stringify(serversAllocation, null, 2))
  const sortedAllocation = serversAllocation
    .sort((a, b) => a.index - b.index)
  
  return sortedAllocation
    .map(({ isAllocated, position, pool }) => {
      if (!isAllocated) {
        return 'x'
      }
      return `${position.row} ${position.column} ${pool}`
    })
}

module.exports = {
  coreLogic
}
