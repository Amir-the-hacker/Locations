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

@Injectable()
export class LocationsService {
  constructor(
    @InjectModel(Location.name)
    private locationModel: Model<LocationDocument>,
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

  async findAll(): Promise<Location[]> {
    try {
      return this.locationModel.find().exec();
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
}
