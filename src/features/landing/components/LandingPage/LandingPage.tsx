import { CallToActionSection } from '@/features/landing/components/CallToActionSection/CallToActionSection'
import { DemoLinkSection } from '@/features/landing/components/DemoLinkSection/DemoLinkSection'
import { FaqSection } from '@/features/landing/components/FaqSection/FaqSection'
import { FeaturesSection } from '@/features/landing/components/FeaturesSection/FeaturesSection'
import { HeroSection } from '@/features/landing/components/HeroSection/HeroSection'
import { HowItWorksSection } from '@/features/landing/components/HowItWorksSection/HowItWorksSection'
import { LandingFooter } from '@/features/landing/components/LandingFooter/LandingFooter'
import { LandingHeader } from '@/features/landing/components/LandingHeader/LandingHeader'
import { PressSection } from '@/features/landing/components/PressSection/PressSection'
import { PricingSection } from '@/features/landing/components/PricingSection/PricingSection'
import { StripedDivider } from '@/shared/components/StripedDivider/StripedDivider'

import styles from './LandingPage.module.scss'

export function LandingPage() {
  return (
    <div className={styles.page}>
      <LandingHeader />

      <main className={styles.main}>
        <HeroSection />
        <FeaturesSection />
        <DemoLinkSection />
        <StripedDivider />
        <HowItWorksSection />
        <StripedDivider />
        <PricingSection />
        <StripedDivider />
        <FaqSection />
        <StripedDivider />
        <PressSection />
        <CallToActionSection />
      </main>

      <StripedDivider />
      <LandingFooter />
    </div>
  )
}
