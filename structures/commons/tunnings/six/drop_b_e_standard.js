import { getNoteDataById } from '../../notes';

// Drop B & E Standard = [8, 3, 11, 3, 10, 3]

const drop_b_e_standard = [
  getNoteDataById(44), // E4
  getNoteDataById(39), // B3
  getNoteDataById(35), // G3
  getNoteDataById(27), // B2
  getNoteDataById(22), // F#2
  getNoteDataById(15), // B1
];

export default drop_b_e_standard;
