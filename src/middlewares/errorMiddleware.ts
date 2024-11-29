import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { ResourceNotExistError, ValidationError } from '../types/errors';

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ZodError) {
    console.log(err);
    const pathes = err.issues.map((issue) => issue.path.join(', ')).join(', ');
    res.status(422).json({
      title: err.name,
      detail: `Validation error in the ${err.issues.length} following fields: ${pathes}`,
      errors: err.issues,
    });
    return;
  };
  if (err instanceof ValidationError) {
    console.log(err);
    res.status(400).json({
      title: err.name,
      detail: err.message,
    });
    return;
  };
  if (err instanceof ResourceNotExistError) {
    console.log(err);
    res.status(404).json({
      title: err.name,
      detail: err.message,
    });
    return;
  };
  console.log(err);
  res.status(500).json({
    title: 'Internal Server Error',
  });
}