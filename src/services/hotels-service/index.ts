import hotelsRepository from "@/repositories/hotels-repository"



async function findHotels(userId: number){
    const hasHotel = await hotelsRepository.ValidateifHasHotel(userId);
    
    return await hotelsRepository.listHotels()
}

async function findSpecificHotel (userId: number, hotelId: number){
    const hasHotel = await hotelsRepository.ValidateifHasHotel(userId);

    return await hotelsRepository.findHotel(hotelId)
}

const hotelsService = {
    findHotels,
    findSpecificHotel
}

export default hotelsService;