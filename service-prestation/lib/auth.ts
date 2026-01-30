import { SignJWT, jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET
);

export interface JWTPayload {
  userId: string;
  email: string;
  role: "user" | "manager" | "admin";
}

export async function encrypt(payload: JWTPayload) {
  return await new SignJWT(payload as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(SECRET);
}

export async function decrypt(input: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(input, SECRET, {
      algorithms: ["HS256"],
    });
    return payload as unknown as JWTPayload;
  } catch {
    return null;
  }
}
