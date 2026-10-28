import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_footer_social_links_platform" AS ENUM('facebook', 'twitter', 'whatsapp', 'youtube', 'tiktok', 'linkedin');
  CREATE TYPE "public"."enum_ads_config_bh_web_billboard_homepage_970x250_size_preset" AS ENUM('max-w-[970px] aspect-[970/90]', 'max-w-[300px] aspect-[300/250]', 'max-w-[320px] aspect-[320/50]', 'max-w-[320px] aspect-[320/100]', 'custom');
  CREATE TYPE "public"."enum_ads_config_bh_300x250_size_preset" AS ENUM('max-w-[970px] aspect-[970/90]', 'max-w-[300px] aspect-[300/250]', 'max-w-[320px] aspect-[320/50]', 'max-w-[320px] aspect-[320/100]', 'custom');
  CREATE TYPE "public"."enum_ads_config_bh_300x250_b_size_preset" AS ENUM('max-w-[970px] aspect-[970/90]', 'max-w-[300px] aspect-[300/250]', 'max-w-[320px] aspect-[320/50]', 'max-w-[320px] aspect-[320/100]', 'custom');
  CREATE TYPE "public"."enum_ads_config_bh_320x50_size_preset" AS ENUM('max-w-[970px] aspect-[970/90]', 'max-w-[300px] aspect-[300/250]', 'max-w-[320px] aspect-[320/50]', 'max-w-[320px] aspect-[320/100]', 'custom');
  CREATE TYPE "public"."enum_ads_config_bh_300x250_mobile_size_preset" AS ENUM('max-w-[970px] aspect-[970/90]', 'max-w-[300px] aspect-[300/250]', 'max-w-[320px] aspect-[320/50]', 'max-w-[320px] aspect-[320/100]', 'custom');
  CREATE TYPE "public"."enum_ads_config_bh_hp_sticky_leaderboard_size_preset" AS ENUM('max-w-[970px] aspect-[970/90]', 'max-w-[300px] aspect-[300/250]', 'max-w-[320px] aspect-[320/50]', 'max-w-[320px] aspect-[320/100]', 'custom');
  CREATE TYPE "public"."enum_ads_config_bh_mobile_banner_size_preset" AS ENUM('max-w-[970px] aspect-[970/90]', 'max-w-[300px] aspect-[300/250]', 'max-w-[320px] aspect-[320/50]', 'max-w-[320px] aspect-[320/100]', 'custom');
  CREATE TYPE "public"."enum_ads_config_bh_mobile_banner_b_size_preset" AS ENUM('max-w-[970px] aspect-[970/90]', 'max-w-[300px] aspect-[300/250]', 'max-w-[320px] aspect-[320/50]', 'max-w-[320px] aspect-[320/100]', 'custom');
  CREATE TYPE "public"."enum_ads_config_bh_multisize_houseads_size_preset" AS ENUM('max-w-[970px] aspect-[970/90]', 'max-w-[300px] aspect-[300/250]', 'max-w-[320px] aspect-[320/50]', 'max-w-[320px] aspect-[320/100]', 'custom');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_tablet_url" varchar,
  	"sizes_tablet_width" numeric,
  	"sizes_tablet_height" numeric,
  	"sizes_tablet_mime_type" varchar,
  	"sizes_tablet_filesize" numeric,
  	"sizes_tablet_filename" varchar
  );
  
  CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"parent_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar,
  	"post_id" numeric,
  	"excerpt" varchar,
  	"content" jsonb NOT NULL,
  	"featured_image_id" integer,
  	"category_id" integer NOT NULL,
  	"status" "enum_posts_status" DEFAULT 'draft' NOT NULL,
  	"published_at" timestamp(3) with time zone,
  	"is_featured" boolean DEFAULT false,
  	"is_trending" boolean DEFAULT false,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "posts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"categories_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "home_page_trending_in_top" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"keyword" varchar NOT NULL,
  	"order" numeric DEFAULT 0
  );
  
  CREATE TABLE "home_page_bh_plus_section_galeri_foto_section_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"caption" varchar
  );
  
  CREATE TABLE "home_page_galeri_foto_section_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"caption" varchar
  );
  
  CREATE TABLE "home_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"video_popup_widget_enable" boolean DEFAULT true,
  	"video_popup_widget_video_url" varchar,
  	"video_popup_widget_thumbnail_id" integer,
  	"utama_section_title" varchar DEFAULT 'Utama',
  	"utama_section_featured_main_id" integer,
  	"utama_section_terkini_limit" numeric DEFAULT 5,
  	"utama_section_trending_limit" numeric DEFAULT 5,
  	"disyorkan_section_title" varchar DEFAULT 'Disyorkan',
  	"disyorkan_section_main_post_id" integer,
  	"rencana_section_title" varchar DEFAULT 'Rencana',
  	"sukan_section_title" varchar DEFAULT 'Sukan',
  	"dunia_section_title" varchar DEFAULT 'Dunia',
  	"bisnes_section_title" varchar DEFAULT 'Bisnes',
  	"hiburan_section_title" varchar DEFAULT 'Hiburan',
  	"gaya_hidup_section_title" varchar DEFAULT 'Gaya Hidup',
  	"gaya_hidup_section_featured_post_id" integer,
  	"bh_plus_section_title" varchar DEFAULT 'BH Plus',
  	"bh_plus_section_infografik_section_title" varchar DEFAULT 'Infografik',
  	"bh_plus_section_infografik_section_featured_image_id" integer,
  	"bh_plus_section_infografik_section_link_url" varchar DEFAULT '/infografik',
  	"bh_plus_section_galeri_foto_section_title" varchar DEFAULT 'Galeri Foto',
  	"infografik_section_title" varchar DEFAULT 'Infografik',
  	"infografik_section_featured_image_id" integer,
  	"infografik_section_link_url" varchar DEFAULT '/infografik',
  	"galeri_foto_section_title" varchar DEFAULT 'Galeri Foto',
  	"podcast_section_title" varchar DEFAULT 'Podcast',
  	"podcast_section_channel_logo_id" integer,
  	"bh_tv_section_title" varchar DEFAULT 'BH TV',
  	"bh_tv_section_channel_logo_id" integer,
  	"bh_tv_section_main_video_id" integer,
  	"video_terkini_section_title" varchar DEFAULT 'Video Terkini',
  	"video_terkini_section_channel_logo_id" integer,
  	"sihat_section_title" varchar DEFAULT 'Sihat' NOT NULL,
  	"sihat_section_more_text" varchar DEFAULT 'Lagi Sihat',
  	"sihat_section_more_link" varchar DEFAULT '/sihat',
  	"sihat_section_featured_post_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_page_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer
  );
  
  CREATE TABLE "footer_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_footer_social_links_platform" NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "footer_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar
  );
  
  CREATE TABLE "footer_bottom_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer NOT NULL,
  	"app_store_links_app_store_url" varchar,
  	"app_store_links_google_play_url" varchar,
  	"copyright_text" varchar DEFAULT '2025 © BH, New Straits Times Press (M) Bhd. All rights reserved.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "ads_config" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"bh_web_billboard_homepage_970x250_active" boolean DEFAULT false,
  	"bh_web_billboard_homepage_970x250_image_url" varchar,
  	"bh_web_billboard_homepage_970x250_link" varchar,
  	"bh_web_billboard_homepage_970x250_code_html" varchar,
  	"bh_web_billboard_homepage_970x250_size_preset" "enum_ads_config_bh_web_billboard_homepage_970x250_size_preset" DEFAULT 'max-w-[970px] aspect-[970/90]',
  	"bh_web_billboard_homepage_970x250_custom_width" numeric,
  	"bh_web_billboard_homepage_970x250_custom_height" numeric,
  	"bh_300x250_active" boolean DEFAULT false,
  	"bh_300x250_image_url" varchar,
  	"bh_300x250_link" varchar,
  	"bh_300x250_code_html" varchar,
  	"bh_300x250_size_preset" "enum_ads_config_bh_300x250_size_preset" DEFAULT 'max-w-[300px] aspect-[300/250]',
  	"bh_300x250_custom_width" numeric,
  	"bh_300x250_custom_height" numeric,
  	"bh_300x250_b_active" boolean DEFAULT false,
  	"bh_300x250_b_image_url" varchar,
  	"bh_300x250_b_link" varchar,
  	"bh_300x250_b_code_html" varchar,
  	"bh_300x250_b_size_preset" "enum_ads_config_bh_300x250_b_size_preset" DEFAULT 'max-w-[300px] aspect-[300/250]',
  	"bh_300x250_b_custom_width" numeric,
  	"bh_300x250_b_custom_height" numeric,
  	"bh_320x50_active" boolean DEFAULT false,
  	"bh_320x50_image_url" varchar,
  	"bh_320x50_link" varchar,
  	"bh_320x50_code_html" varchar,
  	"bh_320x50_size_preset" "enum_ads_config_bh_320x50_size_preset" DEFAULT 'max-w-[320px] aspect-[320/50]',
  	"bh_320x50_custom_width" numeric,
  	"bh_320x50_custom_height" numeric,
  	"bh_300x250_mobile_active" boolean DEFAULT false,
  	"bh_300x250_mobile_image_url" varchar,
  	"bh_300x250_mobile_link" varchar,
  	"bh_300x250_mobile_code_html" varchar,
  	"bh_300x250_mobile_size_preset" "enum_ads_config_bh_300x250_mobile_size_preset" DEFAULT 'max-w-[320px] aspect-[320/50]',
  	"bh_300x250_mobile_custom_width" numeric,
  	"bh_300x250_mobile_custom_height" numeric,
  	"bh_hp_sticky_leaderboard_active" boolean DEFAULT false,
  	"bh_hp_sticky_leaderboard_image_url" varchar,
  	"bh_hp_sticky_leaderboard_link" varchar,
  	"bh_hp_sticky_leaderboard_code_html" varchar,
  	"bh_hp_sticky_leaderboard_size_preset" "enum_ads_config_bh_hp_sticky_leaderboard_size_preset" DEFAULT 'max-w-[320px] aspect-[320/50]',
  	"bh_hp_sticky_leaderboard_custom_width" numeric,
  	"bh_hp_sticky_leaderboard_custom_height" numeric,
  	"bh_mobile_banner_active" boolean DEFAULT false,
  	"bh_mobile_banner_image_url" varchar,
  	"bh_mobile_banner_link" varchar,
  	"bh_mobile_banner_code_html" varchar,
  	"bh_mobile_banner_size_preset" "enum_ads_config_bh_mobile_banner_size_preset" DEFAULT 'max-w-[320px] aspect-[320/100]',
  	"bh_mobile_banner_custom_width" numeric,
  	"bh_mobile_banner_custom_height" numeric,
  	"bh_mobile_banner_b_active" boolean DEFAULT false,
  	"bh_mobile_banner_b_image_url" varchar,
  	"bh_mobile_banner_b_link" varchar,
  	"bh_mobile_banner_b_code_html" varchar,
  	"bh_mobile_banner_b_size_preset" "enum_ads_config_bh_mobile_banner_b_size_preset" DEFAULT 'max-w-[320px] aspect-[320/100]',
  	"bh_mobile_banner_b_custom_width" numeric,
  	"bh_mobile_banner_b_custom_height" numeric,
  	"bh_multisize_houseads_active" boolean DEFAULT false,
  	"bh_multisize_houseads_image_url" varchar,
  	"bh_multisize_houseads_link" varchar,
  	"bh_multisize_houseads_code_html" varchar,
  	"bh_multisize_houseads_size_preset" "enum_ads_config_bh_multisize_houseads_size_preset" DEFAULT 'max-w-[970px] aspect-[970/90]',
  	"bh_multisize_houseads_custom_width" numeric,
  	"bh_multisize_houseads_custom_height" numeric,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"title_image_id" integer,
  	"fallback_html" varchar DEFAULT '<a href="/" class="flex items-center gap-3 group">
          <div class="w-12 h-12 bg-gray-100 dark:bg-gray-800 border border-dashed border-gray-400 dark:border-gray-600 rounded flex flex-col items-center justify-center text-gray-400 group-hover:border-red-600 transition-colors">
            <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
            <span class="text-[9px] font-mono leading-none mt-1">LOGO</span>
          </div>
  
          <div class="flex flex-col">
            <div class="flex items-center gap-2">
              <span class="font-sans font-black text-xl md:text-2xl uppercase tracking-tight text-[#D81B50]">
                MEDIA RUJUKAN MASSA
              </span>
            </div>
            <p class="text-xs font-bold text-gray-600 mt-0.5">
              Portal berita dan akhbar No. 1 di Malaysia
            </p>
          </div>
        </a>',
  	"social_links_facebook" varchar,
  	"social_links_twitter" varchar,
  	"social_links_instagram" varchar,
  	"social_links_youtube" varchar,
  	"social_links_linkedin" varchar,
  	"social_links_tiktok" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "header_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories" ADD CONSTRAINT "categories_parent_id_categories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_trending_in_top" ADD CONSTRAINT "home_page_trending_in_top_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_bh_plus_section_galeri_foto_section_gallery_images" ADD CONSTRAINT "home_page_bh_plus_section_galeri_foto_section_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_bh_plus_section_galeri_foto_section_gallery_images" ADD CONSTRAINT "home_page_bh_plus_section_galeri_foto_section_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_galeri_foto_section_gallery_images" ADD CONSTRAINT "home_page_galeri_foto_section_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_galeri_foto_section_gallery_images" ADD CONSTRAINT "home_page_galeri_foto_section_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_video_popup_widget_thumbnail_id_media_id_fk" FOREIGN KEY ("video_popup_widget_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_utama_section_featured_main_id_posts_id_fk" FOREIGN KEY ("utama_section_featured_main_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_disyorkan_section_main_post_id_posts_id_fk" FOREIGN KEY ("disyorkan_section_main_post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_gaya_hidup_section_featured_post_id_posts_id_fk" FOREIGN KEY ("gaya_hidup_section_featured_post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_bh_plus_section_infografik_section_featured_image_id_media_id_fk" FOREIGN KEY ("bh_plus_section_infografik_section_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_infografik_section_featured_image_id_media_id_fk" FOREIGN KEY ("infografik_section_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_podcast_section_channel_logo_id_media_id_fk" FOREIGN KEY ("podcast_section_channel_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_bh_tv_section_channel_logo_id_media_id_fk" FOREIGN KEY ("bh_tv_section_channel_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_bh_tv_section_main_video_id_posts_id_fk" FOREIGN KEY ("bh_tv_section_main_video_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_video_terkini_section_channel_logo_id_media_id_fk" FOREIGN KEY ("video_terkini_section_channel_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_sihat_section_featured_post_id_posts_id_fk" FOREIGN KEY ("sihat_section_featured_post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_social_links" ADD CONSTRAINT "footer_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns_links" ADD CONSTRAINT "footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns" ADD CONSTRAINT "footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_bottom_links" ADD CONSTRAINT "footer_bottom_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer" ADD CONSTRAINT "footer_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header" ADD CONSTRAINT "header_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header" ADD CONSTRAINT "header_title_image_id_media_id_fk" FOREIGN KEY ("title_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_tablet_sizes_tablet_filename_idx" ON "media" USING btree ("sizes_tablet_filename");
  CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX "categories_parent_idx" ON "categories" USING btree ("parent_id");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE UNIQUE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE UNIQUE INDEX "posts_post_id_idx" ON "posts" USING btree ("post_id");
  CREATE INDEX "posts_featured_image_idx" ON "posts" USING btree ("featured_image_id");
  CREATE INDEX "posts_category_idx" ON "posts" USING btree ("category_id");
  CREATE INDEX "posts_status_idx" ON "posts" USING btree ("status");
  CREATE INDEX "posts_published_at_idx" ON "posts" USING btree ("published_at");
  CREATE INDEX "posts_seo_seo_image_idx" ON "posts" USING btree ("seo_image_id");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX "posts_rels_order_idx" ON "posts_rels" USING btree ("order");
  CREATE INDEX "posts_rels_parent_idx" ON "posts_rels" USING btree ("parent_id");
  CREATE INDEX "posts_rels_path_idx" ON "posts_rels" USING btree ("path");
  CREATE INDEX "posts_rels_posts_id_idx" ON "posts_rels" USING btree ("posts_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "home_page_trending_in_top_order_idx" ON "home_page_trending_in_top" USING btree ("_order");
  CREATE INDEX "home_page_trending_in_top_parent_id_idx" ON "home_page_trending_in_top" USING btree ("_parent_id");
  CREATE INDEX "home_page_bh_plus_section_galeri_foto_section_gallery_images_order_idx" ON "home_page_bh_plus_section_galeri_foto_section_gallery_images" USING btree ("_order");
  CREATE INDEX "home_page_bh_plus_section_galeri_foto_section_gallery_images_parent_id_idx" ON "home_page_bh_plus_section_galeri_foto_section_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "home_page_bh_plus_section_galeri_foto_section_gallery_im_idx" ON "home_page_bh_plus_section_galeri_foto_section_gallery_images" USING btree ("image_id");
  CREATE INDEX "home_page_galeri_foto_section_gallery_images_order_idx" ON "home_page_galeri_foto_section_gallery_images" USING btree ("_order");
  CREATE INDEX "home_page_galeri_foto_section_gallery_images_parent_id_idx" ON "home_page_galeri_foto_section_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "home_page_galeri_foto_section_gallery_images_image_idx" ON "home_page_galeri_foto_section_gallery_images" USING btree ("image_id");
  CREATE INDEX "home_page_video_popup_widget_video_popup_widget_thumbnai_idx" ON "home_page" USING btree ("video_popup_widget_thumbnail_id");
  CREATE INDEX "home_page_utama_section_utama_section_featured_main_idx" ON "home_page" USING btree ("utama_section_featured_main_id");
  CREATE INDEX "home_page_disyorkan_section_disyorkan_section_main_post_idx" ON "home_page" USING btree ("disyorkan_section_main_post_id");
  CREATE INDEX "home_page_gaya_hidup_section_gaya_hidup_section_featured_idx" ON "home_page" USING btree ("gaya_hidup_section_featured_post_id");
  CREATE INDEX "home_page_bh_plus_section_infografik_section_bh_plus_sec_idx" ON "home_page" USING btree ("bh_plus_section_infografik_section_featured_image_id");
  CREATE INDEX "home_page_infografik_section_infografik_section_featured_idx" ON "home_page" USING btree ("infografik_section_featured_image_id");
  CREATE INDEX "home_page_podcast_section_podcast_section_channel_logo_idx" ON "home_page" USING btree ("podcast_section_channel_logo_id");
  CREATE INDEX "home_page_bh_tv_section_bh_tv_section_channel_logo_idx" ON "home_page" USING btree ("bh_tv_section_channel_logo_id");
  CREATE INDEX "home_page_bh_tv_section_bh_tv_section_main_video_idx" ON "home_page" USING btree ("bh_tv_section_main_video_id");
  CREATE INDEX "home_page_video_terkini_section_video_terkini_section_ch_idx" ON "home_page" USING btree ("video_terkini_section_channel_logo_id");
  CREATE INDEX "home_page_sihat_section_sihat_section_featured_post_idx" ON "home_page" USING btree ("sihat_section_featured_post_id");
  CREATE INDEX "home_page_rels_order_idx" ON "home_page_rels" USING btree ("order");
  CREATE INDEX "home_page_rels_parent_idx" ON "home_page_rels" USING btree ("parent_id");
  CREATE INDEX "home_page_rels_path_idx" ON "home_page_rels" USING btree ("path");
  CREATE INDEX "home_page_rels_posts_id_idx" ON "home_page_rels" USING btree ("posts_id");
  CREATE INDEX "footer_social_links_order_idx" ON "footer_social_links" USING btree ("_order");
  CREATE INDEX "footer_social_links_parent_id_idx" ON "footer_social_links" USING btree ("_parent_id");
  CREATE INDEX "footer_columns_links_order_idx" ON "footer_columns_links" USING btree ("_order");
  CREATE INDEX "footer_columns_links_parent_id_idx" ON "footer_columns_links" USING btree ("_parent_id");
  CREATE INDEX "footer_columns_order_idx" ON "footer_columns" USING btree ("_order");
  CREATE INDEX "footer_columns_parent_id_idx" ON "footer_columns" USING btree ("_parent_id");
  CREATE INDEX "footer_bottom_links_order_idx" ON "footer_bottom_links" USING btree ("_order");
  CREATE INDEX "footer_bottom_links_parent_id_idx" ON "footer_bottom_links" USING btree ("_parent_id");
  CREATE INDEX "footer_logo_idx" ON "footer" USING btree ("logo_id");
  CREATE INDEX "header_logo_idx" ON "header" USING btree ("logo_id");
  CREATE INDEX "header_title_image_idx" ON "header" USING btree ("title_image_id");
  CREATE INDEX "header_rels_order_idx" ON "header_rels" USING btree ("order");
  CREATE INDEX "header_rels_parent_idx" ON "header_rels" USING btree ("parent_id");
  CREATE INDEX "header_rels_path_idx" ON "header_rels" USING btree ("path");
  CREATE INDEX "header_rels_posts_id_idx" ON "header_rels" USING btree ("posts_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "posts_rels" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "home_page_trending_in_top" CASCADE;
  DROP TABLE "home_page_bh_plus_section_galeri_foto_section_gallery_images" CASCADE;
  DROP TABLE "home_page_galeri_foto_section_gallery_images" CASCADE;
  DROP TABLE "home_page" CASCADE;
  DROP TABLE "home_page_rels" CASCADE;
  DROP TABLE "footer_social_links" CASCADE;
  DROP TABLE "footer_columns_links" CASCADE;
  DROP TABLE "footer_columns" CASCADE;
  DROP TABLE "footer_bottom_links" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "ads_config" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "header_rels" CASCADE;
  DROP TYPE "public"."enum_posts_status";
  DROP TYPE "public"."enum_footer_social_links_platform";
  DROP TYPE "public"."enum_ads_config_bh_web_billboard_homepage_970x250_size_preset";
  DROP TYPE "public"."enum_ads_config_bh_300x250_size_preset";
  DROP TYPE "public"."enum_ads_config_bh_300x250_b_size_preset";
  DROP TYPE "public"."enum_ads_config_bh_320x50_size_preset";
  DROP TYPE "public"."enum_ads_config_bh_300x250_mobile_size_preset";
  DROP TYPE "public"."enum_ads_config_bh_hp_sticky_leaderboard_size_preset";
  DROP TYPE "public"."enum_ads_config_bh_mobile_banner_size_preset";
  DROP TYPE "public"."enum_ads_config_bh_mobile_banner_b_size_preset";
  DROP TYPE "public"."enum_ads_config_bh_multisize_houseads_size_preset";`)
}
