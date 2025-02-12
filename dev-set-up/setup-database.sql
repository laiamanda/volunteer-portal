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
  "password" TEXT NOT NULL,
  "first_name" VARCHAR(255),
  "last_name" VARCHAR(255),
  "email" TEXT,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  "birthday" DATE,
  "location" TEXT;
);

CREATE SCHEMA IF NOT EXISTS "organizations";

CREATE TABLE IF NOT EXISTS "organizations"."entries" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL
 );

CREATE SCHEMA IF NOT EXISTS "volunteer_entries";

CREATE TABLE IF NOT EXISTS "volunteer_entries"."entries" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "user" TEXT NOT NULL,
  "organization" TEXT NOT NULL,
  "role" TEXT,
  "number_of_hours" INTEGER NOT NULL,
);