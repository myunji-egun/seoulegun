import { Navigation } from '@/components/sections/Navigation';
import { Hero } from '@/components/sections/Hero';
import { Philosophy } from '@/components/sections/Philosophy';
import { Doctors } from '@/components/sections/Doctors';
import { Preservation } from '@/components/sections/Preservation';
import { Implant } from '@/components/sections/Implant';
import { Sedation } from '@/components/sections/Sedation';
import { Ortho } from '@/components/sections/Ortho';
import { Lab } from '@/components/sections/Lab';
import { Media } from '@/components/sections/Media';
import { Location } from '@/components/sections/Location';
import { Footer } from '@/components/sections/Footer';
import { StickyCTA } from '@/components/sections/StickyCTA';

export default function Home() {
  return (
    <>
      <Navigation />
      <Hero />
      <Philosophy />
      <Doctors />
      <Preservation />
      <Implant />
      <Sedation />
      <Ortho />
      <Lab />
      <Media />
      <Location />
      <Footer />
      <StickyCTA />
    </>
  );
}
