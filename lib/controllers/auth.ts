import { Auth } from "lib/models/auth";
import { User } from "lib/models/users";
import gen from "random-seed";
import addMinutos from "date-fns/addMinutes";

const seed = "anitalavalatina";
const random = gen.create(seed);
export async function findOrCreateAuth(email: string): Promise<any> {
  const cleanEmail = email.trim().toLowerCase();
  const auth = await Auth.findByEmail(cleanEmail);
  if (auth) {
    return auth;
  } else {
    const newUser = await User.createNewUser({
      email: cleanEmail,
    });
    const newAuth = await Auth.createNewAuth({
      email: cleanEmail,
      userId: newUser.id,
      code: "",
      expires: new Date(),
    });
    return newAuth;
  }
}

export async function sendCode(email: string) {
  const cleanEmail = email.trim().toLowerCase();
  const auth = await findOrCreateAuth(cleanEmail);
  const code = random.intBetween(10000, 99999);
  console.log(code);

  const now = new Date();
  const expires = addMinutos(now, 20);
  auth.data.code = code;
  auth.data.expires = expires;
  await auth.push();
  return auth;
}
