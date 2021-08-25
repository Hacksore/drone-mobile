import DroneMobile from '../src';
import { getSessionToken } from '../src/util';
jest.mock('../src/util');

const getSessionTokenMock = getSessionToken as any;

describe('DroneMobile', () => {
  it('creates a valid client without errors', done => {

    // mock the token method
    getSessionTokenMock.mockReturnValueOnce('JEST_IS_BEST')

    const client = new DroneMobile({
      username: 'xd',
      password: 'hunter1'
    })

    client.on('ready', () => {      
      expect(client.sessionInfo.accessToken).toBe('JEST_IS_BEST');
      done();
    });
  });
});
