import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { ContactSection } from "@/components/sections/contact";
import { GallerySection } from "@/components/sections/gallery";
import { HeroSection } from "@/components/sections/hero";
import { ServicesSection } from "@/components/sections/services";
import { TeamSection } from "@/components/sections/team";
import { TestimonialsSection } from "@/components/sections/testimonials";

async function getPublicContent() {
  const url = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1"}/public/content`;

  try {
    const response = await fetch(url, { cache: "no-store" });
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
