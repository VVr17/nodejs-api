import { Storage } from '@google-cloud/storage';

const storage = new Storage();
const bucketName = 'social-avatar-storage';
//* upload
// const filePath = './tmp/bda45a3d-53e2-4a54-b073-f330302d280b.png';
// const destFileName = 'bda45a3d-53e2-4a54-b073-f330302d280b.png';

//*download
const fileName = 'bda45a3d-53e2-4a54-b073-f330302d280b.png';
const destFileName =
  './tmp/bda45a3d-53e2-4a54-b073-f330302d280b-downloaded.png';

async function launchDemo() {
  const options = {
    destination: destFileName,
  };

  //upload file
  // await storage.bucket(bucketName).upload(filePath, options);
  // console.log(`${filePath} uploaded to ${bucketName}`);

  // Downloads the file
  await storage.bucket(bucketName).file(fileName).download(options);
  console.log(`gs://${bucketName}/${fileName} downloaded to ${destFileName}.`);
}

launchDemo().catch(console.error);
