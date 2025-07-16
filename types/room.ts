import { Prisma } from "@/app/generated/prisma";

// type untuk room by id
export type RoomProps = Prisma.RoomGetPayload<{
  include: { RoomAmenities: { select: { amenitiesId: true } } };
}>;

// type untuk room detail by id
export type RoomDetailProps = Prisma.RoomGetPayload<{
  include: {
    RoomAmenities: {
      include: {
        Amenities: { select: { name: true } };
      };
    };
  };
}>;

// type untuk disable date room
export type DisableDateProps = Prisma.ReservationGetPayload<{
  select: {
    startDate: true;
    endDate: true;
  };
}>;
