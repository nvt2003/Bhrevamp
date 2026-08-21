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
  	\`focal_y\` numeric,
  	\`sizes_thumbnail_url\` text,
  	\`sizes_thumbnail_width\` numeric,
  	\`sizes_thumbnail_height\` numeric,
  	\`sizes_thumbnail_mime_type\` text,
  	\`sizes_thumbnail_filesize\` numeric,
  	\`sizes_thumbnail_filename\` text,
  	\`sizes_card_url\` text,
  	\`sizes_card_width\` numeric,
  	\`sizes_card_height\` numeric,
  	\`sizes_card_mime_type\` text,
  	\`sizes_card_filesize\` numeric,
  	\`sizes_card_filename\` text,
  	\`sizes_tablet_url\` text,
  	\`sizes_tablet_width\` numeric,
  	\`sizes_tablet_height\` numeric,
  	\`sizes_tablet_mime_type\` text,
  	\`sizes_tablet_filesize\` numeric,
  	\`sizes_tablet_filename\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_thumbnail_sizes_thumbnail_filename_idx\` ON \`media\` (\`sizes_thumbnail_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_card_sizes_card_filename_idx\` ON \`media\` (\`sizes_card_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_tablet_sizes_tablet_filename_idx\` ON \`media\` (\`sizes_tablet_filename\`);`)
  await db.run(sql`CREATE TABLE \`categories\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`parent_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`categories_slug_idx\` ON \`categories\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`categories_parent_idx\` ON \`categories\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`categories_updated_at_idx\` ON \`categories\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`categories_created_at_idx\` ON \`categories\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`posts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text,
  	\`post_id\` numeric,
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
  await db.run(sql`CREATE UNIQUE INDEX \`posts_post_id_idx\` ON \`posts\` (\`post_id\`);`)
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
  	\`posts_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_categories_id_idx\` ON \`payload_locked_documents_rels\` (\`categories_id\`);`)
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
  	\`bh_web_billboard_homepage_970x250_active\` integer DEFAULT false,
  	\`bh_web_billboard_homepage_970x250_image_url\` text,
  	\`bh_web_billboard_homepage_970x250_link\` text,
  	\`bh_web_billboard_homepage_970x250_code\` text,
  	\`bh_web_billboard_homepage_970x250_size_preset\` text DEFAULT 'max-w-[970px] aspect-[970/90]',
  	\`bh_web_billboard_homepage_970x250_custom_width\` numeric,
  	\`bh_web_billboard_homepage_970x250_custom_height\` numeric,
  	\`bh_300x250_active\` integer DEFAULT false,
  	\`bh_300x250_image_url\` text,
  	\`bh_300x250_link\` text,
  	\`bh_300x250_code\` text,
  	\`bh_300x250_size_preset\` text DEFAULT 'max-w-[300px] aspect-[300/250]',
  	\`bh_300x250_custom_width\` numeric,
  	\`bh_300x250_custom_height\` numeric,
  	\`bh_300x250_b_active\` integer DEFAULT false,
  	\`bh_300x250_b_image_url\` text,
  	\`bh_300x250_b_link\` text,
  	\`bh_300x250_b_code\` text,
  	\`bh_300x250_b_size_preset\` text DEFAULT 'max-w-[300px] aspect-[300/250]',
  	\`bh_300x250_b_custom_width\` numeric,
  	\`bh_300x250_b_custom_height\` numeric,
  	\`bh_320x50_active\` integer DEFAULT false,
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
  	\`bh_hp_sticky_leaderboard_size_preset\` text DEFAULT 'max-w-[320px] aspect-[320/50]',
  	\`bh_hp_sticky_leaderboard_custom_width\` numeric,
  	\`bh_hp_sticky_leaderboard_custom_height\` numeric,
  	\`bh_mobile_banner_active\` integer DEFAULT false,
  	\`bh_mobile_banner_image_url\` text,
  	\`bh_mobile_banner_link\` text,
  	\`bh_mobile_banner_code\` text,
  	\`bh_mobile_banner_size_preset\` text DEFAULT 'max-w-[320px] aspect-[320/100]',
  	\`bh_mobile_banner_custom_width\` numeric,
  	\`bh_mobile_banner_custom_height\` numeric,
  	\`bh_mobile_banner_b_active\` integer DEFAULT false,
  	\`bh_mobile_banner_b_image_url\` text,
  	\`bh_mobile_banner_b_link\` text,
  	\`bh_mobile_banner_b_code\` text,
  	\`bh_mobile_banner_b_size_preset\` text DEFAULT 'max-w-[320px] aspect-[320/100]',
  	\`bh_mobile_banner_b_custom_width\` numeric,
  	\`bh_mobile_banner_b_custom_height\` numeric,
  	\`bh_multisize_houseads_active\` integer DEFAULT false,
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
  await db.run(sql`CREATE TABLE \`header\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`header_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`posts_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`header\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`header_rels_order_idx\` ON \`header_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`header_rels_parent_idx\` ON \`header_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`header_rels_path_idx\` ON \`header_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`header_rels_posts_id_idx\` ON \`header_rels\` (\`posts_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`users_sessions\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`categories\`;`)
  await db.run(sql`DROP TABLE \`posts\`;`)
  await db.run(sql`DROP TABLE \`posts_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
  await db.run(sql`DROP TABLE \`home_page_trending_in_top\`;`)
  await db.run(sql`DROP TABLE \`home_page_bh_plus_section_galeri_foto_section_gallery_images\`;`)
  await db.run(sql`DROP TABLE \`home_page_galeri_foto_section_gallery_images\`;`)
  await db.run(sql`DROP TABLE \`home_page\`;`)
  await db.run(sql`DROP TABLE \`home_page_rels\`;`)
  await db.run(sql`DROP TABLE \`footer_social_links\`;`)
  await db.run(sql`DROP TABLE \`footer_columns_links\`;`)
  await db.run(sql`DROP TABLE \`footer_columns\`;`)
  await db.run(sql`DROP TABLE \`footer_bottom_links\`;`)
  await db.run(sql`DROP TABLE \`footer\`;`)
  await db.run(sql`DROP TABLE \`ads_config\`;`)
  await db.run(sql`DROP TABLE \`header\`;`)
  await db.run(sql`DROP TABLE \`header_rels\`;`)
}
