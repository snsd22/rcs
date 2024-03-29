import * as DataLoader from 'dataloader';
import { User } from '../entity/User';

type BatchUser = (ids: string[]) => Promise<User[]>;

// users = [{id: 1, name: 'kim}, {id: 2, name: 'lee'}]

const batchUsers: BatchUser = async (ids) => {
  const users = await User.findByIds(ids);

  const userMap: { [key: string]: User } = {};
  users.forEach((u) => {
    userMap[u.id] = u;
  });

  return ids.map((id) => userMap[id]);
};

export const userLoader = () => new DataLoader<string, User>(batchUsers as any);
