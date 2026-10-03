import { NextResponse } from 'next/server';
import { db } from "@/lib/db";
import { goals, projects } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function GET() {
    const allGoals = await db.select().from(goals);
    for (const g of allGoals) {
      if (g.title.includes("Hatake.Shop")) {
        await db.insert(projects).values({ title: g.title, description: "Moved from goals" });
        await db.delete(goals).where(eq(goals.id, g.id));
      }
    }
    await db.insert(goals).values({ title: "loss weight, down to 85", progress: "0" });
    return NextResponse.json({ success: true });
}
