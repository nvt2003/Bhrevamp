import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`users_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_sessions_order_idx\` ON \`users_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_sessions_parent_id_idx\` ON \`users_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric
  );
  `)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE TABLE \`categories\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`categories_slug_idx\` ON \`categories\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`categories_updated_at_idx\` ON \`categories\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`categories_created_at_idx\` ON \`categories\` (\`created_at\`);`)
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
  await db.run(sql`CREATE TABLE \`sliders\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`category\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`order\` numeric DEFAULT 0,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`sliders_image_idx\` ON \`sliders\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`sliders_updated_at_idx\` ON \`sliders\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`sliders_created_at_idx\` ON \`sliders\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`trending\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`keyword\` text NOT NULL,
  	\`order\` numeric DEFAULT 0,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`trending_updated_at_idx\` ON \`trending\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`trending_created_at_idx\` ON \`trending\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`posts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`excerpt\` text,
  	\`content\` text NOT NULL,
  	\`featured_image_id\` integer,
  	\`category_id\` integer NOT NULL,
  	\`status\` text DEFAULT 'draft' NOT NULL,
  	\`published_at\` text,
  	\`is_featured\` integer DEFAULT false,
  	\`is_trending\` integer DEFAULT false,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`seo_image_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`featured_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_slug_idx\` ON \`posts\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`posts_featured_image_idx\` ON \`posts\` (\`featured_image_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_category_idx\` ON \`posts\` (\`category_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_status_idx\` ON \`posts\` (\`status\`);`)
  await db.run(sql`CREATE INDEX \`posts_published_at_idx\` ON \`posts\` (\`published_at\`);`)
  await db.run(sql`CREATE INDEX \`posts_seo_seo_image_idx\` ON \`posts\` (\`seo_image_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_updated_at_idx\` ON \`posts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`posts_created_at_idx\` ON \`posts\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`posts_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`posts_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_rels_order_idx\` ON \`posts_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_parent_idx\` ON \`posts_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_path_idx\` ON \`posts_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_posts_id_idx\` ON \`posts_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	\`categories_id\` integer,
  	\`utama_id\` integer,
  	\`sliders_id\` integer,
  	\`trending_id\` integer,
  	\`posts_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`utama_id\`) REFERENCES \`utama\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`sliders_id\`) REFERENCES \`sliders\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`trending_id\`) REFERENCES \`trending\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_categories_id_idx\` ON \`payload_locked_documents_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_utama_id_idx\` ON \`payload_locked_documents_rels\` (\`utama_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_sliders_id_idx\` ON \`payload_locked_documents_rels\` (\`sliders_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_trending_id_idx\` ON \`payload_locked_documents_rels\` (\`trending_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_posts_id_idx\` ON \`payload_locked_documents_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`home_page_bh_plus_section_galeri_foto_section_gallery_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`caption\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_bh_plus_section_galeri_foto_section_gallery_images_order_idx\` ON \`home_page_bh_plus_section_galeri_foto_section_gallery_images\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_bh_plus_section_galeri_foto_section_gallery_images_parent_id_idx\` ON \`home_page_bh_plus_section_galeri_foto_section_gallery_images\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_bh_plus_section_galeri_foto_section_gallery_im_idx\` ON \`home_page_bh_plus_section_galeri_foto_section_gallery_images\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_galeri_foto_section_gallery_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`caption\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_galeri_foto_section_gallery_images_order_idx\` ON \`home_page_galeri_foto_section_gallery_images\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_galeri_foto_section_gallery_images_parent_id_idx\` ON \`home_page_galeri_foto_section_gallery_images\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_galeri_foto_section_gallery_images_image_idx\` ON \`home_page_galeri_foto_section_gallery_images\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`utama_section_title\` text DEFAULT 'Utama',
  	\`utama_section_featured_main_id\` integer,
  	\`utama_section_terkini_limit\` numeric DEFAULT 5,
  	\`utama_section_trending_limit\` numeric DEFAULT 5,
  	\`disyorkan_section_title\` text DEFAULT 'Disyorkan',
  	\`disyorkan_section_main_post_id\` integer,
  	\`rencana_section_title\` text DEFAULT 'Rencana',
  	\`sukan_section_title\` text DEFAULT 'Sukan',
  	\`dunia_section_title\` text DEFAULT 'Dunia',
  	\`bisnes_section_title\` text DEFAULT 'Bisnes',
  	\`hiburan_section_title\` text DEFAULT 'Hiburan',
  	\`gaya_hidup_section_title\` text DEFAULT 'Gaya Hidup',
  	\`gaya_hidup_section_featured_post_id\` integer,
  	\`bh_plus_section_title\` text DEFAULT 'BH Plus',
  	\`bh_plus_section_infografik_section_title\` text DEFAULT 'Infografik',
  	\`bh_plus_section_infografik_section_featured_image_id\` integer,
  	\`bh_plus_section_infografik_section_link_url\` text DEFAULT '/infografik',
  	\`bh_plus_section_galeri_foto_section_title\` text DEFAULT 'Galeri Foto',
  	\`infografik_section_title\` text DEFAULT 'Infografik',
  	\`infografik_section_featured_image_id\` integer,
  	\`infografik_section_link_url\` text DEFAULT '/infografik',
  	\`galeri_foto_section_title\` text DEFAULT 'Galeri Foto',
  	\`podcast_section_title\` text DEFAULT 'Podcast',
  	\`podcast_section_channel_logo_id\` integer,
  	\`bh_tv_section_title\` text DEFAULT 'BH TV',
  	\`bh_tv_section_channel_logo_id\` integer,
  	\`bh_tv_section_main_video_id\` integer,
  	\`video_terkini_section_title\` text DEFAULT 'Video Terkini',
  	\`video_terkini_section_channel_logo_id\` integer,
  	\`sihat_section_title\` text DEFAULT 'Sihat' NOT NULL,
  	\`sihat_section_more_text\` text DEFAULT 'Lagi Sihat',
  	\`sihat_section_more_link\` text DEFAULT '/sihat',
  	\`sihat_section_featured_post_id\` integer,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`utama_section_featured_main_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`disyorkan_section_main_post_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`gaya_hidup_section_featured_post_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`bh_plus_section_infografik_section_featured_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`infografik_section_featured_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`podcast_section_channel_logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`bh_tv_section_channel_logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`bh_tv_section_main_video_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`video_terkini_section_channel_logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`sihat_section_featured_post_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_utama_section_utama_section_featured_main_idx\` ON \`home_page\` (\`utama_section_featured_main_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_disyorkan_section_disyorkan_section_main_post_idx\` ON \`home_page\` (\`disyorkan_section_main_post_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_gaya_hidup_section_gaya_hidup_section_featured_idx\` ON \`home_page\` (\`gaya_hidup_section_featured_post_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_bh_plus_section_infografik_section_bh_plus_sec_idx\` ON \`home_page\` (\`bh_plus_section_infografik_section_featured_image_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_infografik_section_infografik_section_featured_idx\` ON \`home_page\` (\`infografik_section_featured_image_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_podcast_section_podcast_section_channel_logo_idx\` ON \`home_page\` (\`podcast_section_channel_logo_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_bh_tv_section_bh_tv_section_channel_logo_idx\` ON \`home_page\` (\`bh_tv_section_channel_logo_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_bh_tv_section_bh_tv_section_main_video_idx\` ON \`home_page\` (\`bh_tv_section_main_video_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_video_terkini_section_video_terkini_section_ch_idx\` ON \`home_page\` (\`video_terkini_section_channel_logo_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_sihat_section_sihat_section_featured_post_idx\` ON \`home_page\` (\`sihat_section_featured_post_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`posts_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_rels_order_idx\` ON \`home_page_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_rels_parent_idx\` ON \`home_page_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_rels_path_idx\` ON \`home_page_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`home_page_rels_posts_id_idx\` ON \`home_page_rels\` (\`posts_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`users_sessions\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`categories\`;`)
  await db.run(sql`DROP TABLE \`utama\`;`)
  await db.run(sql`DROP TABLE \`utama_rels\`;`)
  await db.run(sql`DROP TABLE \`sliders\`;`)
  await db.run(sql`DROP TABLE \`trending\`;`)
  await db.run(sql`DROP TABLE \`posts\`;`)
  await db.run(sql`DROP TABLE \`posts_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
  await db.run(sql`DROP TABLE \`home_page_bh_plus_section_galeri_foto_section_gallery_images\`;`)
  await db.run(sql`DROP TABLE \`home_page_galeri_foto_section_gallery_images\`;`)
  await db.run(sql`DROP TABLE \`home_page\`;`)
  await db.run(sql`DROP TABLE \`home_page_rels\`;`)
}
