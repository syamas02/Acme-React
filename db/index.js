const Sequelize = require('sequelize');

const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost/acmedb',
  { logging: true }
);

const User = db.define('users', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phone: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true,
    },
  },
});

const Department = db.define('departments', {
  name: {
    type: Sequelize.STRING,
  },
});

User.belongsTo(Department);
Department.hasMany(User);

const sync = () => {
  return db.sync({ force: true });
};

const seed = () => {
  const deptNames = ['Engineering', 'Admin', 'HR'];

  return Promise.all(deptNames.map(name => Department.create({ name }))).then(
    ([engineering, admin, hr]) => {
      return Promise.all([
        User.create({ name: 'Moe', departmentId: engineering.id }),
        User.create({ name: 'Larry', departmentId: hr.id }),
        User.create({ name: 'Curly', departmentId: admin.id }),
        User.create({ name: 'Prof', departmentId: admin.id }),
        User.create({ name: 'Sanjai', departmentId: engineering.id }),
      ]);
    }
  );
};

module.exports = {
  sync,
  seed,
  models: {
    User,
    Department,
  },
};
