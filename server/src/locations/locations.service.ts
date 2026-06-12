import {
  Injectable,
  NotFoundException,
  BadRequestException,
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
    const createdLocation = new this.locationModel(createLocationDto);
    return await createdLocation.save();
  }

  async findAll(): Promise<Location[]> {
    return this.locationModel.find().exec();
  }

  async update(id: string, updateLocationDto: UpdateLocationDto) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('The provided id is invalid');
    }
    const updatedLocation = await this.locationModel
      .findByIdAndUpdate(id, updateLocationDto, { new: true })
      .exec();
    if (!updatedLocation) {
      throw new NotFoundException(`There is no location with id ${id}`);
    }
    return updatedLocation;
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('The provided id is invalid');
    }
    const deletedLocation = await this.locationModel
      .findByIdAndDelete(id, { new: true })
      .exec();
    if (!deletedLocation) {
      throw new NotFoundException(`There is no location with id ${id}`);
    }
    return deletedLocation;
  }
}
