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
