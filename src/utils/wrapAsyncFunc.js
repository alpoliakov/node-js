const wrapAsyncFunc = func => async (req, res, next) =>
  await func(req, res, next).catch(next);

module.exports = wrapAsyncFunc;
