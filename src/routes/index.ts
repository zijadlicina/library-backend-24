import { Router } from "express";
import libraryRoutes from "./library";

export default () => {
    const router = Router();
    router.use("/library", libraryRoutes({router}))
    return router;
} 