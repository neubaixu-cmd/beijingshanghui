import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import Hero from './components/Hero.jsx';
import Highlights from './components/Highlights.jsx';
import NewsList from './components/NewsList.jsx';
import EventsTimeline from './components/EventsTimeline.jsx';
import MemberGrid from './components/MemberGrid.jsx';
import ContactSection from './components/ContactSection.jsx';
import Footer from './components/Footer.jsx';
import Navbar from './components/Navbar.jsx';
import LoadingScreen from './components/LoadingScreen.jsx';

const defaultBaseUrl = window.location.hostname === 'localhost'
  ? 'http://localhost:4000'
  : window.location.origin;

const api = axios.create({
  baseURL: (import.meta.env.VITE_API_BASE_URL || defaultBaseUrl).replace(/\/$/, ''),
});

export default function App() {
  const [sections, setSections] = useState({});
  const [collections, setCollections] = useState({ news: [], events: [], members: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const heroContent = sections.hero;
  const contactContent = sections.contact;
  const aboutContent = sections.about;

  useEffect(() => {
    async function fetchData() {
      try {
        const [sectionsRes, newsRes, eventsRes, membersRes] = await Promise.all([
          api.get('/api/sections'),
          api.get('/api/collections/news'),
          api.get('/api/collections/events'),
          api.get('/api/collections/members'),
        ]);

        const sectionMap = sectionsRes.data.reduce((acc, curr) => {
          acc[curr.key] = curr.content;
          return acc;
        }, {});

        setSections(sectionMap);
        setCollections({
          news: newsRes.data,
          events: eventsRes.data,
          members: membersRes.data,
        });
      } catch (err) {
        console.error(err);
        setError('无法加载内容，请稍后重试。');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const highlights = useMemo(() => {
    if (!aboutContent) return [];
    return [
      {
        title: '我们的使命',
        description: aboutContent.mission,
      },
      {
        title: '我们的愿景',
        description: aboutContent.vision,
      },
      {
        title: '核心价值观',
        description: (aboutContent.values || []).join(' · '),
      },
    ];
  }, [aboutContent]);

  if (loading) {
    return <LoadingScreen message="正在加载北京商会最新资讯..." />;
  }

  if (error) {
    return (
      <div className="page">
        <Navbar title="北京商会" />
        <main className="container">
          <p className="error-text">{error}</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page">
      <Navbar title={heroContent?.title || '北京商会'} action={heroContent?.ctaText} />
      <main className="container">
        {heroContent && <Hero content={heroContent} />}
        <Highlights items={highlights} />
        <NewsList items={collections.news} />
        <EventsTimeline items={collections.events} />
        <MemberGrid items={collections.members} />
        {contactContent && <ContactSection content={contactContent} />}
      </main>
      <Footer />
    </div>
  );
}
