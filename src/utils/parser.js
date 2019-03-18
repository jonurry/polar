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

const calculatePolarityScore = (z1, z2, z3, z4, z5) => {
  let totalTime = z1 + z2 + z3 + z4 + z5
  let lower = (z1 + z2) / totalTime
  let upper = (z4 + z5) / totalTime
  lower = lower < 0.8 ? lower : 0.8
  upper = upper < 0.2 ? upper : 0.2
  return (lower + upper) * 100
}

const calculatePolarityScores = zones => {
  return zones.map(zone => {
    zone["polarity"] = calculatePolarityScore(
      zone["Zone 1"],
      zone["Zone 2"],
      zone["Zone 3"],
      zone["Zone 4"],
      zone["Zone 5"]
    )
    return zone
  })
}

const calculateOverallPolarityScore = zones => {
  let totalZone1 = getTotalTimeInZone(1, zones)
  let totalZone2 = getTotalTimeInZone(2, zones)
  let totalZone3 = getTotalTimeInZone(3, zones)
  let totalZone4 = getTotalTimeInZone(4, zones)
  let totalZone5 = getTotalTimeInZone(5, zones)
  return calculatePolarityScore(
    totalZone1,
    totalZone2,
    totalZone3,
    totalZone4,
    totalZone5
  )
}

const getTotalTimeInZone = (zone, zones) => {
  let total = zones.reduce((a, c) => {
    return a + c[`Zone ${zone}`]
  }, 0)
  console.log(`Z${zone} total: `, total)
  return total
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
      edge.node.activity.start_date.substring(0, 10) >= dateFrom &&
      edge.node.activity.start_date.substring(0, 10) <= dateTo
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
  let stream = calculatePolarityScores(
    getTimeSpentInEachZone(
      getActivitiesWithHeartrateData(
        filterActivitiesByDates(data, dateFrom, dateTo)
      )
    )
  )
  stream["polarity"] = calculateOverallPolarityScore(stream)
  return stream
}
