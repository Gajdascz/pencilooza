import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';
import adminCommands from './adminCommands.js';

/**
 * adminController
 *
 * authAndExecute(adminPassword,adminCommand)
 *  Authenticates user entered adminPassword against environment variable.
 *  If successful executes the provided adminCommand if available.
 *
 */

const adminController = {
  authAndExecute: [
    body('adminPassword')
      .trim()
      .custom((enteredPass) => {
        if (enteredPass !== process.env.ADMIN_COMMAND_PASS)
          throw new Error(`Invalid Admin Password`);
        else return true;
      }),
    body('adminCommand')
      .trim()
      .custom((command) => adminCommands.has(command)),
    asyncHandler(async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
      delete req.body.adminPassword;
      const commandCb = adminCommands.get(req.body.adminCommand);
      return await commandCb(req, res, next);
    }),
  ],
};

export default adminController;
