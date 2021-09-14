const faker = require("faker/locale/vi");
const MongoClient = require("mongodb").MongoClient;
// const mongoose = require("mongoose");

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

async function seedDB() {
  // Connection URL
  const uri = "mongodb://localhost:27017/";

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    // useUnifiedTopology: true,
  });

  try {
    await client.connect();
    // await mongoose.connect(process.env.MONGO_URL, () => {
    //   console.log("mongodb connected");
    // });
    console.log("Connected correctly to server");

    const collection = client.db("timGiaSu").collection("TestUser");

    // The drop() command destroys all data from a collection.
    // Make sure you run it against proper database and collection.
    collection.drop();

    // make a bunch of time series data
    let timeSeriesData = [];

    for (let i = 0; i < 50; i++) {
      const username = faker.internet.userName();
      const fullname = faker.name.findName();
      const email = faker.internet.email(fullname);
      const password = faker.internet.email();
      const profilePicture = faker.image.avatar();
      const followers = [];
      const followings = [];
      const isAdmin = false;
      const desc = faker.lorem.paragraphs();
      const district = "Quận 1";
      const city = "Hồ Chí Minh";
      const sex = "Nữ";
      const birthday = "";
      const accountType = "Gia sư";
      const highestCertificate = "Đại học";
      const universityGotCert = "Đại học Sư phạm Thành Phố HCM";
      const company = faker.company.companyName();
      const typeOfTeaching = "Cả hai";
      const classes = [];
      const phoneNumber = faker.phone.phoneNumber();
      const availableTime = [];
      const classIsBooked = [];
      const vote = [];
      const certificate = [];
      const bankCard = faker.finance.creditCardNumber();
      const AdminChecked = "Đạt";

      let newDay = {
        timestamp_day: faker.date.past(),
        username,
        email,
        password,
        profilePicture,
        followers,
        followings,
        isAdmin,
        desc,
        district,
        city,
        city,
        sex,
        birthday,
        accountType,
        highestCertificate,
        universityGotCert,
        company,
        typeOfTeaching,
        classes,
        phoneNumber,
        availableTime,
        classIsBooked,
        vote,
        certificate,
        bankCard,
        AdminChecked,
      };

      for (let j = 0; j < randomIntFromInterval(1, 6); j++) {
        let newEvent = {
          timestamp_event: faker.date.past(),
          weight: randomIntFromInterval(14, 16),
        };
      }
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
