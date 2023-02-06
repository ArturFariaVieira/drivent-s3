import { prisma } from "@/config"
import { notFoundError } from "@/errors";
import { PaymentRequiredError } from "@/errors/payment-required-error";
import { Hotel } from "@prisma/client";
import { not } from "joi";


async function listHotels() {
    return await prisma.hotel.findMany()
}

async function ValidateifHasHotel(userId: number) {
    const enrollment = await prisma.enrollment.findFirst({
        where: {
            userId: userId,
        }
    })
    if (!enrollment) throw notFoundError();
    await findTicketByEnrollmentId(enrollment.id)
}

async function findTicketByEnrollmentId(enrollmentId: number) {
    const ticket = await prisma.ticket.findFirst({
        where: {
            enrollmentId: enrollmentId
        }
    })
    if (!ticket) throw notFoundError();
    if (ticket.status != "PAID") throw PaymentRequiredError();

    await findTicketType(ticket.ticketTypeId)
}

async function findTicketType(ticketTypeId: number) {
    const tickettype = await prisma.ticketType.findFirst({
        where: {
            id: ticketTypeId
        }

    })
    if (!tickettype.includesHotel || tickettype.isRemote) throw PaymentRequiredError()
}

async function findHotel(hotelId: number) {
    const hotel = await prisma.hotel.findFirst({
        where: {
            id: hotelId
        },
        include: {
            Rooms: true,
        
            },
        
    })
    if(!hotel) throw notFoundError();
    return hotel;
}

const hotelsRepository = {
    listHotels,
    findTicketByEnrollmentId,
    ValidateifHasHotel,
    findHotel
}

export default hotelsRepository;