import Image from "next/image";
import SpectacleHero from "@/components/SpectacleHero";
import ParallaxImage from "@/components/ParallaxImage";
import BrandsSection from "@/components/BrandsSection";
import VisitUsCTA from "@/components/VisitUsCTA";

function Navbar() {
  return (
    <nav className="relative z-[60] flex items-center justify-between px-6 md:px-10 py-5 bg-white">
      <div className="flex items-center gap-2">
        <Image src="/logo.jpg" alt="Vision 21" width={32} height={32} className="rounded-full" />
        <span className="text-black text-lg font-semibold tracking-wide">
          Vision 21
        </span>
      </div>
      <div className="flex gap-6 text-black/50 text-sm">
        <a href="#" className="hover:text-black transition-colors">
          Shop
        </a>
        <a href="#" className="hover:text-black transition-colors">
          About
        </a>
        <a href="tel:012-7335888" className="hover:text-black transition-colors">
          Contact
        </a>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="bg-white">
      <div className="flex flex-col md:flex-row">
        {/* Image — left half with parallax */}
        <ParallaxImage
          src="/hero.jpg"
          alt="Spectacles on display"
          className="relative w-full md:w-1/2 h-[40vh] md:h-[70vh]"
        />

        {/* Text — right half */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 py-10 md:py-12">
          <h2 className="text-black text-2xl md:text-3xl font-bold leading-snug mb-6">
            Eyeglasses.
            <br />
            Sunglasses.
            <br />
            Contact Lenses.
            <br />
            Korean-style Frames.
          </h2>

          <p className="text-black/60 text-base leading-relaxed">
            Precision lenses fitted to your exact prescription.
            Walk in for a professional eye test.
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 mt-8">
            <a
              href="tel:012-7335888"
              className="inline-flex items-center gap-2 border border-black text-black bg-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-black hover:text-white transition-colors"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Call Us
            </a>
            <a
              href="https://wa.me/60127335888"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-black text-black bg-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-black hover:text-white transition-colors"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
              WhatsApp Us
            </a>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Kampung+Tengah+Jalan+Kekwa+Segamat+Johor+Malaysia"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-black text-black bg-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-black hover:text-white transition-colors"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Get Directions
            </a>
          </div>

          {/* Address */}
          <div className="mt-10 pt-8 border-t border-black text-sm text-black/40 space-y-1">
            <p className="font-medium text-black/60 text-base">Visit us</p>
            <p>Vision 21 Optical</p>
            <p>Kampung Tengah, Jalan Kekwa,</p>
            <p>Segamat, Johor, Malaysia</p>
            <p>012-733 5888</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function StoreLocator() {
  return (
    <section className="bg-white py-20 md:py-28 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="border-t border-black mb-16" />
        <h2 className="text-black text-xs uppercase tracking-[0.25em] mb-6 text-center">
          Store Locator
        </h2>
        <p className="text-black/50 text-sm text-center mb-10">
          Kampung Tengah, Jalan Kekwa, Segamat, Johor, Malaysia
        </p>
        <div className="w-full aspect-[16/9] md:aspect-[21/9]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.0!2d102.815!3d2.514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zKampung+Tengah+Jalan+Kekwa+Segamat+Johor!5e0!3m2!1sen!2smy!4v1"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Vision 21 Optical Location"
          />
        </div>
        <div className="flex justify-center mt-8">
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=Kampung+Tengah+Jalan+Kekwa+Segamat+Johor+Malaysia"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-black text-black bg-white text-sm font-medium px-6 py-3 rounded-full hover:bg-black hover:text-white transition-colors"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            Get Directions
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-white text-black py-12 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div className="space-y-3">
          <h3 className="text-xl font-bold">Vision 21 Optical</h3>
          <p className="text-black/50 text-sm leading-relaxed">
            Eyeglasses, Sunglasses, Contact Lenses &amp; Korean-style Frames
          </p>
        </div>

        {/* Contact */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm uppercase tracking-wider text-black/70">
            Contact
          </h4>
          <ul className="space-y-2 text-sm text-black/60">
            <li className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <a href="tel:012-7335888" className="hover:text-black transition-colors">
                012-733 5888
              </a>
            </li>
            <li className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              <a href="https://wa.me/60127335888" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">
                WhatsApp
              </a>
            </li>
            <li className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              <a href="https://www.facebook.com/profile.php?id=100057395202064" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">
                Vision 21 Optical
              </a>
            </li>
          </ul>
        </div>

        {/* Address */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm uppercase tracking-wider text-black/70">
            Visit Us
          </h4>
          <div className="text-sm text-black/60 leading-relaxed space-y-1">
            <p>Vision 21 Optical</p>
            <p>Kampung Tengah, Jalan Kekwa,</p>
            <p>Segamat, Johor, Malaysia</p>
          </div>
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=Kampung+Tengah+Jalan+Kekwa+Segamat+Johor+Malaysia"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-xs text-black/40 underline hover:text-black/60 transition-colors mt-2"
          >
            Get Directions
          </a>
          <p className="text-xs text-black/40 mt-4">
            &copy; {new Date().getFullYear()} Vision 21 Optical. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <BrandsSection />
      <StoreLocator />
      <SpectacleHero />
      <VisitUsCTA />
      <Footer />
    </main>
  );
}
