import { useState } from "react"

export const newTradesDatesChecker = (latestCurrentDate, newTrades) => {
}


export const openTradesCloser = (oldTrades, newTrades) => {


  const ignoreNewTradesIndex = []

  for (let i = oldTrades.oldestOpenTradeIndex; i < oldTrades.ordersWithMetrics.length; i++) {
    let orderClosed = false
    if (oldTrades.ordersWithMetrics[i].outStandingPosition !== 0) {
      newTrades.orders.map((trade, newTradeIndex) => {
        if (oldTrades.ordersWithMetrics[i].ticker === trade.ticker && !ignoreNewTradesIndex.includes(newTradeIndex) && !orderClosed) {
          // START HERE
          if (trade.positionEffect === "TO OPEN") {
            oldTrades.ordersWithMetrics[i].orders.push({ action: "increased", date: trade.orderPlaced, price: trade.price, sharesQty: trade.sharesQty })
            oldTrades.ordersWithMetrics[i].outStandingPosition += trade.sharesQty
            ignoreNewTradesIndex.push(newTradeIndex)
          } else if (trade.positionEffect === "TO CLOSE") {
            oldTrades.ordersWithMetrics[i].outStandingPosition += trade.sharesQty
            let addOrClose = oldTrades.ordersWithMetrics[i].outStandingPosition === 0 ? "closed" : "lowered";
            oldTrades.ordersWithMetrics[i].orders.push({ action: addOrClose, date: trade.orderPlaced, price: trade.price, sharesQty: trade.sharesQty })
            ignoreNewTradesIndex.push(newTradeIndex)
            if (addOrClose === 'closed') {
              orderClosed = true

            }
          }
        }
      })

    }
  }
  return { oldTrades, ignoreNewTradesIndex }

}

export const ordersIntoJSON = (arr) => {
  const arrCopy = [...arr]
  let orders = []

  arrCopy.map((order) => {

    if (order[8] === "STOCK" || order[8] === "ETF") {
      let dummyObject = {}
      dummyObject.ticker = order[5]
      dummyObject.positionEffect = order[4]
      if (order[2] === "BUY") {
        dummyObject.position = "long"
      } else {
        dummyObject.position = "short"
      }
      // dummyObject.orderPlaced = order[0]
      dummyObject.orderPlaced = new Date(order[0])
      dummyObject.sharesQty = parseInt(order[3])
      dummyObject.price = parseFloat(order[9])
      dummyObject.investmentType = order[8]
      orders.push(dummyObject)
    }

  })
  const importedData = { orders: orders, earliestDate: new Date(orders[0].orderPlaced), latestDate: new Date(orders[orders.length - 1].orderPlaced) }

  return importedData
}

// get orders into opening, added, lowered positions, and closed order
export const ordersIntoCompleteOrders = (orders, skipIndex = []) => {
  // when orders are closed they are added here
  const completeOrder = []
  // skip these orders. already been processed
  // const skipIndex = []
  orders.map((primaryOrder, mainIndex) => {
    // verify this order was not already processed yet
    if (!skipIndex.includes(mainIndex)) {
      // immediately push order into being processed

      skipIndex.push(mainIndex)
      // check if this is an opening order to start looking for more orders and closing order
      if (primaryOrder.positionEffect === "TO OPEN") {
        // initialize opening order
        let orderCycle = {
          ticker: primaryOrder.ticker,
          position: primaryOrder.position,
          orders: [{
            action: "opened", date: primaryOrder.orderPlaced, price: primaryOrder.price,
            sharesQty: primaryOrder.sharesQty
          }], outStandingPosition: primaryOrder.sharesQty
        }
        // once order is closed it's turned into true so the map function skips all the logic
        let orderClosed = false
        const toBeSkipped = []
        orders.map((comparedToOrder, secondaryIndex) => {

          if (comparedToOrder.ticker === primaryOrder.ticker && !orderClosed && !skipIndex.includes(secondaryIndex)) {

            if (comparedToOrder.positionEffect === "TO OPEN") {
              orderCycle.orders.push({ action: "increased", date: comparedToOrder.orderPlaced, price: comparedToOrder.price, sharesQty: comparedToOrder.sharesQty })
              orderCycle.outStandingPosition += comparedToOrder.sharesQty
              toBeSkipped.push(secondaryIndex)
            } else if (comparedToOrder.positionEffect === "TO CLOSE") {
              orderCycle.outStandingPosition += comparedToOrder.sharesQty
              let addOrClose = orderCycle.outStandingPosition === 0 ? "closed" : "lowered";
              orderCycle.orders.push({ action: addOrClose, date: comparedToOrder.orderPlaced, price: comparedToOrder.price, sharesQty: comparedToOrder.sharesQty })
              toBeSkipped.push(secondaryIndex)
              if (addOrClose === 'closed') {
                orderClosed = true

              }
            }
          }
        })
        const openOrderLong = orderCycle.position === 'long' && orderCycle.outStandingPosition > 0
        const openOrderShort = orderCycle.position === 'short' && orderCycle.outStandingPosition < 0

        if (orderClosed || openOrderLong || openOrderShort) {
          completeOrder.push(orderCycle)
          toBeSkipped.map((ind) => {
            skipIndex.push(ind)
          })
        }
      }
    }
  })
  return completeOrder
}
// checked symbols: gbtc, amr, hov, pdd

