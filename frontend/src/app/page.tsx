import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { ContactSection } from "@/components/sections/contact";
import { GallerySection } from "@/components/sections/gallery";
import { HeroSection } from "@/components/sections/hero";
import { ServicesSection } from "@/components/sections/services";
import { TeamSection } from "@/components/sections/team";
import { TestimonialsSection } from "@/components/sections/testimonials";

async function getPublicContent() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    return {
      services: [],
      barbers: [],
      testimonials: [],
      gallery: [],
      promotions: [],
    };
  }

  const url = `${baseUrl}/public/content`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4000);

  try {
    const response = await fetch(url, {
      cache: "no-store",
      signal: controller.signal,
    });
    if (!response.ok) {
      throw new Error("Failed to fetch content");
    }
    return response.json();
  } catch {
    return {
      services: [],
      barbers: [],
      testimonials: [],
      gallery: [],
      promotions: [],
    };
  } finally {
    clearTimeout(timeout);
  }
}

export default async function HomePage() {
  const data = await getPublicContent();

  return (
    <div>
      <Navbar />
      <HeroSection />
      <ServicesSection services={data.services} />
      <TeamSection barbers={data.barbers} />
      <GallerySection gallery={data.gallery} />
      <TestimonialsSection testimonials={data.testimonials} />
      <ContactSection />
      <Footer />
    </div>
  );
}
