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

    const collection = client.db("timGiaSu").collection("testClass2");

    // The drop() command destroys all data from a collection.
    // Make sure you run it against proper database and collection.
    collection.drop();

    // make a bunch of time series data
    let timeSeriesData = [];
    let subjectAll = [
      "Toán",
      "Lý",
      "Hóa",
      "Tiếng Anh",
      "Văn",
      "Tiếng Nhật",
      "Piano",
      "Hát nhạc",
      "Hội họa",
    ];
    let gradeAll = [
      "Lớp 1",
      "Lớp 2",
      "Lớp 3",
      "Lớp 4",
      "Lớp 5",
      "Lớp 6",
      "Lớp 7",
      "Lớp 8",
      "Lớp 8",
      "Lớp 10",
      "Lớp 11",
      "Lớp 12",
      "Ielts",
      "Toiec",
      "Khác",
    ];
    let price30All = [
      20000, 21000, 22000, 23000, 24000, 25000, 26000, 27000, 28000, 29000,
      30000, 31000, 32000, 33000, 34000, 35000, 36000,
    ];
    let price50All = [
      100000, 105000, 110000, 115000, 120000, 125000, 130000, 135000, 140000,
      145000, 150000, 155000, 160000, 165000, 170000, 175000, 180000,
    ];
    let price5X50All = [
      475000, 498750, 522500, 546250, 570000, 593750, 617500, 641250, 665000,
      688750, 712500, 736250, 760000, 783750, 807500, 831250, 855000,
    ];
    let price10x50All = [
      900000, 945000, 990000, 1035000, 1080000, 1125000, 1170000, 1215000,
      1260000, 1305000, 1350000, 1395000, 1440000, 1485000, 1530000, 1575000,
      1620000,
    ];
    let userIdAll = [
      "61418a4de2a57953c8eb99be",
      "61418a4de2a57953c8eb99bf",
      "61418a4de2a57953c8eb99c0",
      "61418a4de2a57953c8eb99c1",
      "61418a4de2a57953c8eb99c2",
      "61418a4de2a57953c8eb99c3",
      "61418a4de2a57953c8eb99c4",
      "61418a4de2a57953c8eb99c5",
      "61418a4de2a57953c8eb99c6",
      "61418a4de2a57953c8eb99c7",
      "61418a4de2a57953c8eb99c8",
      "61418a4de2a57953c8eb99c9",
      "61418a4de2a57953c8eb99ca",
      "61418a4de2a57953c8eb99cb",
      "61418a4de2a57953c8eb99cc",
      "61418a4de2a57953c8eb99cd",
      "61418a4de2a57953c8eb99ce",
      "61418a4de2a57953c8eb99cf",
      "61418a4de2a57953c8eb99d0",
      "61418a4de2a57953c8eb99d1",
      "61418a4de2a57953c8eb99d2",
      "61418a4de2a57953c8eb99d3",
      "61418a4de2a57953c8eb99d4",
      "61418a4de2a57953c8eb99d5",
      "61418a4de2a57953c8eb99d6",
      "61418a4de2a57953c8eb99d7",
      "61418a4de2a57953c8eb99d8",
      "61418a4de2a57953c8eb99d9",
      "61418a4de2a57953c8eb99da",
      "61418a4de2a57953c8eb99db",
      "61418a4de2a57953c8eb99dc",
      "61418a4de2a57953c8eb99dd",
      "61418a4de2a57953c8eb99de",
      "61418a4de2a57953c8eb99df",
      "61418a4de2a57953c8eb99e0",
      "61418a4de2a57953c8eb99e1",
      "61418a4de2a57953c8eb99e2",
      "61418a4de2a57953c8eb99e3",
      "61418a4de2a57953c8eb99e4",
      "61418a4de2a57953c8eb99e5",
      "61418a4de2a57953c8eb99e6",
      "61418a4de2a57953c8eb99e7",
      "61418a4de2a57953c8eb99e8",
      "61418a4de2a57953c8eb99e9",
      "61418a4de2a57953c8eb99ea",
      "61418a4de2a57953c8eb99eb",
      "61418a4de2a57953c8eb99ec",
      "61418a4de2a57953c8eb99ed",
      "61418a4de2a57953c8eb99ee",
      "61418a4de2a57953c8eb99ef",
    ];
    for (let i = 0; i < 500; i++) {
      const userId = userIdAll[Math.floor(Math.random() * userIdAll.length)];
      const subject = subjectAll[Math.floor(Math.random() * subjectAll.length)];
      const grade = gradeAll[Math.floor(Math.random() * gradeAll.length)];
      const price30 = price30All[Math.floor(Math.random() * price30All.length)];
      const price50 = price50All[Math.floor(Math.random() * price50All.length)];
      const price5X50 =
        price5X50All[Math.floor(Math.random() * price5X50All.length)];
      const price10x50 =
        price10x50All[Math.floor(Math.random() * price10x50All.length)];

      let newDay = {
        timestamp_day: faker.date.past(),
        userId,
        subject,
        grade,
        price30,
        price50,
        price5X50,
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
