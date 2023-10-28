"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importStar(require("express"));
const db_connect_1 = require("./database/db_connect");
dotenv_1.default.config();
const app = (0, express_1.default)();
//! MIDDLE WARE FOR PARSING JSON
app.use((0, express_1.urlencoded)({ extended: true }));
app.use((0, express_1.json)());
//! SWAGGER UI
const swaggerUI = __importStar(require("swagger-ui-express"));
const swaggerJson = __importStar(require("./tsoa/tsoa.json"));
//! SERVING SWAGGER UI
app.use(["/openapi", "/docs", "/swagger"], swaggerUI.serve, swaggerUI.setup(swaggerJson));
//! SERVE SWAGGER  JSON
app.get("/swagger.json", (_, res) => {
    res.setHeader("Content-Type", "application/json");
    res.sendFile(__dirname + "/tsoa/tsoa.json");
});
const routes_1 = require("./routes/routes");
(0, routes_1.RegisterRoutes)(app);
//! ERROR HANDLER
const error_handler_1 = require("./middleware/error_handler");
app.use(error_handler_1.errorHandlerMiddleware);
const port = process.env.PORT || process.env.BACKUP_PORT;
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mongoUri = process.env.MONGO_URI;
        if (!mongoUri) {
            throw new Error("MONGO_URI is missing in .env file");
        }
        console.log("Connecting to database...");
        yield (0, db_connect_1.connectToDatabase)(mongoUri);
        console.log("Connected to database");
        console.log("Starting server...");
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
    catch (e) {
        console.log(e);
    }
});
start();
