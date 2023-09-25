/*
  Warnings:

  - You are about to drop the column `org_id` on the `users` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `orgs` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_users" ("created_at", "email", "id", "name", "password_hash") SELECT "created_at", "email", "id", "name", "password_hash" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE TABLE "new_orgs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "whatsappNumber" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "orgs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_orgs" ("address", "id", "name", "whatsappNumber") SELECT "address", "id", "name", "whatsappNumber" FROM "orgs";
DROP TABLE "orgs";
ALTER TABLE "new_orgs" RENAME TO "orgs";
CREATE UNIQUE INDEX "orgs_user_id_key" ON "orgs"("user_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
