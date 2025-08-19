import { sql } from "drizzle-orm";
import { pgTable, text, varchar, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const organizations = pgTable("organizations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  shortName: text("short_name"),
  urlSlug: text("url_slug"),
  website: text("website"),
  socialMedia: text("social_media"),
  email: text("email"),
  religiousAffiliation: text("religious_affiliation"),
  missionStatement: text("mission_statement"),
  goals: text("goals"),
});

export const ensembles = pgTable("ensembles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  shortName: text("short_name"),
  organizationId: varchar("organization_id").notNull().references(() => organizations.id),
  organizationName: text("organization_name"),
  website: text("website"),
  director: text("director"),
  ageGroup: text("age_group"),
  voiceType: text("voice_type"),
  ensembleType: text("ensemble_type"),
  location: text("location"),
  auditioned: text("auditioned"),
  payLevel: text("pay_level"),
  ageRestrictions: text("age_restrictions"),
  otherRestrictions: text("other_restrictions"),
  season: text("season"),
  rehearsalDetails: text("rehearsal_details"),
  description: text("description"),
});

export const insertOrganizationSchema = createInsertSchema(organizations).omit({
  id: true,
});

export const insertEnsembleSchema = createInsertSchema(ensembles).omit({
  id: true,
});

export type InsertOrganization = z.infer<typeof insertOrganizationSchema>;
export type InsertEnsemble = z.infer<typeof insertEnsembleSchema>;

export type Organization = typeof organizations.$inferSelect;
export type Ensemble = typeof ensembles.$inferSelect;

export type OrganizationWithEnsembles = Organization & {
  ensembles: Ensemble[];
};
