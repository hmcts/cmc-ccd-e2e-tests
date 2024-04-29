import UserRole from "./UserRole";
import UserType from "./UserType";

type User = {
  readonly email: string;
  readonly password: string;
  readonly role: UserRole;
  readonly type: UserType;
  readonly cookiesPath?: string;
  readonly userDetailsPath?: string;
};

export default User;
