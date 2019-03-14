// const stream = data=>{
//   let stream = data
//   return {
//     filterByDates(dateFrom, dateTo) {
//   return data.filter(edge => {
//     // filter between specified dates
//     return (
//       edge.node.activity.start_date > dateFrom &&
//       edge.node.activity.start_date < dateTo
//     )
//   })
// },
// removeActivitiesWithoutHeartrateData = data => {
//   return data.filter(edge => {
//     // filter activities where heartrate zone data does not exist
//     return (
//       edge.node.activity.zones.filter(zone => {
//         return zone.type === "heartrate"
//       }).length > 0
//     )
//   })
// }
//   }
// }

const calculatePolarityScores = zones => {
  return zones.map(zone => {
    let totalTime = Object.values(zone).reduce((a, c) => {
      return a + c
    }, 0)
    let lower = (zone["Zone 1"] + zone["Zone 2"]) / totalTime
    let upper = (zone["Zone 4"] + zone["Zone 5"]) / totalTime
    lower = lower < 0.8 ? lower : 0.8
    upper = upper < 0.2 ? upper : 0.2
    let polarityScore = (lower + upper) * 100
    zone["polarity"] = polarityScore
    console.log(lower, upper, totalTime, polarityScore, zone)
    return zone
  })
}

const extractTimeInEachZone = zones => {
  return zones.map((zone, index) => {
    // extract time in each zone
    let o = {}
    o[`Zone ${index + 1}`] = zone.time
    return o
  })
}

const filterActivitiesByDates = (data, dateFrom, dateTo) => {
  return data.filter(edge => {
    // filter between specified dates
    return (
      edge.node.activity.start_date > dateFrom &&
      edge.node.activity.start_date < dateTo
    )
  })
}

const getActivitiesWithHeartrateData = data => {
  return data.filter(edge => {
    // filter activities where heartrate zone data does not exist
    return getHeartrateZones(edge.node.activity.zones).length > 0
  })
}

const getHeartrateZones = zones => {
  return zones.filter(zone => {
    return zone.type === "heartrate"
  })
}

const getTimeSpentInEachZone = data => {
  return data.map(edge => {
    // return time spent in each zone
    return mergeZones(
      extractTimeInEachZone(
        sortZonesInBucket(
          getHeartrateZones(edge.node.activity.zones)[0].distribution_buckets
        )
      )
    )
  })
}

const mergeZones = zones => {
  return zones.reduce((acc, cur) => {
    // merge zone objects into one
    return Object.assign(acc, cur)
  }, {})
}

const sortZonesInBucket = bucket => {
  return bucket.sort((a, b) => {
    // Order the zones in the bucket
    if (a.min < b.min) {
      return -1
    }
    if (a.min > b.min) {
      return 1
    }
    return 0
  })
}

export const getActivityStreamData = (data, dateFrom, dateTo) => {
  return calculatePolarityScores(
    getTimeSpentInEachZone(
      getActivitiesWithHeartrateData(
        filterActivitiesByDates(data, dateFrom, dateTo)
      )
    )
  )
}
