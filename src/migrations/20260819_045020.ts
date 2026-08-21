import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`ads_config\` ADD \`bh_web_billboard_homepage_970x250_code_html\` text;`)
  await db.run(sql`ALTER TABLE \`ads_config\` ADD \`bh_300x250_code_html\` text;`)
  await db.run(sql`ALTER TABLE \`ads_config\` ADD \`bh_300x250_b_code_html\` text;`)
  await db.run(sql`ALTER TABLE \`ads_config\` ADD \`bh_320x50_code_html\` text;`)
  await db.run(sql`ALTER TABLE \`ads_config\` ADD \`bh_hp_sticky_leaderboard_code_html\` text;`)
  await db.run(sql`ALTER TABLE \`ads_config\` ADD \`bh_mobile_banner_code_html\` text;`)
  await db.run(sql`ALTER TABLE \`ads_config\` ADD \`bh_mobile_banner_b_code_html\` text;`)
  await db.run(sql`ALTER TABLE \`ads_config\` ADD \`bh_multisize_houseads_code_html\` text;`)
  await db.run(sql`ALTER TABLE \`ads_config\` DROP COLUMN \`bh_web_billboard_homepage_970x250_code\`;`)
  await db.run(sql`ALTER TABLE \`ads_config\` DROP COLUMN \`bh_300x250_code\`;`)
  await db.run(sql`ALTER TABLE \`ads_config\` DROP COLUMN \`bh_300x250_b_code\`;`)
  await db.run(sql`ALTER TABLE \`ads_config\` DROP COLUMN \`bh_320x50_code\`;`)
  await db.run(sql`ALTER TABLE \`ads_config\` DROP COLUMN \`bh_hp_sticky_leaderboard_code\`;`)
  await db.run(sql`ALTER TABLE \`ads_config\` DROP COLUMN \`bh_mobile_banner_code\`;`)
  await db.run(sql`ALTER TABLE \`ads_config\` DROP COLUMN \`bh_mobile_banner_b_code\`;`)
  await db.run(sql`ALTER TABLE \`ads_config\` DROP COLUMN \`bh_multisize_houseads_code\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`ads_config\` ADD \`bh_web_billboard_homepage_970x250_code\` text;`)
  await db.run(sql`ALTER TABLE \`ads_config\` ADD \`bh_300x250_code\` text;`)
  await db.run(sql`ALTER TABLE \`ads_config\` ADD \`bh_300x250_b_code\` text;`)
  await db.run(sql`ALTER TABLE \`ads_config\` ADD \`bh_320x50_code\` text;`)
  await db.run(sql`ALTER TABLE \`ads_config\` ADD \`bh_hp_sticky_leaderboard_code\` text;`)
  await db.run(sql`ALTER TABLE \`ads_config\` ADD \`bh_mobile_banner_code\` text;`)
  await db.run(sql`ALTER TABLE \`ads_config\` ADD \`bh_mobile_banner_b_code\` text;`)
  await db.run(sql`ALTER TABLE \`ads_config\` ADD \`bh_multisize_houseads_code\` text;`)
  await db.run(sql`ALTER TABLE \`ads_config\` DROP COLUMN \`bh_web_billboard_homepage_970x250_code_html\`;`)
  await db.run(sql`ALTER TABLE \`ads_config\` DROP COLUMN \`bh_300x250_code_html\`;`)
  await db.run(sql`ALTER TABLE \`ads_config\` DROP COLUMN \`bh_300x250_b_code_html\`;`)
  await db.run(sql`ALTER TABLE \`ads_config\` DROP COLUMN \`bh_320x50_code_html\`;`)
  await db.run(sql`ALTER TABLE \`ads_config\` DROP COLUMN \`bh_hp_sticky_leaderboard_code_html\`;`)
  await db.run(sql`ALTER TABLE \`ads_config\` DROP COLUMN \`bh_mobile_banner_code_html\`;`)
  await db.run(sql`ALTER TABLE \`ads_config\` DROP COLUMN \`bh_mobile_banner_b_code_html\`;`)
  await db.run(sql`ALTER TABLE \`ads_config\` DROP COLUMN \`bh_multisize_houseads_code_html\`;`)
}
