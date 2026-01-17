import { getNoteDataById } from '../../notes';

// Standard E = [3, 11, 6, 1, 8]

const standard = [
  getNoteDataById(23), // G2
  getNoteDataById(18), // D2
  getNoteDataById(13), // A1
  getNoteDataById(8),  // E1
  getNoteDataById(3),  // B0
];

export default standard;
