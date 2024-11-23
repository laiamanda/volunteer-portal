CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");

CREATE SCHEMA IF NOT EXISTS "accounts";

CREATE TABLE IF NOT EXISTS "accounts"."users" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "username" TEXT NOT NULL,
  "password" TEXT NOT NULL
);

CREATE SCHEMA IF NOT EXISTS "volunteer_entries";

CREATE TABLE IF NOT EXISTS "volunteer_entries"."entries" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "user" TEXT NOT NULL,
  "organization" TEXT NOT NULL,
  "role" TEXT,
  "number_of_hours" INTEGER NOT NULL,
);