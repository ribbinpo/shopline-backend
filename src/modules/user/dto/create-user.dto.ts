import { Role } from 'src/database/enums/role.enum';

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  role: Role;
}
