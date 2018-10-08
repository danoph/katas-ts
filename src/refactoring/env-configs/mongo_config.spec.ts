import { getMongoDbUri } from './mongo_config';

fdescribe('mongo db config', () => {
  describe('development environment', () => {
    it('returns correct mongo db uri string', () => {
      const expectedUriString = 'mongodb://dev_user:dev_password@localhost/development';
      expect(getMongoDbUri('development')).toEqual(expectedUriString);
    });
  });

  describe('test environment', () => {
    it('returns correct mongo db uri string', () => {
      const expectedUriString = 'mongodb://localhost/test';
      expect(getMongoDbUri('test')).toEqual(expectedUriString);
    });
  });

  describe('staging environment', () => {
    it('returns correct mongo db uri string', () => {
      const expectedUriString = 'mongodb://staging_user:staging_pw@staging-db.somehost.com/app_staging_db';
      expect(getMongoDbUri('staging')).toEqual(expectedUriString);
    });
  });

  describe('production environment', () => {
    it('returns correct mongo db uri string', () => {
      const expectedUriString = 'mongodb://production_user:production_password123!@prod-db.somehost.com:35123/app_production_db';
      expect(getMongoDbUri('production')).toEqual(expectedUriString);
    });
  });
});
