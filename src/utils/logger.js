const log = (level, message) => {
  const ts = new Date().toISOString();
  console.log(`[${ts}] [${level.toUpperCase()}] ${message}`);
};
module.exports = {
  info:  (msg) => log('info', msg),
  error: (msg) => log('error', msg),
  warn:  (msg) => log('warn', msg),
};
