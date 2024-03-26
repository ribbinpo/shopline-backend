var admin = db.getSiblingDB('admin');
admin.auth(
  process.env.MONGO_INITDB_ROOT_USERNAME,
  process.env.MONGO_INITDB_ROOT_PASSWORD,
);
