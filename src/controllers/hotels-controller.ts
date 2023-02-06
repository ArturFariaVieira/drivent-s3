import { AuthenticatedRequest } from "@/middlewares";
import hotelsService from "@/services/hotels-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function ListHotels(req: AuthenticatedRequest, res: Response) {
    const {userId} = req
  
    const hotels = await hotelsService.findHotels(userId)
    return res.status(httpStatus.OK).send(hotels);
  }
  


export async function findHotel (req: AuthenticatedRequest, res: Response){
  const {userId} = req
  const {hotelId} = req.params
  
    const hotel = await hotelsService.findSpecificHotel(userId, Number(hotelId))
    return res.status(httpStatus.OK).send(hotel);
  
}