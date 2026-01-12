import { getNoteDataById } from '../../notes';

// Original = [8, 3, 11, 6, 1, 8];

const standard = [
  getNoteDataById(44), // E4
  getNoteDataById(39), // B3
  getNoteDataById(35), // G3
  getNoteDataById(30), // D3
  getNoteDataById(25), // A2
  getNoteDataById(20), // E2
];

export default standard;
