import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';
import adminCommands from './adminCommands.js';
import { setRes } from '../../config/utils.js';
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
        if (enteredPass !== process.env.ADMIN_COMMAND_PASS) throw new Error(`Invalid Admin Password`);
        else return true;
      }),
    body('adminCommand')
      .trim()
      .custom((command) => {
        if (!adminCommands.has(command)) throw new Error(`Unknown Admin Command: ${command}`);
        else return true;
      }),
    asyncHandler(async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return setRes(res, 401, { alert: 'Admin Authentication Error', errors: errors.array() });
      delete req.body.adminPassword;
      const commandCb = adminCommands.get(req.body.adminCommand);
      delete req.body.adminCommand;
      return await commandCb(req, res, next);
    }),
  ],
};

export default adminController;
