/*
  Warnings:

  - A unique constraint covering the columns `[org_id]` on the table `pets` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `org_id` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "org_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "pets_org_id_key" ON "pets"("org_id");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
