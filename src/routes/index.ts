import { Router } from "express";
import type { Express } from "express";
import libraryRoutes from "./library";

export default () => {
    const router = Router();
    router.use("/library", libraryRoutes())
    return router;
} 