import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ServiceUnavailableException,
  HttpException,
} from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Location, LocationDocument } from './schemas/location.schema';
import { LOCATION_CATEGORIES } from './schemas/location.schema';
import { HttpService } from '@nestjs/axios';
import { CoordinatesDto } from './dto/coordinates.dto';

@Injectable()
export class LocationsService {
  constructor(
    @InjectModel(Location.name)
    private locationModel: Model<LocationDocument>,
    private readonly httpService: HttpService,
  ) {}

  async create(createLocationDto: CreateLocationDto): Promise<Location> {
    try {
      const createdLocation = new this.locationModel(createLocationDto);
      return await createdLocation.save();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new ServiceUnavailableException(
        'Oops! something went wrong. Please try again later',
      );
    }
  }

  async findAll(
    skip?: number,
    limit?: number,
    category?: (typeof LOCATION_CATEGORIES)[number],
  ): Promise<Location[]> {
    try {
      const query = this.locationModel.find(category && { category: category });
      if (skip) query.skip(skip);
      if (limit) query.limit(limit);
      return await query.exec();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new ServiceUnavailableException(
        'Oops! something went wrong. Please try again later',
      );
    }
  }

  async update(id: string, updateLocationDto: UpdateLocationDto) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('The provided id is invalid');
    }
    try {
      const updatedLocation = await this.locationModel
        .findByIdAndUpdate(id, updateLocationDto, { new: true })
        .exec();
      if (!updatedLocation) {
        throw new NotFoundException(`There is no location with id ${id}`);
      }
      return updatedLocation;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new ServiceUnavailableException(
        'Oops! something went wrong. Please try again later',
      );
    }
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('The provided id is invalid');
    }
    try {
      const deletedLocation = await this.locationModel
        .findByIdAndDelete(id, { new: true })
        .exec();
      if (!deletedLocation) {
        throw new NotFoundException(`There is no location with id ${id}`);
      }
      return deletedLocation;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new ServiceUnavailableException(
        'Oops! something went wrong. Please try again later',
      );
    }
  }

  async coordinatesToAddress(coordinates: CoordinatesDto) {
    return this.httpService.get(
      `https://nominatim.openstreetmap.org/reverse?lat=${coordinates[0]}&lon=${coordinates[1]}&format=json`,
    );
  }
}