const dateIsGreater = (d1, d2) => {
  const date1 = new Date(d1);
  const date2 = new Date(d2);
  // dummy <= order if true add
  if (date1 >= date2) {
    return false;
  } else {
    return true;
  }
}

export const incorporateNewImports = (currentOrders, newOrders) => {
  if (currentOrders.earliestDate > newOrders.latestDate) {
    // new orders added to the start
    return [...newOrders.orders, ...currentOrders.orders]
  }
  else if (currentOrders.latestDate < newOrders.earliestDate) {
    // new orders added to the end
    return [...currentOrders.orders, ...newOrders.orders]
  } else if (currentOrders.earliestDate > newOrders.earliestDate && currentOrders.latestDate < newOrders.latestDate) {
    // new order completely overwrite current orders because of larger time frame
    return newOrders
  }
  ('nothing was hit')
}

export const metricsCalculator = (orders) => {
  // p&l win %
  let cumulativePNL = 0
  let oldestOpenTradeIndex = 0
  let searchingOldestOpenTradeIndex = true
  const winLossPercentage = { wins: 0, losses: 0 }
  const gains = []
  const losses = []
  const ordersWithMetrics = []
  orders.map((completeOrder, index) => {

    if (completeOrder.outStandingPosition > 0 || completeOrder.outStandingPosition < 0) {
      ordersWithMetrics.push({ PNL: 0, ...completeOrder, tradeIndex: index })

      if (searchingOldestOpenTradeIndex) {
        oldestOpenTradeIndex = index
        searchingOldestOpenTradeIndex = false
      }
      return
    }

    let spent = 0
    let sold = 0
    completeOrder.orders.map((singleOrder) => {
      if (singleOrder.action === 'opened' || singleOrder.action === 'increased') {
        spent += singleOrder.price * singleOrder.sharesQty
      } else {
        sold += singleOrder.price * singleOrder.sharesQty
      }
    })

    const resultingGainLoss = roundNumber((spent + sold) * -1)
    cumulativePNL += resultingGainLoss
    if (resultingGainLoss > 0) {
      winLossPercentage.wins += 1
      gains.push(resultingGainLoss)
    } else if (resultingGainLoss < 0) {
      winLossPercentage.losses += 1
      losses.push(resultingGainLoss)
    }

    ordersWithMetrics.push({ ...completeOrder, PNL: resultingGainLoss })
  })
  const averageLosses = roundNumber(getTheAverage(losses))
  const averageGains = roundNumber(getTheAverage(gains))
  const winPercentage = roundNumber((winLossPercentage.wins * 100) / (winLossPercentage.wins + winLossPercentage.losses))
  cumulativePNL = roundNumber(cumulativePNL)
  return { ordersWithMetrics, oldestOpenTradeIndex: searchingOldestOpenTradeIndex ? "none" : oldestOpenTradeIndex, metrics: { winPercentage, cumulativePNL, averageGains, averageLosses, wins: winLossPercentage.wins, losses: winLossPercentage.losses } }
}

const getTheAverage = (arr) => {
  if (arr.length === 0) {
    return 0
  }
  const average = arr.reduce((accumulator, currentValue) => { return accumulator + currentValue }, 0) / arr.length
  return average
}

const roundNumber = (number) => {
  number = Math.round(number * 100) / 100
  return number
}


// export const separatePositions = (arr) => {
//   const arrCopy = [...arr]
//   arrCopy.shift()
//   let openPositionObject = {}
//   let closePositionObject = {}
//   arrCopy.map((order) => {
//     if (order[4] === "TO OPEN") {
//       let dummyObject = {}
//       if (order[2] === "BUY") {
//         dummyObject.position = "LONG"
//       } else {
//         dummyObject.position = "SHORT"
//       }
//       dummyObject.orderPlaced = order[0]
//       dummyObject.sharesQty = order[3]
//       dummyObject.price = order[9]
//       if (openPositionObject[order[5]]) {
//         openPositionObject[order[5]].push(dummyObject)
//       } else {
//         openPositionObject[order[5]] = [dummyObject]
//       }
//     } else if (order[4] === "TO CLOSE") {
//       let dummyObject = {}
//       dummyObject.orderPlaced = order[0]
//       dummyObject.sharesQty = order[3]
//       dummyObject.price = order[9]
//       if (closePositionObject[order[5]]) {
//         closePositionObject[order[5]].push(dummyObject)
//       } else {
//         closePositionObject[order[5]] = [dummyObject]
//       }
//     }

//   })
//   return { closePositionObject, openPositionObject }
// }


