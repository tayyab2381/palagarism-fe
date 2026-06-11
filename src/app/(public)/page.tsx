import { CtaBandSection } from "@/components/landing/CtaBandSection";
import { FeaturesPanel } from "@/components/landing/FeaturesPanel";
import { HeroSection } from "@/components/landing/HeroSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { LogoStrip } from "@/components/landing/LogoStrip";
import { PrivacySection } from "@/components/landing/PrivacySection";
import { ProductPreview } from "@/components/landing/ProductPreview";
import { StatsSection } from "@/components/landing/StatsSection";
import { UseCasesSection } from "@/components/landing/UseCasesSection";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function LandingPage() {
  return (
    <main className="mx-auto max-w-page px-6">
      <ErrorBoundary fallbackTitle="Hero unavailable">
        <HeroSection />
      </ErrorBoundary>
      <LogoStrip />
      <ErrorBoundary fallbackTitle="Stats unavailable">
        <StatsSection />
      </ErrorBoundary>
      <ErrorBoundary fallbackTitle="How it works unavailable">
        <HowItWorksSection />
      </ErrorBoundary>
      <ErrorBoundary fallbackTitle="Preview unavailable">
        <ProductPreview />
      </ErrorBoundary>
      <ErrorBoundary fallbackTitle="Features unavailable">
        <FeaturesPanel />
      </ErrorBoundary>
      <ErrorBoundary fallbackTitle="Use cases unavailable">
        <UseCasesSection />
      </ErrorBoundary>
      <ErrorBoundary fallbackTitle="Privacy unavailable">
        <PrivacySection />
      </ErrorBoundary>
      <ErrorBoundary fallbackTitle="CTA unavailable">
        <CtaBandSection />
      </ErrorBoundary>
    </main>
  );
}
