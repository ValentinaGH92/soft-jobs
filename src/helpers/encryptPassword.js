const crypto = require("crypto");

const encryptPassword = (plainPassword, maxLength = 60) => {
  const hash = crypto.createHash("sha256").update(plainPassword).digest("hex");
  const truncatedHash = hash.slice(0, maxLength);

  return truncatedHash;
};

module.exports = encryptPassword;
