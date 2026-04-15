import { getUsers } from "../repositories/reqresIn/users.req";
import { countUsers, fillUser } from "../services/users.service";

export const seedUsers = async () => {
  const count = await countUsers();

  if (count > 0) {
    console.log("User already exist");
    return;
  }

  const service = fillUser();

  const users = await getUsers({});

  const formatted = users.map((c) => ({
    id: c.id,
    name: c.name,
    status: c.status,
    species: c.species,
    gender: c.gender,
    origin: c.origin,
    image: c.image,
  }));

  await service.createCharacters(formatted);

  console.log("15 characters seeded successfully");
};
