import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from 'src/database/enums/role.enum';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsEnum(Role)
  role: Role;
}
