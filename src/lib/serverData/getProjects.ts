import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

export async function getProjects(
  args:
    | {
        select?: Prisma.ProjectSelect<DefaultArgs> | null | undefined;
        include?: Prisma.ProjectInclude<DefaultArgs> | null | undefined;
        where?: Prisma.ProjectWhereInput | undefined;
        orderBy?:
          | Prisma.ProjectOrderByWithRelationInput
          | Prisma.ProjectOrderByWithRelationInput[]
          | undefined;
        cursor?: Prisma.ProjectWhereUniqueInput | undefined;
        take?: number | undefined;
        skip?: number | undefined;
        distinct?:
          | Prisma.ProjectScalarFieldEnum
          | Prisma.ProjectScalarFieldEnum[]
          | undefined;
      }
    | undefined,
) {
  try {
    return db.project.findMany({ ...args });
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
}

export async function getProjectsCount(
  args:
    | Prisma.Subset<
        Prisma.ProjectCountArgs<DefaultArgs>,
        Prisma.ProjectCountArgs<DefaultArgs>
      >
    | undefined,
) {
  try {
    return db.project.count({ ...args });
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
}

export async function getLastProject(
  args:
    | {
        select?: Prisma.ProjectSelect<DefaultArgs> | null | undefined;
        include?: Prisma.ProjectInclude<DefaultArgs> | null | undefined;
        where?: Prisma.ProjectWhereInput | undefined;
        orderBy?:
          | Prisma.ProjectOrderByWithRelationInput
          | Prisma.ProjectOrderByWithRelationInput[]
          | undefined;
        cursor?: Prisma.ProjectWhereUniqueInput | undefined;
        take?: number | undefined;
        skip?: number | undefined;
        distinct?:
          | Prisma.ProjectScalarFieldEnum
          | Prisma.ProjectScalarFieldEnum[]
          | undefined;
      }
    | undefined,
) {
  try {
    return db.project.findFirst({
      orderBy: {
        createdAt: "desc",
      },
      ...args,
    });
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
}
