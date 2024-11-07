import { Router, Request, Response } from "express";
import { DFeEventController } from "./controllers";

const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("©️ cte-simp-service");
});

router.get("/emit", async (req: Request, res: Response) => {
  const controller = new DFeEventController() 
  const result = await controller.run(req)

  res.status(200).json({ok:result});
});

export default router;
