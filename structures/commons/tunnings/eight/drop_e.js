import { getNoteDataById } from '../../notes';

// Drop E = [8, 3, 11, 6, 1, 8, 3, 8]

const drop_e = [
  getNoteDataById(44), // E4
  getNoteDataById(39), // B3
  getNoteDataById(35), // G3
  getNoteDataById(30), // D3
  getNoteDataById(25), // A2
  getNoteDataById(20), // E2
  getNoteDataById(15), // B1
  getNoteDataById(8),  // E1
];

export default drop_e;
