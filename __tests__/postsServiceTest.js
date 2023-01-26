// use for jest with ECMAScript Modules -->  NODE_OPTIONS=--experimental-vm-modules npx jest

import * as dotenv from 'dotenv'; // to get variables from .env
import { jest } from '@jest/globals';
import { getPostById } from '../src/services/postsService';
import { WrongRequestError } from '../src/helpers/errors.js';
import { Post } from '../src/db/postModel.js';

dotenv.config();

describe('Post service getPostById test', () => {
  it('should return post data by provided ID', async () => {
    const mPostId = '1';
    const mUserId = '2';

    const post = {
      _id: mPostId,
      topic: 'topic',
      userId: mUserId,
      text: 'text',
    };

    // to imitate DB -> Post.findById
    jest.spyOn(Post, 'findById').mockImplementationOnce(async () => post);

    const result = await getPostById(mPostId, mUserId);

    expect(result._id).toEqual(mPostId);
    expect(result.userId).toEqual(mUserId);
    expect(result.topic).toBeDefined();
    expect(result.text).toBeDefined();
  });
});
