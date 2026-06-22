import {
  ArrowRight,
  BadgeCheck,
  Bell,
  CalendarDays,
  Heart,
  MessageCircle,
  MessageSquareText,
  Search,
  Send,
  Share2,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from 'lucide-react'
import type { ReactNode } from 'react'
import heroImage from '../assets/fanclub/stadium-hero.png'
import scarfImage from '../assets/fanclub/products/scarf.png'
import teeImage from '../assets/fanclub/products/tee.png'
import pinsImage from '../assets/fanclub/products/pins.png'
import './Home.css'

interface HomeProps {
  navigate: (href: string) => void
}

const posts = [
  {
    author: 'Avi Cohen',
    badge: 'Matchday Crew',
    title: 'What changed after halftime?',
    body: 'Placeholder community post: fans can break down tactics, share clips, and keep the conversation moving after the final whistle.',
    tag: 'Match Talk',
    comments: 34,
    likes: 128,
    time: '12 min ago',
  },
  {
    author: 'Maya Green',
    badge: 'Tel Aviv Chapter',
    title: 'Away-day meetup thread',
    body: 'Placeholder community post: coordinate watch parties, travel plans, and local supporter groups in one moderated thread.',
    tag: 'Meetups',
    comments: 18,
    likes: 76,
    time: '43 min ago',
  },
  {
    author: 'Noam Levi',
    badge: 'New Member',
    title: 'Best chants for new supporters?',
    body: 'Placeholder community post: make the club welcoming with explainers, traditions, and matchday etiquette for casual fans.',
    tag: 'Culture',
    comments: 52,
    likes: 203,
    time: '2 hr ago',
  },
]

const products = [
  { name: 'Green & White Scarf', price: '$28', label: 'Generated mockup', image: scarfImage },
  { name: 'Supporter Tee', price: '$34', label: 'Generated mockup', image: teeImage },
  { name: 'Matchday Pin Set', price: '$16', label: 'Generated mockup', image: pinsImage },
]

const stats = [
  ['4.8k', 'members'],
  ['312', 'weekly posts'],
  ['27', 'local chapters'],
]

const roadmap = [
  ['Phase 1', 'Accounts, profiles, posting, comments, tags, and sharing.'],
  ['Phase 2', 'Shop, newsletter, live chat, and social integrations.'],
  ['Phase 3', 'Moderation dashboard, product management, QA, and launch polish.'],
]

export function HomePage({ navigate }: HomeProps) {
  return (
    <main id="main" className="fanclub">
      <section className="club-hero" id="community">
        <img className="club-hero__image" src={heroImage} alt="Green and white football supporters celebrating in a stadium" />
        <div className="club-hero__shade" />
        <div className="club-hero__content container">
          <div className="club-hero__copy">
            <span className="club-kicker"><Sparkles size={16} /> Community-first fan club</span>
            <h1>Maccabi Haifa Fan Club</h1>
            <p>
              A fresh supporter hub for match talk, member posts, comments, local chapters, and lightweight merch.
              Built as a high-energy placeholder experience until real content, licensing, and language choices are confirmed.
            </p>
            <div className="club-hero__actions">
              <button className="club-btn club-btn--primary" onClick={() => navigate('#join')}>
                Join the club <ArrowRight size={18} />
              </button>
              <button className="club-btn club-btn--secondary" onClick={() => navigate('#feed')}>
                Browse posts
              </button>
            </div>
            <div className="club-hero__stats" aria-label="Community highlights">
              {stats.map(([value, label]) => (
                <span key={label}><strong>{value}</strong>{label}</span>
              ))}
            </div>
          </div>

          <div className="composer-panel" aria-label="Post composer preview">
            <div className="composer-panel__top">
              <span className="avatar">MH</span>
              <div>
                <strong>Start a discussion</strong>
                <p>Posting requires a member account</p>
              </div>
            </div>
            <label htmlFor="composer-title">Title</label>
            <input id="composer-title" value="Who was your player of the match?" readOnly />
            <label htmlFor="composer-body">Post</label>
            <textarea
              id="composer-body"
              value="Placeholder rich-text composer for match reactions, photos, and fan stories."
              readOnly
            />
            <div className="composer-panel__tools">
              <span>#MatchTalk</span>
              <span>#Lineup</span>
              <button><Send size={16} /> Publish</button>
            </div>
          </div>
        </div>
      </section>

      <section className="feed-section section-pad" id="feed">
        <div className="container feed-grid">
          <div className="section-intro">
            <span className="club-kicker"><MessageSquareText size={16} /> Latest community posts</span>
            <h2>The feed is the front door.</h2>
            <p>
              The shop stays secondary. The main experience pushes fans into posting, reacting, commenting,
              sharing, and finding their chapter.
            </p>
          </div>

          <aside className="trending-box" aria-label="Trending discussions">
            <div className="trending-box__head">
              <strong>Trending now</strong>
              <span>Top 24h</span>
            </div>
            {['Derby predictions', 'Best away section photos', 'Summer transfer thread'].map((topic, index) => (
              <button key={topic}>
                <span>{index + 1}</span>
                {topic}
                <ArrowRight size={16} />
              </button>
            ))}
          </aside>

          <div className="post-feed">
            <div className="feed-toolbar" aria-label="Feed controls">
              <div className="feed-search"><Search size={16} /> Search posts, tags, members</div>
              <div className="feed-tabs">
                <button className="is-active">Newest</button>
                <button>Top</button>
              </div>
            </div>

            {posts.map((post) => (
              <article className="post-card" key={post.title}>
                <div className="post-card__meta">
                  <span className="avatar">{post.author.split(' ').map((part) => part[0]).join('')}</span>
                  <div>
                    <strong>{post.author}</strong>
                    <span><BadgeCheck size={14} /> {post.badge} · {post.time}</span>
                  </div>
                  <span className="tag">{post.tag}</span>
                </div>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
                <div className="post-card__actions">
                  <button><Heart size={17} /> {post.likes}</button>
                  <button><MessageCircle size={17} /> {post.comments}</button>
                  <button><Share2 size={17} /> Share</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="feature-band" id="about">
        <div className="container feature-band__grid">
          <div>
            <span className="club-kicker"><Users size={16} /> About the fan club</span>
            <h2>Built for supporters, not storefront browsing.</h2>
            <p>
              Placeholder about copy: Maccabi Haifa Fan Club connects supporters through matchday discussion,
              chapter meetups, member profiles, and fan-created stories. This should be reviewed for official
              versus independent status before launch.
            </p>
          </div>
          <div className="feature-list">
            <Feature icon={<ShieldCheck size={20} />} title="Moderation ready" text="Approval queues, spam controls, and member bans are planned for open posting." />
            <Feature icon={<Bell size={20} />} title="Growth loops" text="Newsletter signup, live chat, and share links help keep casual fans coming back." />
            <Feature icon={<CalendarDays size={20} />} title="Local chapters" text="Meetups and watch parties can be organized by location once profiles are live." />
          </div>
        </div>
      </section>

      <section className="shop-section section-pad" id="shop">
        <div className="container">
          <div className="shop-section__head">
            <div>
              <span className="club-kicker">Secondary shop</span>
              <h2>Featured merchandise, kept compact.</h2>
            </div>
            <button className="club-btn club-btn--secondary">View cart</button>
          </div>
          <div className="product-grid">
            {products.map((product, index) => (
              <article className="product-card" key={product.name}>
                <div className={`product-card__art product-card__art--${index + 1}`}>
                  <img src={product.image} alt={`${product.name} mockup`} />
                </div>
                <span>{product.label}</span>
                <h3>{product.name}</h3>
                <div className="product-card__bottom">
                  <strong>{product.price}</strong>
                  <button>Add</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="launch-section" id="join">
        <div className="container launch-section__grid">
          <div>
            <span className="club-kicker"><Star size={16} /> Build roadmap</span>
            <h2>Launch the community in phases.</h2>
            <p>
              The brief estimates 2-3 months. This frontend establishes the engagement-first direction and
              gives stakeholders something concrete to react to.
            </p>
          </div>
          <div className="roadmap">
            {roadmap.map(([phase, text]) => (
              <div className="roadmap__item" key={phase}>
                <strong>{phase}</strong>
                <p>{text}</p>
              </div>
            ))}
          </div>
          <form className="join-card" onSubmit={(event) => event.preventDefault()}>
            <h3>Join the placeholder waitlist</h3>
            <p>Replace this with real auth, newsletter provider, and a confirmed contact email before launch.</p>
            <div className="join-card__row">
              <input aria-label="Email address" placeholder="fan@example.com" />
              <button className="club-btn club-btn--primary">Sign up</button>
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}

function Feature({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <article className="feature-item">
      <span>{icon}</span>
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </article>
  )
}
