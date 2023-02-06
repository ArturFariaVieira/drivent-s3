import { Router } from "express";
import { ListHotels, findHotel } from "@/controllers/hotels-controller";
import { authenticateToken } from "@/middlewares";

const HotelsRouter = Router();

HotelsRouter
    .all("/*", authenticateToken)
    .get("", ListHotels)
    .get("/:hotelId", findHotel)

export { HotelsRouter } ;