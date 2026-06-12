import { createLocationSchema } from './create-location.dto';
import { createZodDto } from 'nestjs-zod';

export const updateLocationSchema = createLocationSchema.partial();

export class UpdateLocationDto extends createZodDto(updateLocationSchema) {}
