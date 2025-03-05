import * as express from 'express';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import { SettingService } from "./setting";
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
    constructor() {}
    static configureMiddleware = (app: any) => {
      const sessionConfig = {
          secret: SettingService.JWT_SECRET,
          resave: false, // do not save session if unmodified
          saveUninitialized: false,
      };
      app
        .use(session(sessionConfig))
        .use(express.urlencoded({ extended: true }))
        .use(express.json({ limit: "100mb" }))
        .use(
          express.urlencoded({
            limit: "100mb",
            extended: true,
            parameterLimit: 50000,
          })
        )
        .use(cookieParser());
  }
  
}

export class CustomError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}