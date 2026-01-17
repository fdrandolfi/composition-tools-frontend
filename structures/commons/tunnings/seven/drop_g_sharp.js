import { getNoteDataById } from '../../notes';

// Drop G# = [7, 2, 10, 5, 12, 7, 12]

const drop_g_sharp = [
  getNoteDataById(42), // D4
  getNoteDataById(37), // A3
  getNoteDataById(33), // F3
  getNoteDataById(28), // C3
  getNoteDataById(23), // G2
  getNoteDataById(18), // D2
  getNoteDataById(11), // G1
];

export default drop_g_sharp;
