import "dotenv/config";

import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import multipart from "@fastify/multipart";
import fastify from "fastify";
import { authRoutes } from "./routes/auth";
import { memoriesRoutes } from "./routes/memories";
import { uploadRotes } from "./routes/upload";
import { resolve } from "node:path";

export const app = fastify();

app.register(multipart);

app.register(require("@fastify/static"), {
  root: resolve(__dirname, "../uploads"),
  prefix: "/uploads",
});

app.register(authRoutes);
app.register(uploadRotes);
app.register(memoriesRoutes);

app.register(cors, {
  origin: true,
});

app.register(jwt, {
  secret: "nlwspacetime",
});
