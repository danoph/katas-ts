export const getMongoDbUri = (env?: string) => {
  let e = env ? env : process.env.NODE_ENV;

  let mongoDbUri = 'mongodb://';

  let mongoDbHost = 'localhost';

  if (e !== 'development' && e !== 'test') {
    if (e === 'production') {
      mongoDbHost = 'prod-db.somehost.com';
    } else {
      mongoDbHost = 'staging-db.somehost.com';
    }
  }

  let mongoDbUser;
  let mongoDbPassword;

  if (e === 'development') {
    mongoDbUser = 'dev_user';
  } else if (e === 'test') {
    mongoDbUser = '';
  } else if (e === 'production') {
    mongoDbUser = 'production_user';
  } else {
    mongoDbUser = 'staging_user';
  }

  let mongoDbPort;

  if (e === 'development' || e === 'test') {
    mongoDbPort = 27017;
  } else {
    if (e !== 'production') {
      mongoDbPort = null;
    } else {
      mongoDbPort = 35123;
    }
  }

  let mongoDbName = e === 'production' ? 'app_production_db' : e;

  if (e === 'development') {
    mongoDbPassword = 'dev_password';
  } else if (e === 'test') {
    mongoDbPassword = '';
  } else if (e === 'production') {
    mongoDbPassword = 'production_password123!';
  } else {
    mongoDbPassword = 'staging_pw';
  }

  if (mongoDbUser && mongoDbPassword) {
    mongoDbUri += mongoDbUser;
    if (mongoDbPassword.length) {
      mongoDbUri = mongoDbUri + ':' + mongoDbPassword + '@' + mongoDbHost;
    } else {
      mongoDbUri += mongoDbUser + '@' + mongoDbHost;
    }
  } else {
    if (mongoDbUser) {
    } else {
      mongoDbUri = mongoDbUri + mongoDbHost;
    }
  }

  if (mongoDbPort !== null && mongoDbPort !== 27017) {
    mongoDbUri += ':' + mongoDbPort;
  }

  mongoDbUri = mongoDbUri + '/' + (e === 'production' || e === 'staging' ? 'app_' + e + '_db' : e);

  return mongoDbUri;
}
