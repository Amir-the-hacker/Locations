import { z } from 'zod';
import { LOCATION_CATEGORIES } from '../schemas/location.schema';
import { createZodDto } from 'nestjs-zod';

export const coordinatesSchema = z.object({
  lon: z.number().min(-180).max(180),
  lat: z.number().min(-90).max(90),
});

export class CoordinatesDto extends createZodDto(coordinatesSchema) {}
