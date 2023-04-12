import crypto from "crypto";

export const generateOtp = async () => {
  const otp = crypto.randomInt(1000, 9999);
  return otp;
};

export const hashOtp = (data) => {
  return crypto
    .createHmac("sha256", process.env.HASH_SECRET)
    .update(data)
    .digest("hex");
};

export const validateOtp = (hashedOtp, data) => {
  const computedHash = hashOtp(data);

  return computedHash === hashedOtp;
};
