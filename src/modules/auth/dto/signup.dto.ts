import { IsEmail, IsEnum, IsNotEmpty, ValidateIf } from 'class-validator';
import { Role } from 'src/database/enums/role.enum';

export class SignUpDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @ValidateIf((o) => o.role !== undefined)
  @IsEnum(Role)
  role?: Role;
}
