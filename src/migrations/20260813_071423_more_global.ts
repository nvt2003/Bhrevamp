import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`home_page_trending_in_top\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`keyword\` text NOT NULL,
  	\`order\` numeric DEFAULT 0,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_trending_in_top_order_idx\` ON \`home_page_trending_in_top\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_trending_in_top_parent_id_idx\` ON \`home_page_trending_in_top\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`footer_social_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`platform\` text NOT NULL,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_social_links_order_idx\` ON \`footer_social_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_social_links_parent_id_idx\` ON \`footer_social_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`footer_columns_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`url\` text NOT NULL,
  	\`new_tab\` integer DEFAULT false,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer_columns\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_columns_links_order_idx\` ON \`footer_columns_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_columns_links_parent_id_idx\` ON \`footer_columns_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`footer_columns\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_columns_order_idx\` ON \`footer_columns\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_columns_parent_id_idx\` ON \`footer_columns\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`footer_bottom_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_bottom_links_order_idx\` ON \`footer_bottom_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_bottom_links_parent_id_idx\` ON \`footer_bottom_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`footer\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`logo_id\` integer NOT NULL,
  	\`app_store_links_app_store_url\` text,
  	\`app_store_links_google_play_url\` text,
  	\`copyright_text\` text DEFAULT '2025 © BH, New Straits Times Press (M) Bhd. All rights reserved.',
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_logo_idx\` ON \`footer\` (\`logo_id\`);`)
  await db.run(sql`CREATE TABLE \`ads_config\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`bh_active\` integer DEFAULT true,
  	\`bh_image_url\` text,
  	\`bh_link\` text,
  	\`bh_code\` text,
  	\`bh_size_preset\` text DEFAULT 'max-w-[970px] aspect-[970/90]',
  	\`bh_custom_width\` numeric,
  	\`bh_custom_height\` numeric,
  	\`ad_before_terkini_active\` integer DEFAULT true,
  	\`ad_before_terkini_image_url\` text,
  	\`ad_before_terkini_link\` text,
  	\`ad_before_terkini_code\` text,
  	\`ad_before_terkini_size_preset\` text DEFAULT 'max-w-[300px] aspect-[300/250]',
  	\`ad_before_terkini_custom_width\` numeric,
  	\`ad_before_terkini_custom_height\` numeric,
  	\`ad_before_poscast_active\` integer DEFAULT true,
  	\`ad_before_poscast_image_url\` text,
  	\`ad_before_poscast_link\` text,
  	\`ad_before_poscast_code\` text,
  	\`ad_before_poscast_size_preset\` text DEFAULT 'max-w-[300px] aspect-[300/250]',
  	\`ad_before_poscast_custom_width\` numeric,
  	\`ad_before_poscast_custom_height\` numeric,
  	\`bh_320x50_active\` integer DEFAULT true,
  	\`bh_320x50_image_url\` text,
  	\`bh_320x50_link\` text,
  	\`bh_320x50_code\` text,
  	\`bh_320x50_size_preset\` text DEFAULT 'max-w-[320px] aspect-[320/50]',
  	\`bh_320x50_custom_width\` numeric,
  	\`bh_320x50_custom_height\` numeric,
  	\`bh_hp_sticky_leaderboard_active\` integer DEFAULT false,
  	\`bh_hp_sticky_leaderboard_image_url\` text,
  	\`bh_hp_sticky_leaderboard_link\` text,
  	\`bh_hp_sticky_leaderboard_code\` text,
  	\`bh_mobile_banner_active\` integer DEFAULT false,
  	\`bh_mobile_banner_image_url\` text,
  	\`bh_mobile_banner_link\` text,
  	\`bh_mobile_banner_code\` text,
  	\`bh_mobile_banner_b_active\` integer DEFAULT false,
  	\`bh_mobile_banner_b_image_url\` text,
  	\`bh_mobile_banner_b_link\` text,
  	\`bh_mobile_banner_b_code\` text,
  	\`bh_multisize_houseads_active\` integer DEFAULT true,
  	\`bh_multisize_houseads_image_url\` text,
  	\`bh_multisize_houseads_link\` text,
  	\`bh_multisize_houseads_code\` text,
  	\`bh_multisize_houseads_size_preset\` text DEFAULT 'max-w-[970px] aspect-[970/90]',
  	\`bh_multisize_houseads_custom_width\` numeric,
  	\`bh_multisize_houseads_custom_height\` numeric,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`header_sliders\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`category\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`order\` numeric DEFAULT 0,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`header_sliders_order_idx\` ON \`header_sliders\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`header_sliders_parent_id_idx\` ON \`header_sliders\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`header_sliders_image_idx\` ON \`header_sliders\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`header\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`DROP TABLE \`utama\`;`)
  await db.run(sql`DROP TABLE \`utama_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	\`categories_id\` integer,
  	\`sliders_id\` integer,
  	\`trending_id\` integer,
  	\`posts_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`sliders_id\`) REFERENCES \`sliders\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`trending_id\`) REFERENCES \`trending\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "media_id", "categories_id", "sliders_id", "trending_id", "posts_id") SELECT "id", "order", "parent_id", "path", "users_id", "media_id", "categories_id", "sliders_id", "trending_id", "posts_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_categories_id_idx\` ON \`payload_locked_documents_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_sliders_id_idx\` ON \`payload_locked_documents_rels\` (\`sliders_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_trending_id_idx\` ON \`payload_locked_documents_rels\` (\`trending_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_posts_id_idx\` ON \`payload_locked_documents_rels\` (\`posts_id\`);`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_thumbnail_url\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_thumbnail_width\` numeric;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_thumbnail_height\` numeric;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_thumbnail_mime_type\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_thumbnail_filesize\` numeric;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_thumbnail_filename\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_card_url\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_card_width\` numeric;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_card_height\` numeric;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_card_mime_type\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_card_filesize\` numeric;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_card_filename\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_tablet_url\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_tablet_width\` numeric;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_tablet_height\` numeric;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_tablet_mime_type\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_tablet_filesize\` numeric;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_tablet_filename\` text;`)
  await db.run(sql`CREATE INDEX \`media_sizes_thumbnail_sizes_thumbnail_filename_idx\` ON \`media\` (\`sizes_thumbnail_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_card_sizes_card_filename_idx\` ON \`media\` (\`sizes_card_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_tablet_sizes_tablet_filename_idx\` ON \`media\` (\`sizes_tablet_filename\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`utama\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`excerpt\` text,
  	\`featured_image_id\` integer,
  	\`category_id\` integer NOT NULL,
  	\`is_featured\` integer DEFAULT false,
  	\`published_at\` text,
  	\`position\` text DEFAULT 'grid',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`featured_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`utama_slug_idx\` ON \`utama\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`utama_featured_image_idx\` ON \`utama\` (\`featured_image_id\`);`)
  await db.run(sql`CREATE INDEX \`utama_category_idx\` ON \`utama\` (\`category_id\`);`)
  await db.run(sql`CREATE INDEX \`utama_updated_at_idx\` ON \`utama\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`utama_created_at_idx\` ON \`utama\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`utama_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`utama_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`utama\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`utama_id\`) REFERENCES \`utama\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`utama_rels_order_idx\` ON \`utama_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`utama_rels_parent_idx\` ON \`utama_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`utama_rels_path_idx\` ON \`utama_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`utama_rels_utama_id_idx\` ON \`utama_rels\` (\`utama_id\`);`)
  await db.run(sql`DROP TABLE \`home_page_trending_in_top\`;`)
  await db.run(sql`DROP TABLE \`footer_social_links\`;`)
  await db.run(sql`DROP TABLE \`footer_columns_links\`;`)
  await db.run(sql`DROP TABLE \`footer_columns\`;`)
  await db.run(sql`DROP TABLE \`footer_bottom_links\`;`)
  await db.run(sql`DROP TABLE \`footer\`;`)
  await db.run(sql`DROP TABLE \`ads_config\`;`)
  await db.run(sql`DROP TABLE \`header_sliders\`;`)
  await db.run(sql`DROP TABLE \`header\`;`)
  await db.run(sql`DROP INDEX \`media_sizes_thumbnail_sizes_thumbnail_filename_idx\`;`)
  await db.run(sql`DROP INDEX \`media_sizes_card_sizes_card_filename_idx\`;`)
  await db.run(sql`DROP INDEX \`media_sizes_tablet_sizes_tablet_filename_idx\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_thumbnail_url\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_thumbnail_width\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_thumbnail_height\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_thumbnail_mime_type\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_thumbnail_filesize\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_thumbnail_filename\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_card_url\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_card_width\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_card_height\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_card_mime_type\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_card_filesize\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_card_filename\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_tablet_url\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_tablet_width\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_tablet_height\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_tablet_mime_type\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_tablet_filesize\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_tablet_filename\`;`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`utama_id\` integer REFERENCES utama(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_utama_id_idx\` ON \`payload_locked_documents_rels\` (\`utama_id\`);`)
}
