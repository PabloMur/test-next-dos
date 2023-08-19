import jwt from "jsonwebtoken";

export function generate(obj: any) {
  const token = jwt.sign(obj, process.env.JWT_SECRET as any);
  return token;
}

export function decode(token: any) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as any);
  } catch (error) {
    console.error("Token incorrecto");
    return null;
  }
}
