import { z } from 'zod';
import { LOCATION_CATEGORIES } from '../schemas/location.schema';
import { createZodDto } from 'nestjs-zod';

export const LocationSchema = z.object({
  id: z.string(),
  name: z.string().min(2).max(60),
  category: z.enum([...LOCATION_CATEGORIES]),
  coordinates: z.object({
    lon: z.number().min(-180).max(180),
    lat: z.number().min(-90).max(90),
  }),
  address: z.string().max(120).optional(),
  notes: z.string().max(500).optional(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export class LocationDto extends createZodDto(LocationSchema) {}
