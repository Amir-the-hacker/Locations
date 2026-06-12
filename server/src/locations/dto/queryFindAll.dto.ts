import { z } from 'zod';
import { LOCATION_CATEGORIES } from '../schemas/location.schema';
import { createZodDto } from 'nestjs-zod';

export const QueryFindAll = z.object({
  skip: z.number().optional(),
  limit: z.number().optional(),
  category: z.enum(LOCATION_CATEGORIES).optional(),
});

export class QueryFindAllDto extends createZodDto(QueryFindAll) {}
