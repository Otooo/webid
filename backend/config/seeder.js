const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const { uridb, options } = require('./connectDB');
// const bcrypt = require('bcrypt');
// const saltRounds = process.env.HASH_SALT;

mongoose.connect(uridb, options)
.then(async () => {
  console.log('Dropping database ...');
  await mongoose.connection.db.dropDatabase();
  console.log('Database dropped!');

  console.log('\nInitializing seeders ...');
  
  // call seeders
  await seedRoles();
  await seedUsers();
  await seedLinkUsersRoles()

  console.log('Seeders finished!');
  process.exit('success');
})
.catch(error => {
  console.log(error);
});

const Role = require('../src/models/role');
const User = require('../src/models/user');

const ROLES = ["admin", "regular"];

// Seeders
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

  // Admin
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

  // User 1
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
  
  // User 2
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

async function seedLinkUsersRoles() {
  console.log('Seeding link users-roles ...');
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

