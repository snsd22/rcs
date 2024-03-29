import { ResolverMap } from '../../../types/graphql-utils';
import { Listing } from '../../../entity/Listing';
import { processUpload } from '../shared/processUpload';
import { listingCacheKey } from '../../../constants';
// import { isAuthenticated } from "../../shared/isAuthenticated";

export const resolvers: ResolverMap = {
  Mutation: {
    createListing: async (_, { input: { picture, ...data } }, { session, redis }) => {
      // isAuthenticated(session);

      // upload my computer
      const pictureUrl = picture ? await processUpload(picture) : null;

      const listing = await Listing.create({
        ...(data as Listing),
        pictureUrl,
        userId: session.userId,
      }).save();

      redis.lpush(listingCacheKey, JSON.stringify(listing));

      return true;
    },
  },
};
