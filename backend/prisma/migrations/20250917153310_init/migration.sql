-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SimplePost" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "published" BOOLEAN DEFAULT false,
    "authorId" INTEGER,

    CONSTRAINT "SimplePost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."dog" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "size" INTEGER NOT NULL,

    CONSTRAINT "PK_187826f37fd8e592a5711350db1" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- AddForeignKey
ALTER TABLE "public"."SimplePost" ADD CONSTRAINT "SimplePost_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
