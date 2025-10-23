import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

/** Optional: small two-column layout primitive */
function TwoCol({
  reverse,
  left,
  right,
}: {
  reverse?: boolean;
  left: ReactNode;
  right: ReactNode;
}) {
  return (
    <div
      className={clsx(styles.twoCol, reverse && styles.twoColReverse)}
      role="region"
    >
      <div className={styles.twoColLeft}>{left}</div>
      <div className={styles.twoColRight}>{right}</div>
    </div>
  );
}

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className={clsx('container', styles.heroInner)}>
        <Heading as="h1" className={styles.heroTitle}>
          <span className={styles.limeText}>Continuous Passive</span> <br /> 
          Authentication
        </Heading>
        <p className={styles.heroSubtitle}>
          Zero Trust with Zero UX Friction <br />
          <strong>100% of your users phishing-resistant in 1 day</strong>
        </p>
        <div className={styles.buttons}>
          <Link
            className={clsx('button button--primary', styles.ctaPrimary)}
            to="https://www.relock.security/#contact"
          >
            Schedule a demo
          </Link>
          <Link
            className={clsx('button button--secondary', styles.ctaSecondary)}
            to="/docs"
          >
            Discover
          </Link>
        </div>
      </div>
    </header>
  );
}

function SectionPairAnyCreds() {
  return (
    <section className={styles.section}>
      <div className={clsx('container', styles.sectionInner)}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.h2}>
            Pair it with <br /> 
            <span className={styles.limeText}>any credentials</span>
          </h2>
          <p className={styles.lead}>
            Relock can be used with any active authentication, from passwords
            to passkeys, to make all your users phishing- and session-hijacking
            resistant. <br /><br />
            Unlike traditional authentication, it works entirely in
            the background and can be invisibly deployed to anyone, including
            your customers and partners.
          </p>
        </div>
        <div className={styles.mediaCard}>
          <img
            src="https://cdn.prod.website-files.com/67e107552eedfd4eb6f3ebb2/67e11c82b3f2b0d9089350d1_Untitled%20design.gif"
            alt="Pair Relock with any credentials"
          />
        </div>
      </div>
    </section>
  );
}

function SectionStopAiTM() {
  return (
    <section className={styles.section}>
      <div className={clsx('container', styles.sectionInner)}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.h2}>
            <span className={styles.limeText}>Stop</span> AitM attacks <br /> 
            and session theft
          </h2>
          <p className={styles.lead}>
            Relock's direct security signals stop any attempt to use compromised
            credentials, stolen authenticated session tokens, and MFA bypass,
            including modern AitM and AitB attacks. <br /><br />
            You can connect Relock directly with your current authentication flow 
            and share the signals using OpenTelemetry and the latest CAEP protocol 
            for easy interoperability.
          </p>
        </div>
        <div className={styles.mediaCard}>
          <img
            src="https://cdn.prod.website-files.com/67e107552eedfd4eb6f3ebb2/67e11db6b2e1a457b12a4aca_Table.gif"
            alt="Relock makes any authentication phishing-resistant"
          />
        </div>
      </div>
    </section>
  );
}

function SectionCryptoMutualTrust() {
  return (
    <section className={styles.section}>
      <div className={clsx('container', styles.sectionInner)}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.h2}>
            <span className={styles.limeText}>Cryptographic</span> <br /> 
            Mutual Trust
          </h2>
          <p className={styles.lead}>
            Relock introduces a fundamental change in continuous security — the
            application directly verifies the browser at each request with
            origin-bound, transient keys. <br /><br />
            Each key is used only once and by one device and any attempt to 
            intercept it is immediately detected, radically reducing the window 
            of attack to the exact time of user's inactivity in the application.
          </p>
        </div>
        <div className={styles.mediaCard}>
          <img
            src="https://cdn.prod.website-files.com/67e107552eedfd4eb6f3ebb2/6819bfe4845bb863becec347_relock_logo_contra_transparent.png"
            alt="Relock visualization"
          />
        </div>
      </div>
    </section>
  );
}

function SectionCTA() {
  return (
    <section className={clsx(styles.section, styles.sectionNoDivider)}>
      <div className={clsx('container', styles.ctaWrap)}>
        <div className={styles.ctaLeft}>
          <h2 className={styles.h2} style={{marginBottom: 0}}>
            Get it done today
          </h2>
          <p className={styles.lead} style={{marginTop: 6}}>
            100% of your users phishing-resistant
          </p>
        </div>
        <div className={styles.ctaRight}>
          <Link
            className={clsx('button button--primary', styles.ctaPrimary)}
            to="https://www.relock.security/#contact"
          >
            Schedule a demo
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Zero Trust with Zero UX Friction — 100% of your users phishing-resistant in 1 day"
    >
      <HomepageHeader />
      <main>
        <SectionPairAnyCreds />
        <SectionStopAiTM />
        <SectionCryptoMutualTrust />
        <SectionCTA />
      </main>
    </Layout>
  );
}
