import { z } from 'zod';
import { LOCATION_CATEGORIES } from '../schemas/location.schema';
import { createZodDto } from 'nestjs-zod';

export const QueryFindAll = z.object({
  skip: z.coerce.number().min(0).optional(),
  limit: z.coerce.number().min(0).optional(),
  category: z.enum(LOCATION_CATEGORIES).optional(),
});

export class QueryFindAllDto extends createZodDto(QueryFindAll) {}
