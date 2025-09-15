import { validationResult } from "express-validator";

export const validateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const msgs = errors.array().map(err => err.msg);
    return res.status(400).json({
      success: false,
      errors: msgs,
      message: msgs[0] // first error as message for backward compatibility
    });
  }
  next();
};
