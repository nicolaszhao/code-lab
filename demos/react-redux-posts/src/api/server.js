import { 
  createServer, 
  Model, 
  Factory, 
  RestSerializer,
  belongsTo,
  hasMany,
  association,
} from 'miragejs';

import { nanoid } from '@reduxjs/toolkit';
import faker from 'faker';
import { sentence, paragraph, article, setRandom } from 'txtgen';
import { parseISO } from 'date-fns';
import seedrandom from 'seedrandom';

function createSeedRng(useSeededRNG = true) {
  let rng = seedrandom();

  if (useSeededRNG) {
    let randomSeedString = localStorage.getItem('randomTimestampSeed');
    let seedDate;
    if (randomSeedString) {
      seedDate = new Date(randomSeedString);
    } else {
      seedDate = new Date();
      randomSeedString = seedDate.toISOString();
      localStorage.setItem('randomTimestampSeed', randomSeedString);
    }
    rng = seedrandom(randomSeedString);
    setRandom(rng);
    faker.seed(seedDate.getTime());
  }

  return rng;
}

const rng = createSeedRng();

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(rng() * (max - min + 1)) + min;
}

function randomFromArray(arr) {
  const index = getRandomInt(0, arr.length - 1);
  return arr[index];
}

createServer({
  models: {
    user: Model.extend({
      posts: hasMany(),
    }),
    post: Model.extend({
      user: belongsTo(),
      comments: hasMany(),
    }),
    comment: Model.extend({
      post: belongsTo(),
    }),
    notification: Model.extend({}),
  },

  factories: {
    user: Factory.extend({
      id() {
        return nanoid();
      },
      firstName() {
        return faker.name.firstName();
      },
      lastName() {
        return faker.name.lastName();
      },
      name() {
        return faker.name.findName(this.firstName, this.lastName);
      },
      username() {
        return faker.internet.userName(this.firstName, this.lastName);
      },
      afterCreate(user, server) {
        server.createList('post', 3, { user });
      },
    }),
    post: Factory.extend({
      id() {
        return nanoid();
      },
      title(i) {
        return sentence();
      },
      date(i) {
        return faker.date.recent(7);
      },
      content() {
        return article(1);
      },
      reactions() {
        return {
          thumbsUp: 0,
          hooray: 0,
          heart: 0,
          rocket: 0,
          eyes: 0,
        };
      },
      user: association(),
    }),
    comment: Factory.extend({
      id() {
        return nanoid();
      },
      date() {
        return faker.date.past(2);
      },
      text() {
        return paragraph();
      },
      post: association(),
    }),
  },

  serializers: {
    application: RestSerializer.extend({
      serializeIds: 'always',
    }),
  },

  seeds(server) {
    server.createList('user', 3);
  },

  routes() {
    this.namespace = 'api';
    this.timing = 800;

    this.resource('users');
    this.resource('posts');
    this.resource('comments');

    const server = this;

    this.post('/posts', function(schema, req) {
      const data = this.normalizedRequestAttrs();
      data.date = new Date().toISOString();
      const user = schema.users.find(data.userId);
      data.user = user;

      if (data.content === 'error') {
        throw new Error('Could not save the post!');
      }

      return server.create('post', data);
    });

    this.get('/posts/:postId/comments', (schema, req) => {
      const post = schema.posts.find(req.params.postId);
      return post.comments;
    });

    this.get('/notifications', (schema, req) => {
      const numNotifications = getRandomInt(1, 5);
      const now = new Date();
      let pastDate; 

      if (req.queryParams.since) {
        pastDate = parseISO(req.queryParams.since);
      } else {
        pastDate = new Date(now.valueOf());
        pastDate.setMinutes(pastDate.getMinutes() - 15);
      }

      const notifications = [...Array(numNotifications)].map(() => {
        const user = randomFromArray(schema.db.users);
        const template = randomFromArray([
          'poked you',
          'says hi!',
          `is glad we're friends`,
          'sent you a gift',
        ]);
        return {
          id: nanoid(),
          date: faker.date.between(pastDate, now).toISOString(),
          message: template,
          user: user.id,
          read: false,
          isNew: true,
        };
      });

      return { notifications };
    });
  },
});

