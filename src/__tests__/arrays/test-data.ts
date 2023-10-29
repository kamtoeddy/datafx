type Bio = {
  facebook: { displayName: string; followers: number; link: string };
};

export type User = {
  age: number;
  bio: Bio;
  id: number;
  name: string;
};

export const users: User[] = [
  {
    id: 1,
    name: 'James',
    age: 10,
    bio: {
      facebook: {
        displayName: 'james-1',
        followers: 0,
        link: '/facebook/james'
      }
    }
  },
  {
    id: 2,
    name: 'Mary',
    age: 11,
    bio: {
      facebook: {
        displayName: 'mary-jane',
        followers: 0,
        link: '/facebook/mary'
      }
    }
  },
  {
    id: 3,
    name: 'Peter',
    age: 15,
    bio: {
      facebook: { displayName: 'mr_p', followers: 0, link: '/facebook/peter' }
    }
  },
  {
    id: 1,
    name: 'James',
    age: 15,
    bio: {
      facebook: {
        displayName: 'james-2',
        followers: 0,
        link: '/facebook/james'
      }
    }
  }
];
