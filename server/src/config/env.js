const { z } = require("zod");

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(5000),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  CLIENT_URL: z.string().url(),
  MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),
  JWT_SECRET: z.string().min(32, "JWT_SECRET must be at least 32 characters"),
  JWT_EXPIRES_IN: z.string().default("1d"),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid environment configuration:");

  parsedEnv.error.issues.forEach((issue) => {
    console.error(`- ${issue.path.join(".")}: ${issue.message}`);
  });

  process.exit(1);
}

module.exports = parsedEnv.data;
