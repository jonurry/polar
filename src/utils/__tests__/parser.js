let data = {
  node: {
    activity: {
      average_heartrate: 138.5,
      average_watts: 117.5,
      distance: 31411.8,
      name: "Afternoon Ride",
      start_date: "2019-03-22",
      suffer_score: 38,
      zones: [
        {
          distribution_buckets: [
            { max: 114, min: 0, time: 432 },
            { max: 139, min: 114, time: 2768 },
            { max: 157, min: 139, time: 347 },
            { max: 175, min: 157, time: 1198 },
            { max: -1, min: 175, time: 0 },
          ],
          points: 9,
          score: 38,
          type: "heartrate",
        },
        {
          distribution_buckets: [
            { max: 0, min: 0, time: 909 },
            { max: 50, min: 0, time: 635 },
            { max: 100, min: 50, time: 813 },
            { max: 150, min: 100, time: 976 },
            { max: 200, min: 150, time: 559 },
            { max: 250, min: 200, time: 317 },
            { max: 300, min: 250, time: 212 },
            { max: 350, min: 300, time: 122 },
            { max: 400, min: 350, time: 107 },
            { max: 450, min: 400, time: 46 },
            { max: -1, min: 450, time: 49 },
          ],
          points: null,
          score: null,
          type: "power",
        },
      ],
    },
  },
}

describe("Parser", () => {
  it("Passes", () => {
    expect(true).toBe(true)
  })
})

// 1. Filter by date range
// 2. Filter activities with heart rate data
// 3. Filter zones by type (heartrate or power)
// 4. Sort zones in bucket
// 5. Time spent in each zone (new object)
// 6. Calculate polarity score for activity
// 7. Total time in zone
// 8. Calculate overall polarity score
// 9. Calendar data (dates and polarity scores)
