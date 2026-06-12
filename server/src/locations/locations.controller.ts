import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Location } from './schemas/location.schema';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LocationDto } from './dto/location.dto';
import { QueryFindAllDto } from './dto/queryFindAll.dto';

@ApiTags('locations')
@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Post()
  @ApiCreatedResponse({ type: LocationDto })
  async create(
    @Body() createLocationDto: CreateLocationDto,
  ): Promise<Location> {
    return this.locationsService.create(createLocationDto);
  }

  @Get()
  @ApiOkResponse({ type: LocationDto, isArray: true })
  async findAll(@Query() query: QueryFindAllDto) {
    return this.locationsService.findAll(
      query.skip,
      query.limit,
      query.category,
    );
  }

  @Patch(':id')
  @ApiOkResponse({ type: LocationDto })
  async update(
    @Param('id') id: string,
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
    return this.locationsService.update(id, updateLocationDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: LocationDto })
  async remove(@Param('id') id: string) {
    return this.locationsService.remove(id);
  }
}
