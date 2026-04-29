import bcrypt from 'bcrypt';

/**
 * Checks whether the given cleartext password generates the same hash as the one that is provided.
 *
 * @param {string} cleartextPassword
 * @param {string} hash The hash to compare against
 * @param {string} key The key with which the given hash was generated
 * @return {boolean} Returns true, if the given cleartextPassword generates the same hash. false otherwise.
 */
export function checkRoomPassword(cleartextPassword, hash, key) {
  const recreatedHash = bcrypt.hashSync(cleartextPassword, key);
  return hash === recreatedHash;
}

/**
 *
 * @param cleartextPassword
 * @return {{salt: string, hash: string}}
 */
export function hashRoomPassword(cleartextPassword) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(cleartextPassword, salt);
  return {salt, hash};
}
