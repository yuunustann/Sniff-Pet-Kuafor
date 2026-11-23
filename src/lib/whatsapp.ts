import { siteConfig } from "@/config/siteConfig";

/** Verilen mesajla WhatsApp sohbet linki oluşturur (wa.me). */
export function whatsappLink(message: string = siteConfig.contact.whatsappDefaultMessage): string {
  return `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** Belirli bir hizmet için fiyat sorma mesajı */
export function serviceInquiryLink(serviceTitle: string): string {
  return whatsappLink(
    `Merhaba Sniff Pet Kuaför 🐾\n"${serviceTitle}" hizmetiniz hakkında fiyat ve uygun randevu saatlerini öğrenmek istiyorum.`,
  );
}

export function mapsEmbedUrl(): string {
  const { mapsEmbedUrl, mapsQuery } = siteConfig.address;
  return mapsEmbedUrl || `https://www.google.com/maps?q=${encodeURIComponent(mapsQuery)}&output=embed`;
}

export function mapsDirectionsUrl(): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(siteConfig.address.mapsQuery)}`;
}
