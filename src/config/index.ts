export default () => ({
  port: process.env.PORT || 3000,
  cookie_session_key: process.env.COOKIE_SESSION_KEY,
  hash_length: process.env.HASH_LENGTH,
  salt_length: process.env.SALT_LENGTH,
});
