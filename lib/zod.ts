import { object, string, coerce, array } from "zod";

// buat falidasi untuk contact form
export const contactSchema = object({
  name: string().min(6, "Name must be at least 6 characters long"),
  email: string()
    .min(6, "Email must be at least 6 characters long")
    .email("Invalid email"),
  subject: string().min(6, "Subject must be at least 6 characters long"),
  message: string()
    .min(50, "Message must be at least 50 characters long")
    .max(300, "Message must be at most 300 characters long"),
});

// buat validasi untuk room form
export const RoomSchema = object({
  name: string().min(1),
  description: string().min(50),
  capacity: coerce.number().gt(0),
  price: coerce.number().gt(0),
  amenities: array(string()).nonempty(),
});

// buat validasi untuk reservation form
export const ReserveSchema = object({
  name: string().min(1),
  phone: string().min(10),
});
