import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
    ...authTables,

    // ── User Profiles ────────────────────────────────────────────
    userProfiles: defineTable({
        userId: v.string(),
        name: v.optional(v.string()),
        role: v.union(v.literal("user"), v.literal("admin")),
        stripeCustomerId: v.optional(v.string()),
        plan: v.optional(v.union(v.literal("free"), v.literal("pro"), v.literal("enterprise"))),
        // Usage tracking
        monthlyUsageCount: v.optional(v.number()),
        usageResetAt: v.optional(v.number()),
        createdAt: v.optional(v.number()),
    }).index("by_userId", ["userId"]),

    // ── AI Prompts (CMS-style) ───────────────────────────────────
    aiPrompts: defineTable({
        promptId: v.string(),
        name: v.string(),
        content: v.string(),
        description: v.string(),
        updatedAt: v.number(),
    }).index("by_prompt_id", ["promptId"]),

    // ── AI Call Logs ─────────────────────────────────────────────
    aiLogs: defineTable({
        requestId: v.string(),
        model: v.string(),
        caller: v.string(),
        timestamp: v.number(),
        durationMs: v.number(),
        systemPrompt: v.string(),
        userPromptText: v.string(),
        hasImage: v.boolean(),
        imageSizeBytes: v.optional(v.number()),
        temperature: v.optional(v.number()),
        maxTokens: v.optional(v.number()),
        requestBodySize: v.number(),
        status: v.union(v.literal("success"), v.literal("error")),
        httpStatus: v.number(),
        responseContent: v.string(),
        responseSize: v.number(),
        finishReason: v.optional(v.string()),
        promptTokens: v.optional(v.number()),
        completionTokens: v.optional(v.number()),
        totalTokens: v.optional(v.number()),
        errorMessage: v.optional(v.string()),
    })
        .index("by_timestamp", ["timestamp"])
        .index("by_model_timestamp", ["model", "timestamp"])
        .index("by_caller", ["caller"])
        .index("by_status", ["status"]),

    // ── Audit Logs ───────────────────────────────────────────────
    auditLogs: defineTable({
        action: v.string(),
        category: v.union(v.literal("auth"), v.literal("admin"), v.literal("system"), v.literal("billing")),
        userId: v.optional(v.string()),
        targetId: v.optional(v.string()),
        details: v.string(),
        ipAddress: v.optional(v.string()),
        timestamp: v.number(),
    })
        .index("by_timestamp", ["timestamp"])
        .index("by_category", ["category", "timestamp"])
        .index("by_userId", ["userId", "timestamp"])
        .index("by_action", ["action", "timestamp"]),

    // ── Model Tests ──────────────────────────────────────────────
    modelTests: defineTable({
        testRunId: v.string(),
        model: v.string(),
        mode: v.string(),
        imageSize: v.number(),
        startedAt: v.number(),
        completedAt: v.number(),
        durationMs: v.number(),
        promptTokens: v.number(),
        completionTokens: v.number(),
        totalTokens: v.number(),
        rawResponse: v.string(),
        parsedResult: v.optional(v.string()),
        parseSuccess: v.boolean(),
        hasAllFields: v.boolean(),
        qualityNotes: v.optional(v.string()),
        status: v.string(),
        errorMessage: v.optional(v.string()),
    })
        .index("by_testRunId", ["testRunId"])
        .index("by_model", ["model"])
        .index("by_startedAt", ["startedAt"]),

    // ── Model Costs ──────────────────────────────────────────────
    modelCosts: defineTable({
        model: v.string(),
        displayName: v.optional(v.string()),
        inputCostPer1k: v.number(),
        outputCostPer1k: v.number(),
        updatedAt: v.number(),
    }).index("by_model", ["model"]),

    // ── Rate Limiting ────────────────────────────────────────────
    rateLimits: defineTable({
        key: v.string(),
        tokens: v.number(),
        lastRefill: v.number(),
    }).index("by_key", ["key"]),

    // ── Add your app-specific tables below ───────────────────────
    // Example:
    // items: defineTable({
    //     userId: v.id("users"),
    //     title: v.string(),
    //     content: v.string(),
    //     createdAt: v.number(),
    // }).index("by_user", ["userId"]),
});
