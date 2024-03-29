import * as shortid from 'shortid';
import { createWriteStream } from 'fs';

// shortid-house.png
const storeUpload = async (stream: any, mimetype: string): Promise<any> => {
  const extension = mimetype.split('/')[1];
  const id = `${shortid.generate()}.${extension}`;
  const path = `images/${id}`;

  return new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(path))
      .on('finish', () => resolve({ id, path }))
      .on('error', reject),
  );
};

export const processUpload = async (upload: any) => {
  const { createReadStream, mimetype } = await upload;
  const stream = createReadStream();
  const { id } = await storeUpload(stream, mimetype);
  return id;
};
