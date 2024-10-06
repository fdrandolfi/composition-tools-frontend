import { doc, getDoc, increment, setDoc } from "firebase/firestore";
import database from "../../../database/firebase";

const handler = async (req, res) => {
  const { method }= req;

  const docRef = doc(database, 'visits', 'counter');
  const getAllDoc = await getDoc(docRef);

  /**
   * POST Method
   */
  if (method === 'POST') {
    if (getAllDoc.exists()) {
      await setDoc(docRef, {
        count: increment(1)
      }, {
        merge: true,
      });
    } else {
      await setDoc(docRef, {
        count: 1,
      });
    }

    const updatedDoc = await getDoc(docRef);

    return res
      .status(200)
      .json({
        count: updatedDoc.data().count,
      });
  }

  /**
   * GET Method
   */
  if (method === 'GET') {
    if (getAllDoc.exists()) {
      return res
        .status(200)
        .json({
          count: getAllDoc.data().count,
        });
    } else {
      return res
        .status(200)
        .json({
          count: 0,
        });
    }
  }

  /**
   * Other Method
   */
  return res
    .status(405)
    .end('Method Not Allowed');
}

export default handler;
