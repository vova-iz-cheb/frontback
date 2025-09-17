import {
  IsInt,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateDogDto {
  @IsString()
  @MinLength(3)
  @MaxLength(10)
  name: string;

  @IsInt()
  @Max(10)
  @Min(1)
  size: number;
}
