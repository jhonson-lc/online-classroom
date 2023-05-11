import { Roles } from "../server/utils/constants";

const mockUsers: Record<
  string,
  {
    id: string;
    role: Roles;
    name: string;
    email: string;
    image: string | null;
  } | null
> = {
  teacher: {
    id: "al814zcy80074hloomogrg1mv",
    role: Roles.Teacher,
    name: "Teacher Rick",
    email: "testing@example.com",
    image: null,
  },
  student: {
    id: "bl814zcy80074hloomogrg1mv",
    role: Roles.Student,
    name: "Student Bob",
    email: "testing@example.com",
    image: null,
  },
  unauthenticated: null,
};

export const getMockUser = (role: string) => {
  return mockUsers[role];
};
