import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const appsRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        url: z.string().url(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const app = await ctx.prisma.app.create({
        data: {
          name: input.name,
          description: input.description,
          url: input.url,
        },
      });
      return app.id;
    }),

  getNotApproved: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.app.findMany({
      where: {
        approved: false,
      },
      include: {
        _count: {
          select: {
            clicks: true,
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
  }),

  getFirstTen: publicProcedure
    .input(
      z.object({
        orderBy: z.enum(["clicks", "updatedAt"]),
      })
    )
    .query(({ input, ctx }) => {
      return ctx.prisma.app.findMany({
        where: { approved: true },
        include: {
          _count: {
            select: {
              clicks: true,
            },
          },
        },
        orderBy:
          input.orderBy === "clicks"
            ? {
                clicks: {
                  _count: "desc",
                },
              }
            : {
                updatedAt: "desc",
              },
        take: 10,
      });
    }),

  getApproved: publicProcedure
    .input(
      z.object({
        limit: z.number().optional(),
        search: z.string().optional(),
      })
    )
    .query(({ input, ctx }) => {
      return ctx.prisma.app.findMany({
        where: {
          AND: {
            approved: true,
          },
          OR: [
            {
              name: {
                contains: input.search,
              },
            },
            {
              description: {
                contains: input.search,
              },
            },
          ],
        },
        include: {
          _count: {
            select: {
              clicks: true,
            },
          },
        },
        orderBy: {
          clicks: {
            _count: "desc",
          },
        },

        take: input.limit,
      });
    }),

  registerClick: publicProcedure
    .input(
      z.object({
        appId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.click.create({
        data: {
          appId: input.appId,
        },
      });
    }),

  approve: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const app = await ctx.prisma.app.update({
        where: { id: input.id },
        data: { approved: true },
      });
      return app;
    }),

  dismiss: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.app.delete({
        where: { id: input.id },
      });
    }),

  getClickStats: publicProcedure.query(async ({ ctx }) => {
    const countTotalClicks = await ctx.prisma.click.count();
    const countClicksLastMonth = await ctx.prisma.click.count({
      where: {
        createdAt: {
          gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
        },
      },
    });
    return {
      countTotalClicks,
      countClicksLastMonth,
    };
  }),

  getAppStats: publicProcedure.query(async ({ ctx }) => {
    const countTotalApps = await ctx.prisma.app.count();
    const countAppsAddedLastMonth = await ctx.prisma.app.count({
      where: {
        createdAt: {
          gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
        },
      },
    });

    return {
      countTotalApps,
      countAppsAddedLastMonth,
    };
  }),
});
