import { getNoteDataById } from '../../notes';

// Standard D# = [7, 2, 10, 5, 12, 7, 2, 9]

const standard_d_sharp = [
  getNoteDataById(43), // D#4
  getNoteDataById(38), // A#3
  getNoteDataById(34), // F#3
  getNoteDataById(29), // C#3
  getNoteDataById(24), // G#2
  getNoteDataById(19), // D#2
  getNoteDataById(14), // A#1
  getNoteDataById(9),  // F1
];

export default standard_d_sharp;
