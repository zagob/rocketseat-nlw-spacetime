import "dotenv/config";

import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import fastify from "fastify";
import { authRoutes } from "./routes/auth";
import { memoriesRoutes } from "./routes/memories";

export const app = fastify();

app.register(memoriesRoutes);
app.register(authRoutes);

app.register(cors, {
  origin: true,
});

app.register(jwt, {
  secret: "nlwspacetime",
});
