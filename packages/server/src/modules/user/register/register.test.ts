import { Connection } from 'typeorm';
import * as faker from 'faker';
import { emailNotLongEnough, invalidEmail, passwordNotLongEnough } from '@abb/common';

import { User } from '../../../entity/User';
import { duplicateEmail } from './errorMessages';
import { TestClient } from '../../../utils/TestClient';
import { createTestConn } from '../../../testUtils/createTestConn';

faker.seed(Date.now() + 5);
const email = faker.internet.email();
const password = faker.internet.password();
const client = new TestClient(process.env.TEST_HOST as string);

let conn: Connection;
beforeAll(async () => {
  conn = await createTestConn();
});
afterAll(async () => {
  conn.close();
});

describe('Register user', () => {
  it('check for duplicate email', async () => {
    const response = await client.register(email, password);
    expect(response.data).toEqual({ register: null });
    const users = await User.find({ where: { email } });
    expect(users).toHaveLength(1);
    const user = users[0];
    expect(user.email).toEqual(email);
    // 패스워드 해싱 되었는지 확인
    expect(user.password).not.toEqual(password);

    // 중복된 이메일인지 테스트
    const response2 = await client.register(email, password);
    expect(response2.data.register).toHaveLength(1);
    expect(response2.data.register[0]).toEqual({
      path: 'email',
      message: duplicateEmail,
    });
  });

  it('check bad email', async () => {
    const response3 = await client.register('b', password);
    expect(response3.data).toEqual({
      register: [
        {
          path: 'email',
          message: emailNotLongEnough,
        },
        {
          path: 'email',
          message: invalidEmail,
        },
      ],
    });
  });

  it('check bad password', async () => {
    const response4 = await client.register(faker.internet.email(), 'ad');
    expect(response4.data).toEqual({
      register: [
        {
          path: 'password',
          message: passwordNotLongEnough,
        },
      ],
    });
  });

  it('check bad password and bad email', async () => {
    const response5 = await client.register('df', 'ad');
    expect(response5.data).toEqual({
      register: [
        {
          path: 'email',
          message: emailNotLongEnough,
        },
        {
          path: 'email',
          message: invalidEmail,
        },
        {
          path: 'password',
          message: passwordNotLongEnough,
        },
      ],
    });
  });
});
