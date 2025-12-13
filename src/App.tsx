import { useMemo, useState } from 'react';
import { parseFlightFile, computeFlightStats } from './utils/parseFlights';
import { type FlightStats } from './types/flight';
import { AirlineSection } from './components/organisms/AirlineSection';
import { AnnualSummary } from './components/organisms/AnnualSummary';
import { CountriesSection } from './components/organisms/CountriesSection';
import { FleetSection } from './components/organisms/FleetSection';
import { Header } from './components/organisms/Header';
import { Hero } from './components/organisms/Hero';
import { HowItWorks } from './components/organisms/HowItWorks';
import { PrivacySection } from './components/organisms/PrivacySection';
import { SocialProof } from './components/organisms/SocialProof';
import { UploadSection } from './components/organisms/UploadSection';
import { Footer } from './components/organisms/Footer';
import { StoryNavigation } from './components/organisms/StoryNavigation';
import './index.css';

type View = 'landing' | 'insights';

function App() {
  const [stats, setStats] = useState<FlightStats | null>(null);
  const [view, setView] = useState<View>('landing');
  const [storyIndex, setStoryIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const slides = useMemo(
    () =>
      stats
        ? [
            { id: 'summary', component: <AnnualSummary stats={stats} /> },
            { id: 'reach', component: <CountriesSection stats={stats} /> },
            { id: 'fleet', component: <FleetSection stats={stats} /> },
            { id: 'airlines', component: <AirlineSection stats={stats} /> },
          ]
        : [],
    [stats],
  );

  const handleUpload = async (file: File) => {
    setIsLoading(true);
    setError(null);
    try {
      const parsed = await parseFlightFile(file);
      if (!parsed.length) {
        throw new Error('No rows detected in the CSV.');
      }
      const computed = computeFlightStats(parsed);
      setStats(computed);
      setStoryIndex(0);
      setView('insights');
      setTimeout(() => {
        document.getElementById('insights')?.scrollIntoView({ behavior: 'smooth' });
      }, 0);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to parse the CSV file.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const goHome = () => {
    setView('landing');
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 0);
  };
  const goInsights = () => {
    if (stats) {
      setView('insights');
      setStoryIndex(0);
      setTimeout(() => {
        document.getElementById('insights')?.scrollIntoView({ behavior: 'smooth' });
      }, 0);
    }
  };

  const goNext = () => {
    setStoryIndex((prev) => Math.min(prev + 1, slides.length - 1));
  };

  const goPrev = () => {
    setStoryIndex((prev) => Math.max(prev - 1, 0));
  };

  const scrollToUpload = () => {
    document.getElementById('upload')?.scrollIntoView({ behavior: 'smooth' });
  };

  const isInsights = view === 'insights';

  return (
    <div className="min-h-screen">
      <Header hasData={Boolean(stats)} onGoHome={goHome} onGoInsights={goInsights} isOnInsights={isInsights} />
      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-16 pt-6 md:px-6 lg:px-8">
        {view === 'landing' && (
          <>
            <Hero stats={stats} onStart={scrollToUpload} />
            <UploadSection onFileSelected={handleUpload} isLoading={isLoading} error={error} />
            <HowItWorks />
            <PrivacySection />
            <SocialProof />
          </>
        )}

        {isInsights && stats && slides.length > 0 && (
          <section id="insights" className="flex flex-col gap-6">
            <StoryNavigation
              current={storyIndex}
              total={slides.length}
              onNext={goNext}
              onPrev={goPrev}
              onHome={goHome}
            />
            {slides[storyIndex]?.component}
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
