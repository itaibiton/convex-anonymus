import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const addConfession = mutation({
  args: { content: v.string() },
  handler: async (ctx, args) => {
    const confession = await ctx.db.insert("confessions", {
      content: args.content,
      createdAt: Date.now(),
    });
    return confession;
  },
});

export const getConfessions = query({
  args: { 
    paginationOpts: v.object({
      cursor: v.union(v.string(), v.null()),
      numItems: v.number(),
      id: v.optional(v.number()),
    })
  },
  handler: async (ctx, args) => {
    const confessions = await ctx.db
      .query("confessions")
      .withIndex("by_created_at")
      .order("desc")
      .paginate(args.paginationOpts);
    return confessions;
  },
});