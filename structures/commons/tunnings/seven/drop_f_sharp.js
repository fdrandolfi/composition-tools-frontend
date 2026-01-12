import { getNoteDataById } from '../../notes';

// Drop F# = [5, 12, 8, 3, 10, 5, 10]

const drop_f_sharp = [
  getNoteDataById(41), // C#4
  getNoteDataById(36), // G#3
  getNoteDataById(32), // E3
  getNoteDataById(27), // B2
  getNoteDataById(22), // F#2
  getNoteDataById(17), // C#2
  getNoteDataById(10), // F#1
];

export default drop_f_sharp;
