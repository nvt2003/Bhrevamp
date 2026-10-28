import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx";
  DROP INDEX "media_sizes_card_sizes_card_filename_idx";
  DROP INDEX "media_sizes_tablet_sizes_tablet_filename_idx";
  ALTER TABLE "home_page" ALTER COLUMN "utama_section_title" SET DEFAULT 'Chính';
  ALTER TABLE "home_page" ALTER COLUMN "disyorkan_section_title" SET DEFAULT 'Đề xuất';
  ALTER TABLE "home_page" ALTER COLUMN "rencana_section_title" SET DEFAULT 'Chuyên mục';
  ALTER TABLE "home_page" ALTER COLUMN "sukan_section_title" SET DEFAULT 'Thể thao';
  ALTER TABLE "home_page" ALTER COLUMN "dunia_section_title" SET DEFAULT 'Thế giới';
  ALTER TABLE "home_page" ALTER COLUMN "bisnes_section_title" SET DEFAULT 'Kinh tế';
  ALTER TABLE "home_page" ALTER COLUMN "hiburan_section_title" SET DEFAULT 'Giải trí';
  ALTER TABLE "home_page" ALTER COLUMN "gaya_hidup_section_title" SET DEFAULT 'Phong cách sống';
  ALTER TABLE "home_page" ALTER COLUMN "bh_plus_section_title" SET DEFAULT 'Độc quyền';
  ALTER TABLE "home_page" ALTER COLUMN "bh_plus_section_infografik_section_title" SET DEFAULT 'Đồ hoạ thông tin (Infografik)';
  ALTER TABLE "home_page" ALTER COLUMN "bh_plus_section_galeri_foto_section_title" SET DEFAULT 'Bộ sưu tập ảnh';
  ALTER TABLE "home_page" ALTER COLUMN "infografik_section_title" SET DEFAULT 'Đồ hoạ thông tin (Infografik)';
  ALTER TABLE "home_page" ALTER COLUMN "galeri_foto_section_title" SET DEFAULT 'Bộ sưu tập ảnh';
  ALTER TABLE "home_page" ALTER COLUMN "video_terkini_section_title" SET DEFAULT 'Video mới nhất';
  ALTER TABLE "home_page" ALTER COLUMN "sihat_section_title" SET DEFAULT 'Sức khoẻ';
  ALTER TABLE "home_page" ALTER COLUMN "sihat_section_more_text" SET DEFAULT 'Xem thêm mục sức khoẻ';
  ALTER TABLE "home_page" ALTER COLUMN "sihat_section_more_link" SET DEFAULT '/suc-khoe';
  ALTER TABLE "footer" ALTER COLUMN "copyright_text" SET DEFAULT '2025 ©, New Straits Times Press (M) Bhd. All rights reserved.';
  ALTER TABLE "header" ALTER COLUMN "fallback_html" SET DEFAULT '<div style="display: flex; align-items: center; justify-content: center; height: 100%; width: 100%;">
                        <h1 style="font-size: 24px; color: #333;">Header</h1>
                      </div>';
  ALTER TABLE "users" ADD COLUMN "reset_password_requested_at" timestamp(3) with time zone;
  ALTER TABLE "media" ADD COLUMN "cloudinary_public_id" varchar;
  ALTER TABLE "media" ADD COLUMN "_objectkey" varchar;
  ALTER TABLE "media" DROP COLUMN "sizes_thumbnail_url";
  ALTER TABLE "media" DROP COLUMN "sizes_thumbnail_width";
  ALTER TABLE "media" DROP COLUMN "sizes_thumbnail_height";
  ALTER TABLE "media" DROP COLUMN "sizes_thumbnail_mime_type";
  ALTER TABLE "media" DROP COLUMN "sizes_thumbnail_filesize";
  ALTER TABLE "media" DROP COLUMN "sizes_thumbnail_filename";
  ALTER TABLE "media" DROP COLUMN "sizes_card_url";
  ALTER TABLE "media" DROP COLUMN "sizes_card_width";
  ALTER TABLE "media" DROP COLUMN "sizes_card_height";
  ALTER TABLE "media" DROP COLUMN "sizes_card_mime_type";
  ALTER TABLE "media" DROP COLUMN "sizes_card_filesize";
  ALTER TABLE "media" DROP COLUMN "sizes_card_filename";
  ALTER TABLE "media" DROP COLUMN "sizes_tablet_url";
  ALTER TABLE "media" DROP COLUMN "sizes_tablet_width";
  ALTER TABLE "media" DROP COLUMN "sizes_tablet_height";
  ALTER TABLE "media" DROP COLUMN "sizes_tablet_mime_type";
  ALTER TABLE "media" DROP COLUMN "sizes_tablet_filesize";
  ALTER TABLE "media" DROP COLUMN "sizes_tablet_filename";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "home_page" ALTER COLUMN "utama_section_title" SET DEFAULT 'Utama';
  ALTER TABLE "home_page" ALTER COLUMN "disyorkan_section_title" SET DEFAULT 'Disyorkan';
  ALTER TABLE "home_page" ALTER COLUMN "rencana_section_title" SET DEFAULT 'Rencana';
  ALTER TABLE "home_page" ALTER COLUMN "sukan_section_title" SET DEFAULT 'Sukan';
  ALTER TABLE "home_page" ALTER COLUMN "dunia_section_title" SET DEFAULT 'Dunia';
  ALTER TABLE "home_page" ALTER COLUMN "bisnes_section_title" SET DEFAULT 'Bisnes';
  ALTER TABLE "home_page" ALTER COLUMN "hiburan_section_title" SET DEFAULT 'Hiburan';
  ALTER TABLE "home_page" ALTER COLUMN "gaya_hidup_section_title" SET DEFAULT 'Gaya Hidup';
  ALTER TABLE "home_page" ALTER COLUMN "bh_plus_section_title" SET DEFAULT 'BH Plus';
  ALTER TABLE "home_page" ALTER COLUMN "bh_plus_section_infografik_section_title" SET DEFAULT 'Infografik';
  ALTER TABLE "home_page" ALTER COLUMN "bh_plus_section_galeri_foto_section_title" SET DEFAULT 'Galeri Foto';
  ALTER TABLE "home_page" ALTER COLUMN "infografik_section_title" SET DEFAULT 'Infografik';
  ALTER TABLE "home_page" ALTER COLUMN "galeri_foto_section_title" SET DEFAULT 'Galeri Foto';
  ALTER TABLE "home_page" ALTER COLUMN "video_terkini_section_title" SET DEFAULT 'Video Terkini';
  ALTER TABLE "home_page" ALTER COLUMN "sihat_section_title" SET DEFAULT 'Sihat';
  ALTER TABLE "home_page" ALTER COLUMN "sihat_section_more_text" SET DEFAULT 'Lagi Sihat';
  ALTER TABLE "home_page" ALTER COLUMN "sihat_section_more_link" SET DEFAULT '/sihat';
  ALTER TABLE "footer" ALTER COLUMN "copyright_text" SET DEFAULT '2025 © BH, New Straits Times Press (M) Bhd. All rights reserved.';
  ALTER TABLE "header" ALTER COLUMN "fallback_html" SET DEFAULT '<a href="/" class="flex items-center gap-3 group">
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
        </a>';
  ALTER TABLE "media" ADD COLUMN "sizes_thumbnail_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_thumbnail_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_thumbnail_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_thumbnail_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_thumbnail_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_thumbnail_filename" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_card_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_card_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_card_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_card_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_card_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_card_filename" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_tablet_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_tablet_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_tablet_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_tablet_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_tablet_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_tablet_filename" varchar;
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_tablet_sizes_tablet_filename_idx" ON "media" USING btree ("sizes_tablet_filename");
  ALTER TABLE "users" DROP COLUMN "reset_password_requested_at";
  ALTER TABLE "media" DROP COLUMN "cloudinary_public_id";
  ALTER TABLE "media" DROP COLUMN "_objectkey";`)
}
