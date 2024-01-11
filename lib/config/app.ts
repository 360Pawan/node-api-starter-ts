import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

import { EmployeeRoutes } from "@/routes/employee.routes";
import { CommonRoutes } from "@/routes/common.routes";

export class App {
  public app: express.Application;

  private employeeRoutes: EmployeeRoutes = new EmployeeRoutes();
  private commonRoutes: CommonRoutes = new CommonRoutes();

  private allowedOrigins: string[] = ["http://localhost:5173"];
  // private allowedIps: string[] = ["::1"];

  constructor() {
    this.app = express();
    this.config();
    this.mongoSetup();
    this.employeeRoutes.route(this.app);
    this.commonRoutes.route(this.app);
  }

  private config(): void {
    // * Whitelisting domains
    this.app.use((req, res, next) => {
      const requestOrigin = req.get("origin");

      if (this.allowedOrigins.includes(requestOrigin)) {
        res.setHeader("Access-Control-Allow-Origin", this.allowedOrigins);
        res.setHeader(
          "Access-Control-Allow-Methods",
          "GET,HEAD,PUT,PATCH,POST,DELETE"
        );
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");

        if (req.method === "OPTIONS") {
          res.status(200).end();
        } else {
          next();
        }
      } else {
        res.status(403).send("Forbidden: You cannot use this API.");
      }
    });

    // * Whitelisting ips
    // this.app.use((req, res, next) => {
    //   const clientIp = req.ip;

    //   if (this.allowedIps.includes(clientIp)) {
    //     res.setHeader("Access-Control-Allow-Origin", "*");
    //     res.setHeader(
    //       "Access-Control-Allow-Methods",
    //       "GET,HEAD,PUT,PATCH,POST,DELETE"
    //     );
    //     res.setHeader("Access-Control-Allow-Credentials", "true");
    //     res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    //     if (req.method === "OPTIONS") {
    //       res.status(200).end();
    //     } else {
    //       next();
    //     }
    //   } else {
    //     res.status(403).send("Forbidden: You cannot use this API.");
    //   }
    // });

    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private mongoSetup(): void {
    mongoose
      .connect(`${process.env.DB_URL}`)
      .then(() => console.log("Mongo DB connected successfully."))
      .catch((error) => console.log("Error Connecting!", error));
  }
}
