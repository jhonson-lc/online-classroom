import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const classroom = createTRPCRouter({
  findClassroom: publicProcedure
    .input(
      z
        .object({
          name: z.string().nullish(),
        })
        .nullish(),
    )
    .query(async ({ input, ctx }) => {
      type TWhere = {
        name?: string;
      };
      const where: TWhere = {};
      if (input?.name) {
        where.name = input.name;
      }
      const classrooms = await ctx.prisma.classroom.findMany({
        where,
        include: {
          teacher: true,
        },
      });
      return classrooms;
    }),
  getClassroomsForTeacher: publicProcedure.query(async ({ ctx }) => {
    const classrooms = await ctx.prisma.classroom.findMany({
      where: {
        userId: ctx.session?.user?.id,
      },
    });
    return classrooms;
  }),
  createClassroom: publicProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const classroom = await ctx.prisma.classroom.create({
        data: {
          name: input.name,
          userId: ctx.session?.user?.id as string,
        },
      });

      return classroom;
    }),
  getClassroom: publicProcedure
    .input(
      z.object({
        classroomId: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const classroom = await ctx.prisma.classroom.findUnique({
        where: {
          id: input.classroomId,
        },
      });
      return classroom;
    }),
  getAssignments: publicProcedure
    .input(
      z.object({
        classroomId: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const assignments = await ctx.prisma.assignment.findMany({
        where: {
          classroomId: input.classroomId,
        },
      });
      return assignments;
    }),
  unenroll: publicProcedure
    .input(
      z.object({
        classroomId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session?.user?.id;

      const classroom = await ctx.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          enrolledIn: {
            disconnect: {
              id: input.classroomId,
            },
          },
        },
      });
      return classroom;
    }),
  getStudents: publicProcedure
    .input(
      z.object({
        classroomId: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const classroom = await ctx.prisma.classroom.findUnique({
        where: {
          id: input.classroomId,
        },
        include: {
          students: true,
        },
      });
      return classroom?.students.map((student) => ({
        ...student,
        email: "",
      }));
    }),
  createAssignment: publicProcedure
    .input(
      z.object({
        name: z.string(),
        dueDate: z.string(),
        classroomId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const assignment = await ctx.prisma.assignment.create({
        data: {
          name: input.name,
          dueDate: input.dueDate,
          description: "This is a default assignment template",
          classroomId: input.classroomId,
        },
      });
      return assignment;
    }),
  getAssignment: publicProcedure
    .input(
      z.object({
        assignmentId: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const assignment = await ctx.prisma.assignment.findUnique({
        where: {
          id: input.assignmentId,
        },
      });
      return assignment;
    }),
  enrollInClassroom: publicProcedure
    .input(
      z.object({
        classroomId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session?.user?.id;

      const classroom = await ctx.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          enrolledIn: {
            connect: {
              id: input.classroomId,
            },
          },
        },
      });
      return classroom;
    }),
});
