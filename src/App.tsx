import { useEffect, useMemo, useState } from 'react';
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
import { FloatingShare } from './components/organisms/FloatingShare';
import { PunctualitySection } from './components/organisms/PunctualitySection';
import { ItinerariesSection } from './components/organisms/ItinerariesSection';
import { FrequencySection } from './components/organisms/FrequencySection';
import { DurationSection } from './components/organisms/DurationSection';
import { DisruptionSection } from './components/organisms/DisruptionSection';
import './index.css';
import confetti from 'canvas-confetti';

type View = 'landing' | 'insights';

function App() {
  const [statsAll, setStatsAll] = useState<FlightStats | null>(null);
  const [statsByYear, setStatsByYear] = useState<Record<string, FlightStats>>({});
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [view, setView] = useState<View>('landing');
  const [storyIndex, setStoryIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentYear = 2025;

  const focusInsightsSection = () => {
    setTimeout(() => {
      const section = document.getElementById('insights');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        section.tabIndex = -1;
        section.focus({ preventScroll: true });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 0);
  };

  const shareSectionImage = async (sectionId: string, label: string) => {
    try {
      const html2canvas = (await import('html2canvas')).default;
      const section = document.getElementById(sectionId);
      if (!section) {
        throw new Error('Section not found');
      }
      const canvas = await html2canvas(section, { backgroundColor: '#ffffff', scale: 2 });
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
      if (!blob) {
        throw new Error('Unable to capture image');
      }
      const fileName = `${label.replace(/\s+/g, '-').toLowerCase()}.png`;
      const file = new File([blob], fileName, { type: 'image/png' });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: 'Flighty Wrapped', text: label });
      } else {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.click();
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error(err);
      setError('Unable to share right now.');
    }
  };

  const slides = useMemo(() => {
    const activeStats =
      selectedYear === 'all' ? statsAll : statsByYear[selectedYear] ?? statsAll;
    if (!activeStats) return [];
    return [
      {
        id: 'summary',
        label: `${selectedYear === 'all' ? 'All time' : selectedYear} summary`,
        containerId: 'summary-section',
        component: (
          <AnnualSummary
            stats={activeStats}
            scopeLabel={selectedYear === 'all' ? 'All-time' : `${selectedYear} In The Air`}
            containerId="summary-section"
          />
        ),
      },
      {
        id: 'reach',
        label: 'World reach',
        containerId: 'reach-section',
        component: <CountriesSection stats={activeStats} containerId="reach-section" />,
      },
      {
        id: 'fleet',
        label: 'Fleet',
        containerId: 'fleet-section',
        component: <FleetSection stats={activeStats} containerId="fleet-section" />,
      },
      {
        id: 'airlines',
        label: 'Airlines',
        containerId: 'airlines-section',
        component: <AirlineSection stats={activeStats} containerId="airlines-section" />,
      },
      {
        id: 'punctuality',
        label: 'Time & punctuality',
        containerId: 'punctuality-section',
        component: <PunctualitySection stats={activeStats} containerId="punctuality-section" />,
      },
      {
        id: 'itineraries',
        label: 'Itineraries & airports',
        containerId: 'itineraries-section',
        component: <ItinerariesSection stats={activeStats} containerId="itineraries-section" />,
      },
      {
        id: 'frequency',
        label: 'Frequency & dates',
        containerId: 'frequency-section',
        component: <FrequencySection stats={activeStats} containerId="frequency-section" />,
      },
      {
        id: 'durations',
        label: 'Durations',
        containerId: 'durations-section',
        component: <DurationSection stats={activeStats} containerId="durations-section" />,
      },
      {
        id: 'disruptions',
        label: 'Disruptions',
        containerId: 'disruptions-section',
        component: <DisruptionSection stats={activeStats} containerId="disruptions-section" />,
      },
    ];
  }, [selectedYear, statsAll, statsByYear]);

  const handleUpload = async (file: File) => {
    setIsLoading(true);
    setError(null);
    try {
      const parsed = await parseFlightFile(file);
      if (!parsed.length) {
        throw new Error('No rows detected in the CSV.');
      }
      const computedAll = computeFlightStats(parsed);

      const grouped: Record<string, typeof parsed> = {};
      parsed.forEach((record) => {
        const parsedDate = Date.parse(record.date);
        if (Number.isNaN(parsedDate)) return;
        const year = new Date(parsedDate).getFullYear().toString();
        if (!grouped[year]) grouped[year] = [];
        grouped[year].push(record);
      });
      const yearStatsEntries = Object.entries(grouped).reduce<Record<string, FlightStats>>(
        (acc, [year, list]) => {
          acc[year] = computeFlightStats(list);
          return acc;
        },
        {},
      );

      const defaultYear =
        yearStatsEntries[currentYear]?.flights ? currentYear.toString() : Object.keys(grouped)[0] ?? 'all';

      setStatsAll(computedAll);
      setStatsByYear(yearStatsEntries);
      setSelectedYear(defaultYear || 'all');
      setStoryIndex(0);
      setView('insights');
      focusInsightsSection();
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
    if (Object.keys(statsByYear).length || statsAll) {
      setView('insights');
      setStoryIndex(0);
      focusInsightsSection();
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

  useEffect(() => {
    if (isInsights && slides.length > 0 && storyIndex === slides.length - 1) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [isInsights, slides.length, storyIndex]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        hasData={Boolean(statsAll || Object.keys(statsByYear).length)}
        onGoHome={goHome}
        onGoInsights={goInsights}
        isOnInsights={isInsights}
      />
      <main className="mx-auto flex max-w-6xl flex-1 flex-col gap-10 px-4 pb-16 pt-6 md:px-6 lg:px-8 w-full">
        {view === 'landing' && (
          <>
            <Hero onStart={scrollToUpload} />
            <UploadSection onFileSelected={handleUpload} isLoading={isLoading} error={error} />
            <HowItWorks />
            <PrivacySection />
            <SocialProof />
          </>
        )}

        {isInsights && slides.length > 0 && (
          <section id="insights" className="flex flex-col gap-6">
            <StoryNavigation
              current={storyIndex}
              total={slides.length}
              onNext={goNext}
              onPrev={goPrev}
              years={['all', ...Object.keys(statsByYear).sort((a, b) => Number(b) - Number(a))]}
              selectedYear={selectedYear}
              onYearChange={(year) => {
                setSelectedYear(year);
                setStoryIndex(0);
                focusInsightsSection();
              }}
            />
            {slides[storyIndex]?.component}
            <FloatingShare
              onShare={() =>
                shareSectionImage(
                  slides[storyIndex]?.containerId ?? 'insights',
                  slides[storyIndex]?.label ?? 'Flighty Wrapped',
                )
              }
            />
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
