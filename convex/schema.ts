import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

// The schema is normally optional, but Convex Auth
// requires indexes defined on `authTables`.
// The schema provides more precise TypeScript types.
export default defineSchema({
  ...authTables,
  confessions: defineTable({
    content: v.string(),
    createdAt: v.number(),
    userId: v.optional(v.id("users")),
  })
    .index("by_created_at", ["createdAt"])
    .index("by_user", ["userId"])
    .index("by_user_and_created_at", ["userId", "createdAt"]),
  
  likes: defineTable({
    confessionId: v.id("confessions"),
    userId: v.id("users"),
    createdAt: v.number(),
  })
    .index("by_confession", ["confessionId"])
    .index("by_user", ["userId"])
    .index("by_confession_and_user", ["confessionId", "userId"]),
  
  comments: defineTable({
    confessionId: v.id("confessions"),
    userId: v.id("users"),
    content: v.string(),
    createdAt: v.number(),
  })
    .index("by_confession", ["confessionId"])
    .index("by_user", ["userId"])
    .index("by_confession_and_created_at", ["confessionId", "createdAt"]),
  
  reposts: defineTable({
    confessionId: v.id("confessions"),
    userId: v.id("users"),
    createdAt: v.number(),
  })
    .index("by_confession", ["confessionId"])
    .index("by_user", ["userId"])
    .index("by_confession_and_user", ["confessionId", "userId"]),
});
