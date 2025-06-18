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
  handler: async (ctx) => {
    const confessions = await ctx.db
      .query("confessions")
      .withIndex("by_created_at")
      .order("desc")
      .collect();
    return confessions;
  },
});