const filterByDates = (data, dateFrom, dateTo) => {
  return data.filter(edge => {
    // filter between specified dates
    // and where heartrate zone data exists
    return (
      edge.node.activity.start_date > dateFrom &&
      edge.node.activity.start_date < dateTo &&
      edge.node.activity.zones.filter(zone => {
        return zone.type === "heartrate"
      }).length > 0
    )
  })
}

export const getActivityStreamData = (data, dateFrom, dateTo) => {
  return filterByDates(data, dateFrom, dateTo).map(edge => {
    // filter activity for heartrate zone bucket only
    let hrZones = edge.node.activity.zones.filter(zone => {
      return zone.type === "heartrate"
    })
    // return default zones if not defined
    if (hrZones.length === 0)
      return {
        "Zone 1": 0,
        "Zone 2": 0,
        "Zone 3": 0,
        "Zone 4": 0,
        "Zone 5": 0,
      }
    // return time spent in each zone
    return hrZones[0].distribution_buckets
      .sort((a, b) => {
        // Order the zones in the bucket
        if (a.min < b.min) {
          return -1
        }
        if (a.min > b.min) {
          return 1
        }
        return 0
      })
      .map((zone, index) => {
        // extract time in each zone
        let o = {}
        o[`Zone ${index + 1}`] = zone.time
        return o
      })
      .reduce((acc, cur) => {
        // merge zone objects into one
        return Object.assign(acc, cur)
      }, {})
  })
}
