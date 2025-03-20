import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Rally extends Document {
  @Prop({
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  })
  location: {
    type: string;
    coordinates: number[];
  };

  @Prop({ required: true })
  time: Date;

  @Prop({ required: true })
  free: boolean;

  @Prop({
    required: function(): boolean {
      return !this.free;
    }
  })
  cost?: number;

  @Prop({ required: true })
  capacity: number;

  @Prop({
    type: String,
    enum: ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'],
    default: 'BEGINNER',
    required: true,
  })
  skillLevel: string;

  @Prop({
    type: Object,
    required: true,
  })
  vehicle: {
    color: string;
    make: string;
  };

  diffMin: number;
}

export const RallySchema = SchemaFactory.createForClass(Rally);