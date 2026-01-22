import jwt from "jsonwebtoken";
import crypto from "crypto";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

const ACCESS_EXPIRES_IN = "15m";
const REFRESH_EXPIRES_IN = "7d";

if (!process.env.JWT_ACCESS_SECRET) {
  throw new Error("JWT_ACCESS_SECRET missing");
}
if (!process.env.JWT_REFRESH_SECRET) {
  throw new Error("JWT_REFRESH_SECRET missing");
}


export const signAccessToken = (userId: string, role: ("user"|"admin")) => {
  return jwt.sign(
    {
      sub: userId,
      role,
    },
    ACCESS_SECRET,
    {
      expiresIn: ACCESS_EXPIRES_IN,
    }
  );
};

export const signRefreshToken = (userId: string,role:("user"|"admin")) => {
  const tokenId = crypto.randomUUID();

  const refreshToken = jwt.sign(
    {
      sub: userId,
      tokenId,
      role,
    },
    REFRESH_SECRET,
    {
      expiresIn: REFRESH_EXPIRES_IN,
    }
  );

  return {
    refreshToken,
    tokenId,
  };
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, REFRESH_SECRET) as {
    sub: string;
    tokenId: string;
    role:('admin'|"user")
  };
};