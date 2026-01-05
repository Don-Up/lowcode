-- CreateTable
CREATE TABLE "ComponentData" (
    "id" SERIAL NOT NULL,
    "user" TEXT NOT NULL,
    "pageId" INTEGER NOT NULL,
    "props" JSONB NOT NULL,

    CONSTRAINT "ComponentData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ComponentData_user_pageId_key" ON "ComponentData"("user", "pageId");

-- AddForeignKey
ALTER TABLE "ComponentData" ADD CONSTRAINT "ComponentData_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
