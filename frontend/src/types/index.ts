export type UserRole = "ADMIN" | "BARBER" | "CLIENT";

export type PublicService = {
  id: string;
  name: string;
  description?: string;
  price: number;
  durationMin: number;
};

export type Barber = {
  id: string;
  specialty?: string;
  experience: number;
  user: {
    name: string;
    avatarUrl?: string;
  };
};

export type AppointmentStatus = "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELED";
