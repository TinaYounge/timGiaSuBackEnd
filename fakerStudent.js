const faker = require("faker/locale/vi");
const MongoClient = require("mongodb").MongoClient;
const bcrypt = require("bcrypt");

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

    const collection = client.db("timGiaSu").collection("testStudent1");

    // The drop() command destroys all data from a collection.
    // Make sure you run it against proper database and collection.
    collection.drop();

    // make a bunch of time series data
    let timeSeriesData = [];
    let districtHCM = [
      "Quận 1",
      "Quận 2",
      "Quận 3",
      "Quận 4",
      "Quận 5",
      "Quận 6",
      "Quận 7",
      "Quận 8",
      "Quận 9",
      "Quận 10",
      "Quận 11",
      "Quận 12",
      "Quận Bình Thạnh",
      "Quận Tân Bình",
      "Quận Gò Vấp",
      "Quận Tân Phú",
      "Quận Phú Nhuận",
    ];

    let cityAll = ["Hồ Chí Minh"];
    // let districta = "";
    let typeOfTeachingAll = ["Trực tuyến", "Tại nhà", "Cả hai"];
    let highestCertificateAll = ["Cao đẳng", "Đại học", "Thạc sĩ", "Tiến sĩ"];
    let voteAll = [
      [1, 2, 5, 3, 2],
      [3, 5],
      [5, 4, 3][(5, 5, 5, 4)],
      [5, 5, 3, 4, 3],
    ];
    for (let i = 0; i < 50; i++) {
      const username = faker.internet.userName();
      const fullname = faker.name.findName();
      const email = faker.internet.email(fullname);
      const prePassword = faker.internet.password();
      //Generate new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(prePassword, salt);
      const profilePicture = faker.image.avatar();
      const followers = [];
      const followings = [];
      const isAdmin = false;
      const city = cityAll[Math.floor(Math.random() * cityAll.length)];
      const district =
        districtHCM[Math.floor(Math.random() * districtHCM.length)];
      const sex = "Nữ";
      const accountType = "Học sinh";

      const typeOfTeaching =
        typeOfTeachingAll[Math.floor(Math.random() * typeOfTeachingAll.length)];
      const phoneNumber = faker.phone.phoneNumber();
      const classIsBooked = [];

      let newDay = {
        timestamp_day: faker.date.past(),
        fullname,
        username,
        email,
        prePassword,
        password: hashedPassword,
        profilePicture,
        followers,
        followings,
        isAdmin,
        district,
        city,
        sex,
        accountType,
        typeOfTeaching,
        phoneNumber,
        classIsBooked,
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
