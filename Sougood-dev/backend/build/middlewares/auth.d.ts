import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types/auth';
export declare const auth: (req: AuthRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare const isAdmin: (req: AuthRequest, res: Response, next: NextFunction) => void;
