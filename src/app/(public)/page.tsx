import { CtaBandSection } from "@/components/landing/CtaBandSection";
import { FeaturesPanel } from "@/components/landing/FeaturesPanel";
import { HeroSection } from "@/components/landing/HeroSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { PrivacySection } from "@/components/landing/PrivacySection";
import { StatsSection } from "@/components/landing/StatsSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function LandingPage() {
  return (
    <main className="mx-auto max-w-page px-6">
      <ErrorBoundary fallbackTitle="Hero section unavailable">
        <HeroSection />
      </ErrorBoundary>
      <ErrorBoundary fallbackTitle="Stats section unavailable">
        <StatsSection />
      </ErrorBoundary>
      <ErrorBoundary fallbackTitle="How it works unavailable">
        <HowItWorksSection />
      </ErrorBoundary>
      <ErrorBoundary fallbackTitle="Features section unavailable">
        <FeaturesPanel />
      </ErrorBoundary>
      <ErrorBoundary fallbackTitle="Testimonials unavailable">
        <TestimonialsSection />
      </ErrorBoundary>
      <ErrorBoundary fallbackTitle="Privacy section unavailable">
        <PrivacySection />
      </ErrorBoundary>
      <ErrorBoundary fallbackTitle="CTA section unavailable">
        <CtaBandSection />
      </ErrorBoundary>
    </main>
  );
}
