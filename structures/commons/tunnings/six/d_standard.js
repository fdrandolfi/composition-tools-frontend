import { getNoteDataById } from '../../notes';

// Original = [6, 1, 9, 4, 11, 6];

const d_standard = [
  getNoteDataById(42), // D4
  getNoteDataById(37), // A3
  getNoteDataById(33), // F3
  getNoteDataById(28), // C3
  getNoteDataById(23), // G2
  getNoteDataById(18), // D2
];

export default d_standard;
