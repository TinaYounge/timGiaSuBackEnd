const faker = require("faker/locale/vi");
const MongoClient = require("mongodb").MongoClient;

async function seedDB() {
  // Connection URL
  const uri = "mongodb://localhost:27017/";

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    // useUnifiedTopology: true,
  });

  try {
    await client.connect();

    console.log("Connected correctly to server");

    const collection = client.db("timGiaSu").collection("testtime10/7");

    // The drop() command destroys all data from a collection.
    // Make sure you run it against proper database and collection.
    collection.drop();

    // make a bunch of time series data
    let timeSeriesData = [];
    let timeInADayAll = [0, 1];
    let DayALL = [
      // "10/1/2021",
      // "10/2/2021",
      // "10/3/2021",
      // "10/4/2021",
      // "10/5/2021",
      // "10/6/2021",
      "10/7/2021",
      // "10/8/2021",
      // "10/9/2021",
      // "10/10/2021",
      // "10/11/2021",
      // "10/12/2021",
      // "10/13/2021",
      // "10/14/2021",
    ];

    for (let i = 0; i < 5; i++) {
      const time =
        timeInADayAll[Math.floor(Math.random() * timeInADayAll.length)];
      const day = DayALL[Math.floor(Math.random() * DayALL.length)];

      let newDay = {
        day,
        time: [
          {
            h7p00:
              timeInADayAll[Math.floor(Math.random() * timeInADayAll.length)],
          },

          {
            h7p30:
              timeInADayAll[Math.floor(Math.random() * timeInADayAll.length)],
          },

          {
            h8p00:
              timeInADayAll[Math.floor(Math.random() * timeInADayAll.length)],
          },
          {
            h8p30:
              timeInADayAll[Math.floor(Math.random() * timeInADayAll.length)],
          },
          {
            h9p00:
              timeInADayAll[Math.floor(Math.random() * timeInADayAll.length)],
          },
          {
            h9p30:
              timeInADayAll[Math.floor(Math.random() * timeInADayAll.length)],
          },
          {
            h10p00:
              timeInADayAll[Math.floor(Math.random() * timeInADayAll.length)],
          },
          {
            h10p30:
              timeInADayAll[Math.floor(Math.random() * timeInADayAll.length)],
          },
          {
            h11p00:
              timeInADayAll[Math.floor(Math.random() * timeInADayAll.length)],
          },
          {
            h11p30:
              timeInADayAll[Math.floor(Math.random() * timeInADayAll.length)],
          },
          {
            h12p00:
              timeInADayAll[Math.floor(Math.random() * timeInADayAll.length)],
          },
          {
            h12p30:
              timeInADayAll[Math.floor(Math.random() * timeInADayAll.length)],
          },
          {
            h13p00:
              timeInADayAll[Math.floor(Math.random() * timeInADayAll.length)],
          },
          {
            h13p30:
              timeInADayAll[Math.floor(Math.random() * timeInADayAll.length)],
          },
          {
            h14p00:
              timeInADayAll[Math.floor(Math.random() * timeInADayAll.length)],
          },
          {
            h14p30:
              timeInADayAll[Math.floor(Math.random() * timeInADayAll.length)],
          },
          {
            h15p00:
              timeInADayAll[Math.floor(Math.random() * timeInADayAll.length)],
          },
          {
            h15p30:
              timeInADayAll[Math.floor(Math.random() * timeInADayAll.length)],
          },
          {
            h16p00:
              timeInADayAll[Math.floor(Math.random() * timeInADayAll.length)],
          },
          {
            h16p30:
              timeInADayAll[Math.floor(Math.random() * timeInADayAll.length)],
          },
          {
            h17p00:
              timeInADayAll[Math.floor(Math.random() * timeInADayAll.length)],
          },
          {
            h17p30:
              timeInADayAll[Math.floor(Math.random() * timeInADayAll.length)],
          },
          {
            h18p00:
              timeInADayAll[Math.floor(Math.random() * timeInADayAll.length)],
          },
          {
            h18p30:
              timeInADayAll[Math.floor(Math.random() * timeInADayAll.length)],
          },
          {
            h19p00:
              timeInADayAll[Math.floor(Math.random() * timeInADayAll.length)],
          },
          {
            h19p30:
              timeInADayAll[Math.floor(Math.random() * timeInADayAll.length)],
          },
          {
            h20p00:
              timeInADayAll[Math.floor(Math.random() * timeInADayAll.length)],
          },
          {
            h20p30:
              timeInADayAll[Math.floor(Math.random() * timeInADayAll.length)],
          },
          {
            h21p00:
              timeInADayAll[Math.floor(Math.random() * timeInADayAll.length)],
          },
          {
            h21p30:
              timeInADayAll[Math.floor(Math.random() * timeInADayAll.length)],
          },
        ],
      };

      timeSeriesData.push(newDay);
    }
    await collection.insertMany(timeSeriesData);

    console.log("Database seeded! :)");
    client.close();
  } catch (err) {
    console.log(err.stack);
  }
}

seedDB();
