import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`home_page\` ADD \`video_popup_widget_enable\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`home_page\` ADD \`video_popup_widget_video_url\` text;`)
  await db.run(sql`ALTER TABLE \`home_page\` ADD \`video_popup_widget_thumbnail_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`home_page_video_popup_widget_video_popup_widget_thumbnai_idx\` ON \`home_page\` (\`video_popup_widget_thumbnail_id\`);`)
  await db.run(sql`ALTER TABLE \`header\` ADD \`logo_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`header\` ADD \`title_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`header\` ADD \`fallback_html\` text DEFAULT '<a href="/" class="flex items-center gap-3 group">
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
        </a>';`)
  await db.run(sql`ALTER TABLE \`header\` ADD \`social_links_facebook\` text;`)
  await db.run(sql`ALTER TABLE \`header\` ADD \`social_links_twitter\` text;`)
  await db.run(sql`ALTER TABLE \`header\` ADD \`social_links_instagram\` text;`)
  await db.run(sql`ALTER TABLE \`header\` ADD \`social_links_youtube\` text;`)
  await db.run(sql`ALTER TABLE \`header\` ADD \`social_links_linkedin\` text;`)
  await db.run(sql`ALTER TABLE \`header\` ADD \`social_links_tiktok\` text;`)
  await db.run(sql`CREATE INDEX \`header_logo_idx\` ON \`header\` (\`logo_id\`);`)
  await db.run(sql`CREATE INDEX \`header_title_image_idx\` ON \`header\` (\`title_image_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_home_page\` (
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
  await db.run(sql`INSERT INTO \`__new_home_page\`("id", "utama_section_title", "utama_section_featured_main_id", "utama_section_terkini_limit", "utama_section_trending_limit", "disyorkan_section_title", "disyorkan_section_main_post_id", "rencana_section_title", "sukan_section_title", "dunia_section_title", "bisnes_section_title", "hiburan_section_title", "gaya_hidup_section_title", "gaya_hidup_section_featured_post_id", "bh_plus_section_title", "bh_plus_section_infografik_section_title", "bh_plus_section_infografik_section_featured_image_id", "bh_plus_section_infografik_section_link_url", "bh_plus_section_galeri_foto_section_title", "infografik_section_title", "infografik_section_featured_image_id", "infografik_section_link_url", "galeri_foto_section_title", "podcast_section_title", "podcast_section_channel_logo_id", "bh_tv_section_title", "bh_tv_section_channel_logo_id", "bh_tv_section_main_video_id", "video_terkini_section_title", "video_terkini_section_channel_logo_id", "sihat_section_title", "sihat_section_more_text", "sihat_section_more_link", "sihat_section_featured_post_id", "updated_at", "created_at") SELECT "id", "utama_section_title", "utama_section_featured_main_id", "utama_section_terkini_limit", "utama_section_trending_limit", "disyorkan_section_title", "disyorkan_section_main_post_id", "rencana_section_title", "sukan_section_title", "dunia_section_title", "bisnes_section_title", "hiburan_section_title", "gaya_hidup_section_title", "gaya_hidup_section_featured_post_id", "bh_plus_section_title", "bh_plus_section_infografik_section_title", "bh_plus_section_infografik_section_featured_image_id", "bh_plus_section_infografik_section_link_url", "bh_plus_section_galeri_foto_section_title", "infografik_section_title", "infografik_section_featured_image_id", "infografik_section_link_url", "galeri_foto_section_title", "podcast_section_title", "podcast_section_channel_logo_id", "bh_tv_section_title", "bh_tv_section_channel_logo_id", "bh_tv_section_main_video_id", "video_terkini_section_title", "video_terkini_section_channel_logo_id", "sihat_section_title", "sihat_section_more_text", "sihat_section_more_link", "sihat_section_featured_post_id", "updated_at", "created_at" FROM \`home_page\`;`)
  await db.run(sql`DROP TABLE \`home_page\`;`)
  await db.run(sql`ALTER TABLE \`__new_home_page\` RENAME TO \`home_page\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
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
  await db.run(sql`CREATE TABLE \`__new_header\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`INSERT INTO \`__new_header\`("id", "updated_at", "created_at") SELECT "id", "updated_at", "created_at" FROM \`header\`;`)
  await db.run(sql`DROP TABLE \`header\`;`)
  await db.run(sql`ALTER TABLE \`__new_header\` RENAME TO \`header\`;`)
}
