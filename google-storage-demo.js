import { Storage } from '@google-cloud/storage';

const storage = new Storage();
const bucketName = 'social-avatar-storage';
const filePath = './tmp/bda45a3d-53e2-4a54-b073-f330302d280b.png';
const destFileName = 'bda45a3d-53e2-4a54-b073-f330302d280b.png';

async function launchDemo() {
  const options = {
    destination: destFileName,
  };

  await storage.bucket(bucketName).upload(filePath, options);

  console.log(`${filePath} uploaded to ${bucketName}`);
}

launchDemo().catch(console.error);
