import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

export default function getUsers(
  args:
    | undefined
    | {
        select?: Prisma.UserSelect<DefaultArgs> | null | undefined;
        include?: Prisma.UserInclude<DefaultArgs> | null | undefined;
        where?: Prisma.UserWhereInput | undefined;
        orderBy?:
          | Prisma.UserOrderByWithRelationInput
          | Prisma.UserOrderByWithRelationInput[]
          | undefined;
        cursor?: Prisma.UserWhereUniqueInput | undefined;
        take?: number | undefined;
        skip?: number | undefined;
        distinct?:
          | Prisma.UserScalarFieldEnum
          | Prisma.UserScalarFieldEnum[]
          | undefined;
      },
) {
  try {
    return db.user.findMany({ ...args });
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
}
