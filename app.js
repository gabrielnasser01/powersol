"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = require("./routes");
const errorHandler_1 = require("./middleware/errorHandler");
const createApp = () => {
    const app = (0, express_1.default)();
    app.use((0, helmet_1.default)());
    app.use((0, cors_1.default)());
    app.use(express_1.default.json({ limit: "1mb" }));
    app.use((0, morgan_1.default)("combined"));
    app.get("/", (_req, res) => res.json({ name: "PowerSOL API", ok: true }));
    app.get("/health", (_req, res) => res.redirect("/api/health"));
    app.use("/api", routes_1.router);
    app.use(errorHandler_1.errorHandler);
    return app;
};
exports.createApp = createApp;
