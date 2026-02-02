import { Resource } from "@codepwn-ai/console-resource"
import { Actor } from "@codepwn-ai/console-core/actor.js"
import { query } from "@solidjs/router"
import { withActor } from "~/context/auth.withActor"
import { and, Database, desc, eq, isNull } from "@codepwn-ai/console-core/drizzle/index.js"
import { WorkspaceTable } from "@codepwn-ai/console-core/schema/workspace.sql.js"
import { UserTable } from "@codepwn-ai/console-core/schema/user.sql.js"

export function formatDateForTable(date: Date) {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }
  return date.toLocaleDateString(undefined, options).replace(",", ",")
}

export function formatDateUTC(date: Date) {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
    timeZone: "UTC",
  }
  return date.toLocaleDateString("en-US", options)
}

export function formatBalance(_amount: number) {
  // Balance display disabled - billing removed
  return "0.00"
}

export async function getLastSeenWorkspaceID() {
  "use server"
  return withActor(async () => {
    const actor = Actor.assert("account")
    return Database.use(async (tx) =>
      tx
        .select({ id: WorkspaceTable.id })
        .from(UserTable)
        .innerJoin(WorkspaceTable, eq(UserTable.workspaceID, WorkspaceTable.id))
        .where(
          and(
            eq(UserTable.accountID, actor.properties.accountID),
            isNull(UserTable.timeDeleted),
            isNull(WorkspaceTable.timeDeleted),
          ),
        )
        .orderBy(desc(UserTable.timeSeen))
        .limit(1)
        .then((x) => x[0]?.id),
    )
  })
}

export const querySessionInfo = query(async (workspaceID: string) => {
  "use server"
  return withActor(() => {
    return {
      isAdmin: Actor.userRole() === "admin",
      isBeta: Resource.App.stage === "production" ? workspaceID === "wrk_01K46JDFR0E75SG2Q8K172KF3Y" : true,
    }
  }, workspaceID)
}, "session.get")

// Billing queries and actions disabled - all billing functionality removed
export const queryBillingInfo = query(async (_workspaceID: string) => {
  "use server"
  // Return null billing info - billing functionality removed
  return null
}, "billing.get")

export const createCheckoutUrl = async () => {
  "use server"
  // Checkout disabled - billing functionality removed
  return { error: "Billing is disabled", data: undefined }
}
