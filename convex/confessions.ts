import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { auth } from "./auth";

export const addConfession = mutation({
  args: { content: v.string() },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Must be authenticated to post a confession");
    }

    const confession = await ctx.db.insert("confessions", {
      content: args.content,
      createdAt: Date.now(),
      userId: userId,
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
    
    // Get interaction counts and user's interactions for each confession
    const userId = await auth.getUserId(ctx);
    const enrichedConfessions = await Promise.all(
      confessions.page.map(async (confession) => {
        const [likesCount, commentsCount, repostsCount, userLike, userRepost] = await Promise.all([
          ctx.db.query("likes").withIndex("by_confession", (q) => q.eq("confessionId", confession._id)).collect().then(likes => likes.length),
          ctx.db.query("comments").withIndex("by_confession", (q) => q.eq("confessionId", confession._id)).collect().then(comments => comments.length),
          ctx.db.query("reposts").withIndex("by_confession", (q) => q.eq("confessionId", confession._id)).collect().then(reposts => reposts.length),
          userId ? ctx.db.query("likes").withIndex("by_confession_and_user", (q) => q.eq("confessionId", confession._id).eq("userId", userId)).first() : null,
          userId ? ctx.db.query("reposts").withIndex("by_confession_and_user", (q) => q.eq("confessionId", confession._id).eq("userId", userId)).first() : null,
        ]);

        return {
          ...confession,
          likesCount,
          commentsCount,
          repostsCount,
          isLiked: !!userLike,
          isReposted: !!userRepost,
          // Add a flag to indicate if this is a legacy confession
          isLegacy: !confession.userId,
        };
      })
    );

    return {
      ...confessions,
      page: enrichedConfessions,
    };
  },
});

export const toggleLike = mutation({
  args: { confessionId: v.id("confessions") },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Must be authenticated to like");
    }

    const existingLike = await ctx.db
      .query("likes")
      .withIndex("by_confession_and_user", (q) => q.eq("confessionId", args.confessionId).eq("userId", userId))
      .first();

    if (existingLike) {
      await ctx.db.delete(existingLike._id);
      return { liked: false };
    } else {
      await ctx.db.insert("likes", {
        confessionId: args.confessionId,
        userId,
        createdAt: Date.now(),
      });
      return { liked: true };
    }
  },
});

export const toggleRepost = mutation({
  args: { confessionId: v.id("confessions") },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Must be authenticated to repost");
    }

    const existingRepost = await ctx.db
      .query("reposts")
      .withIndex("by_confession_and_user", (q) => q.eq("confessionId", args.confessionId).eq("userId", userId))
      .first();

    if (existingRepost) {
      await ctx.db.delete(existingRepost._id);
      return { reposted: false };
    } else {
      await ctx.db.insert("reposts", {
        confessionId: args.confessionId,
        userId,
        createdAt: Date.now(),
      });
      return { reposted: true };
    }
  },
});

export const addComment = mutation({
  args: { 
    confessionId: v.id("confessions"),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Must be authenticated to comment");
    }

    const comment = await ctx.db.insert("comments", {
      confessionId: args.confessionId,
      userId,
      content: args.content,
      createdAt: Date.now(),
    });
    return comment;
  },
});