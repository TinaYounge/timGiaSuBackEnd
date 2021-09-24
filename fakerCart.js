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

    const collection = client.db("timGiaSu").collection("testTime6");

    // The drop() command destroys all data from a collection.
    // Make sure you run it against proper database and collection.
    collection.drop();

    // make a bunch of time series data
    let timeSeriesData = [];
    let timeInADayAll = [
      ["7h00", "7h30", "8h00", "8h30", "9h00", "9h30", "10h00"],
      ["10h30", "11h00", "11h30", "12h00", "12h30", "13h00", "13h30"],
      ["14h00", "14h30", "15h00", "15h30", "16h00"],
      ["16h30", "17h00", "17h30", "18h00", "18h30"],
      ["19h00", "19h30", "20h00", "20h30", "21h00", "21h30"],
    ];
    let DayALL = [
      "10/1/2021",
      "10/3/2021",
      "10/4/2021",
      "10/5/2021",
      "10/6/2021",
      "10/7/2021",
      "10/8/2021",
      "10/9/2021",
      "10/10/2021",
      "10/11/2021",
      "10/12/2021",
      "10/13/2021",
      "10/14/2021",
    ];

    for (let i = 0; i < 100; i++) {
      const time =
        timeInADayAll[Math.floor(Math.random() * timeInADayAll.length)];
      const day = DayALL[Math.floor(Math.random() * DayALL.length)];

      let newDay = {
        day,
        time: [time],
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
