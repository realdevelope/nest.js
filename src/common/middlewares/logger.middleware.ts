import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('Http');

  use(req: Request, res: Response, next: NextFunction) {
    res.on('finsh', () => {
      this.logger.log(req.ip, req.originalUrl); //middleware 에도 의존서 주입행야함!
    });

    next();
  }
}
