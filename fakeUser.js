const faker = require("faker/locale/vi");
const MongoClient = require("mongodb").MongoClient;
const bcrypt = require("bcrypt");

// const mongoose = require("mongoose");

// function randomIntFromInterval(min, max) {
//   // min and max included
//   return Math.floor(Math.random() * (max - min + 1) + min);
// }

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

    const collection = client.db("timGiaSu").collection("testUser10");

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
    // let districtHaNoi = [
    //   "Quận Ba Đình",
    //   "Quận Bắc Từ Liêm",
    //   "Quận Cầu Giấy",
    //   "Quận Đống Đa",
    //   "Quận Hà Đông",
    //   "Quận Hai Bà Trưng",
    //   "Quận Hoàn Kiếm",
    //   "Quận Hoàng Mai",
    //   "Quận Long Biên",
    //   "Quận Nam Từ Liêm",
    //   "Quận Tây Hồ",
    //   "Quận Thanh Xuân",
    //   "Quận Sơn Tây",
    //   "Quận Ba Vì",
    //   "Quận Chương Mỹ",
    //   "Quận Đan Phượng",
    //   "Quận Đông Anh",
    //   "Quận Gia Lâm",
    //   "Quận Hoài Đức",
    //   "Quận Mê Linh",
    //   "Quận Mỹ Đức",
    //   "Quận Phú Xuyên",
    //   "Quận Phúc Thọ",
    //   "Quận Quốc Oai",
    //   "Quận Sóc Sơn",
    //   "Quận Thạch Thất",
    //   "Quận Thanh Oai",
    //   "Quận Thanh Trì",
    //   "Quận Thường Tín",
    //   "Quận Ứng Hòa",
    // ];
    let cityAll = ["Hồ Chí Minh"];
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
      const desc = faker.lorem.paragraphs();
      const city = cityAll[Math.floor(Math.random() * cityAll.length)];
      const district =
        districtHCM[Math.floor(Math.random() * districtHCM.length)];
      const sex = "Nữ";
      const birthday = "";
      const accountType = "Gia sư";
      const highestCertificate =
        highestCertificateAll[
          Math.floor(Math.random() * highestCertificateAll.length)
        ];

      const universityGotCert = "Đại học Sư phạm Thành Phố HCM";
      const company = faker.company.companyName();
      const typeOfTeaching =
        typeOfTeachingAll[Math.floor(Math.random() * typeOfTeachingAll.length)];

      const classes = [];
      const phoneNumber = faker.phone.phoneNumber();
      const availableTime = [];
      const classIsBooked = [];
      const vote = voteAll[Math.floor(Math.random() * voteAll.length)];
      const certificate = [];
      const bankCard = faker.finance.creditCardNumber();
      const AdminChecked = "Đạt";

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
