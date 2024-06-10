import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

export async function getBlogs(
  args:
    | undefined
    | {
        select?: Prisma.BlogSelect<DefaultArgs> | null | undefined;
        include?: Prisma.BlogInclude<DefaultArgs> | null | undefined;
        where?: Prisma.BlogWhereInput | undefined;
        orderBy?:
          | Prisma.BlogOrderByWithRelationInput
          | Prisma.BlogOrderByWithRelationInput[]
          | undefined;
        cursor?: Prisma.BlogWhereUniqueInput | undefined;
        take?: number | undefined;
        skip?: number | undefined;
        distinct?:
          | Prisma.BlogScalarFieldEnum
          | Prisma.BlogScalarFieldEnum[]
          | undefined;
      },
) {
  try {
    return db.blog.findMany({ ...args });
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
}

export async function getBlogsCount(
  args:
    | Prisma.Subset<
        Prisma.BlogCountArgs<DefaultArgs>,
        Prisma.BlogCountArgs<DefaultArgs>
      >
    | undefined,
) {
  try {
    return db.blog.count({ ...args });
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
}

export async function getLastBlog(
  args:
    | {
        select?: Prisma.BlogSelect<DefaultArgs> | null | undefined;
        include?: Prisma.BlogInclude<DefaultArgs> | null | undefined;
        where?: Prisma.BlogWhereInput | undefined;
        orderBy?:
          | Prisma.BlogOrderByWithRelationInput
          | Prisma.BlogOrderByWithRelationInput[]
          | undefined;
        cursor?: Prisma.BlogWhereUniqueInput | undefined;
        take?: number | undefined;
        skip?: number | undefined;
        distinct?:
          | Prisma.BlogScalarFieldEnum
          | Prisma.BlogScalarFieldEnum[]
          | undefined;
      }
    | undefined,
) {
  try {
    return db.blog.findFirst({
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
