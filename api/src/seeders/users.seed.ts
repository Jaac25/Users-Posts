import { countUsers, fillUser } from "../services/users.service";

export const seedUser = async () => {
  const count = await countUsers();

  if (count > 0) {
    console.log("User already exist");
    return;
  }

  const u = await fillUser();
  if (!u) {
    console.log("User not created");
    return;
  }
  console.log("User created");
};
