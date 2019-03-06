if (process.env.NODE_ENV === "development") {
  require("dotenv").config({
    path: `.env`,
  })
}

module.exports = {
  siteMetadata: {
    title: `Polar`,
    description: `Analyse your Strava activities against a Polar training plan.`,
    author: `@jonurry`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `polar`,
        short_name: `polar`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/polar-3.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-source-strava",
      options: {
        //
        // Mandatory
        // --------
        //
        token: process.env.STRAVA_TOKEN,
        // id: process.env.STRAVA_CLIENT_ID,
        // secret: process.env.STRAVA_CLIENT_SECRET,
        // refresh_token: process.env.STRAVA_REFRESH_TOKEN,

        //
        // Optional
        // --------
        //
        debug: true,
        activitiesOptions: {
          // Options for filtering activities
          // --------------------------------
          //
          // Timestamp for filtering activities that have taken place BEFORE a certain time
          //before: "1539500400",
          // Timestamp for filtering activities that have taken place AFTER a certain time
          after: "1551398400",
          //
          // Options for enhance activities
          // --------------------------------
          //
          // Add comments to every activity
          // withComments: true,
          // Add kudos to every activity
          // withKudos: true,
          // Add laps to every activity
          // withLaps: true,
          // Add photos to every activity
          // withPhotos: true,
          // Add related activities to every activity
          // withRelated: true,
          // Add streams to every activity (see streamTypes)
          withStreams: true,
          // Add zones to every activity (need Strava Summit Analysis Pack)
          withZones: true,
          //
          // Add analyzed data to every activity
          // withStreams option must be true
          // See https://developers.strava.com/docs/reference/#api-models-StreamSet
          streamsTypes: [
            "time",
            // "cadence",
            // "distance",
            // "latlng",
            "heartrate",
            // "temp",
            "moving",
            // "grade_smooth",
            // "watts",
            // "velocity_smooth",
            // "altitude",
          ],
          //
          // Option to cache activities
          // ------
          cacheDir: `${__dirname}/.strava`,
        },
        athleteOptions: {
          // Options computed by gatsby-source-strava
          // ----------------------------------------
          //
          // Add `heartrateMax` data to `athlete`
          computeHeartrateMax: true,
          //
          // Options for enhance athlete data
          // --------------------------------
          //
          // Add athlete koms
          withKoms: true,
          // Add athlete routes
          // withRoutes: true,
          // Add athlete stats
          withStats: true,
          // Add athlete zones
          withZones: true,
        },
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
  ],
}
