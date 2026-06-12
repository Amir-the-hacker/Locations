import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export const LOCATION_CATEGORIES = ['office', 'store', 'landmark'] as const;
export type LocationDocument = HydratedDocument<Location>;

@Schema({
  timestamps: true,
  toObject: {
    transform: (doc, ret) => {
      const { __v, _id, ...cleanRet } = ret;
      return { ...cleanRet, id: _id };
    },
  },
  toJSON: {
    transform: (doc, ret) => {
      const { __v, _id, ...cleanRet } = ret;
      return { ...cleanRet, id: _id };
    },
  },
})
export class Location {
  @Prop({ type: String, required: true, index: true })
  name: string;

  @Prop({
    type: String,
    required: true,
    index: true,
    enum: LOCATION_CATEGORIES,
  })
  category: (typeof LOCATION_CATEGORIES)[number];

  @Prop({
    type: {
      lon: { type: Number, required: true },
      lat: { type: Number, required: true },
    },
    _id: false,
  })
  coordinates: {
    lon: number;
    lat: number;
  };

  @Prop({ type: String, required: false, index: true })
  address?: string;

  @Prop({ type: String, required: false })
  notes?: string;
}

export const LocationSchema = SchemaFactory.createForClass(Location);
