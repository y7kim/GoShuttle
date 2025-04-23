import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested
} from 'class-validator';

export class LocationDTO {
  readonly type: "Point";
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  readonly coordinates: number[];
}

export class VehicleDTO {
  @IsNotEmpty()
  @IsString()
  readonly color: string;

  @IsNotEmpty()
  @IsString()
  readonly make: string;
}

export class CreateRallyDto {
  @ValidateNested()
  @Type(() => LocationDTO)
  location: LocationDTO;

  @IsNotEmpty()
  @IsNumber()
  readonly capacity: number;

  @IsNotEmpty()
  readonly skillLevel: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";

  @IsNotEmpty()
  @IsDateString()
  readonly time: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly free: boolean;

  @IsNumber()
  @IsOptional()
  readonly cost?: number;

  @ValidateNested()
  @Type(() => VehicleDTO)
  vehicle: VehicleDTO

  @IsNotEmpty()
  @IsString()
  readonly username: string;
}