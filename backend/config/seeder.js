const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const { uridb, options } = require('./connectDB');
// const bcrypt = require('bcrypt');
// const saltRounds = process.env.HASH_SALT;

const Role   = require('../src/models/role');
const User   = require('../src/models/user');
const Bidbot = require('../src/models/bidbot');

const ROLES = ["admin", "regular"];

// Running
mongoose.connect(uridb, options)
.then(async () => {
  console.log('Dropping database ...');
  await mongoose.connection.db.dropDatabase();
  console.log('Database dropped!');

  console.log('\nInitializing seeders ...');
  
  // call seeders
  await seedRoles();
  await seedUsers();
  await linkUsersRoles()
  await seedBidbots();

  console.log('Seeders finished!');
  process.exit('success');
})
.catch(error => {
  console.log(error);
});

// seeders
function seedRoles() {
  console.log('Seeding roles ...');
  let promises = []

  ROLES.forEach(role => {
    promises.push(new Role({
        name: role
      })
      .save()
      .then(() => {
        console.log(`  > added '${role}' to roles collection`);
      })
      .catch(error => {
        console.log("error", error);
      })
    );
  });

  return Promise.all(promises);
}

function seedUsers() {
  console.log('Seeding users ...');
  let promises = []

  // admin
  promises.push(new User({
      name: 'admin',
      password: 'admin'//bcrypt.hashSync('admin', saltRounds)
    })
    .save()
    .then(() => {
      console.log(`  > added 'admin' to users collection`);
    })
    .catch(error => {
      console.log("error", error);
    })
  );

  // user1
  promises.push(new User({
      name: 'user1',
      password: 'user1'//bcrypt.hashSync('user1', saltRounds)
    })
    .save()
    .then(() => {
      console.log(`  > added 'user1' to users collection`);
    })
    .catch(error => {
      console.log("error", error);
    })
  );
  
  // user2
  promises.push(new User({
      name: 'user2',
      password: 'user2'//bcrypt.hashSync('user2', saltRounds)
    })
    .save()
    .then(() => {
      console.log(`  > added 'user2' to users collection`);
    })
    .catch(error => {
      console.log("error", error);
    })
  );

  return Promise.all(promises);
}

async function linkUsersRoles() {
  console.log('Linking users-roles ...');
  let promises = []

  const adminRole = await Role.findOne({ name: ROLES[0] });
  const regularRole = await Role.findOne({ name: ROLES[1] });
  const admin = await User.findOne({ name: 'admin' });
  const user1 = await User.findOne({ name: 'user1' });
  const user2 = await User.findOne({ name: 'user2' });

  admin.roles = [adminRole._id];
  user1.roles = [regularRole._id];
  user2.roles = [regularRole._id];

  promises.push(admin.save());
  promises.push(user1.save());
  promises.push(user2.save());

  return Promise.all(promises);
}

async function seedBidbots() {
  console.log('Seeding bidbots ...');
  let promises = []

  const admin = await User.findOne({ name: 'admin' });
  const user1 = await User.findOne({ name: 'user1' });
  const user2 = await User.findOne({ name: 'user2' });
  const users = [admin, user1, user2];

  users.forEach(user => {
    promises.push(new Bidbot({
        user: user._id
      })
      .save()
      .then(() => {
        console.log(`  > added '${user.name} bot' to bidbots collection`);
      })
      .catch(error => {
        console.log("error", error);
      })
    )
  });

  return Promise.all(promises);
}
