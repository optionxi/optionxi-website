import type { Metadata } from 'next';
import OptionXiLanding from './components/optionxi-landing-page';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function Page() {
  return <OptionXiLanding />;
}