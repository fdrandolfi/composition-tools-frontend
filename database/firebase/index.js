import { getFirestore } from 'firebase/firestore';
import { config } from './config';

const database = getFirestore(config);

export default database;
