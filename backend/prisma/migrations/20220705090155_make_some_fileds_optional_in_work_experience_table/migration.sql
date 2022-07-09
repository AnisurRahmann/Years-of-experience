-- AlterTable
ALTER TABLE "WorkExperience" ALTER COLUMN "company" DROP NOT NULL,
ALTER COLUMN "start_date" DROP NOT NULL,
ALTER COLUMN "end_date" DROP NOT NULL,
ALTER COLUMN "company_logo_url" DROP NOT NULL,
ALTER COLUMN "job_description" DROP NOT NULL,
ALTER COLUMN "job_title" DROP NOT NULL;
