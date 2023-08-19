import { firestore } from "lib/firebaseConn";
import isAfter from "date-fns/isAfter";
const collection = firestore.collection("auth");
export class Auth {
  ref: FirebaseFirestore.DocumentReference;
  data: any;
  id: string;
  constructor(id: string) {
    this.id = id;
    this.ref = collection.doc(id);
  }
  async pull() {
    const snap = await this.ref.get();
    this.data = snap.data();
  }
  async push() {
    await this.ref.update(this.data);
  }

  isCodeExpired() {
    const now = new Date();
    const expires = this.data.expires.toDate();
    return isAfter(now, expires);
  }

  static cleanEmail(email: string) {
    const cleanEmail = email.trim().toLowerCase();
    return cleanEmail;
  }

  static async findByEmail(email: string) {
    const cleanEmail = Auth.cleanEmail(email);
    const results = await collection.where("email", "==", cleanEmail).get();
    if (results.docs.length) {
      const first = results.docs[0];
      const newAuth = new Auth(first.id);
      newAuth.data = first.data();
      return newAuth;
    } else {
      return null;
    }
  }
  static async createNewAuth(data: any) {
    const newAuthSnap = await collection.add(data);
    const newAuth = new Auth(newAuthSnap.id);
    newAuth.data = data;
    return newAuth;
  }
  static async findByEmailAndCode(email: string, code: any) {
    const cleanEmail = Auth.cleanEmail(email);
    const auth = await collection
      .where("email", "==", cleanEmail)
      .where("code", "==", code)
      .get();
    if (auth.empty) {
      console.error("email o codigo incorrecto");
      return null;
    } else {
      const doc = auth.docs[0];
      const newAuth = new Auth(doc.id);
      newAuth.data = doc.data();
      await newAuth.push();
      return newAuth;
    }
  }
}
