// src/components/pages/LegalPages.tsx — /privacy-policy, /terms-conditions
// Template 6 (Editorial). Shell from docs/redesign-handoff/site/{privacy-policy,terms-conditions}.dc.html;
// legal copy carried over verbatim from the pre-redesign page (restyled only).
import type { CSSProperties, ReactNode } from 'react';
import { Eyebrow } from '~/components/rd/atoms';

const LH: CSSProperties = { lineHeight: 1.65 };

function LegalShell({ title, intro, children }: { title: string; intro: ReactNode; children: ReactNode }) {
  return (
    <div className="rd-page">
      <section className="rd-section">
        <div className="rd-wrap">
          <article className="rd-stack" style={{ maxWidth: 760, gap: 28 }}>
            <Eyebrow tone="purple">Legal</Eyebrow>
            <h1 className="rd-h1 rd-h1--sm" style={{ lineHeight: 0.95, letterSpacing: '-.03em' }}>{title}</h1>
            <div className="rd-tiny rd-w-500">Last updated: January 2026</div>
            <p className="rd-body" style={LH}>{intro}</p>
            {children}
          </article>
        </div>
      </section>
    </div>
  );
}

function Clause({ h, children }: { h: string; children: ReactNode }) {
  return (
    <section className="rd-stack rd-stack--10 rd-rule-top" style={{ paddingTop: 24 }}>
      <h2 className="rd-h3 rd-h3--sm" style={{ lineHeight: 1.2 }}>{h}</h2>
      <p className="rd-small" style={LH}>{children}</p>
    </section>
  );
}

const mail = <a href="mailto:contact@alloygp.co" className="rd-a">contact@alloygp.co</a>;

export function TermsPage() {
  return (
    <LegalShell
      title="Terms & Conditions"
      intro={<>These terms govern your use of alloygp.co (the "Site") and any engagement with Alloy Growth Partners, LLC ("Alloy", "we", "us"). By using the Site or engaging Alloy for services, you agree to these terms.</>}
    >
      <Clause h="1. Use of the Site">You may view, download, and print Site content for personal, non-commercial use. You may not republish, modify, or use Site content for any commercial purpose without our written permission.</Clause>
      <Clause h="2. Engagement Agreements">Service engagements are governed by a separate written agreement between Alloy and the client. The terms here do not modify or replace those engagement agreements.</Clause>
      <Clause h="3. Market Exclusivity">Market exclusivity is a contractual feature of certain Alloy engagement tiers. The exact metro definition, exclusivity period, and conditions are defined in the relevant engagement agreement.</Clause>
      <Clause h="4. Intellectual Property">BoardSuite™, BoardReach™, BoardMatch™, BoardRetain™, We-Know-CAM™, and the Alloy mark are trademarks of Alloy Growth Partners, LLC. All Site content is © Alloy Growth Partners, LLC.</Clause>
      <Clause h="5. Disclaimers">Results referenced on the Site are specific to the clients who produced them and are not a guarantee of future performance. The Site is provided "as is" without warranty of any kind.</Clause>
      <Clause h="6. Limitation of Liability">To the fullest extent permitted by law, Alloy is not liable for indirect, incidental, special, or consequential damages arising from your use of the Site.</Clause>
      <Clause h="7. Governing Law">These terms are governed by the laws of the State of Texas. Any dispute arising from these terms shall be resolved in the state or federal courts located in Travis County, Texas.</Clause>
      <Clause h="8. Changes">We may update these terms from time to time. Material changes will be reflected in the "Last updated" date above.</Clause>
      <Clause h="9. Contact">Questions about these terms: {mail}.</Clause>
    </LegalShell>
  );
}

export function PrivacyPage() {
  return (
    <LegalShell
      title="Privacy Policy"
      intro={<>Alloy Growth Partners, LLC ("Alloy") respects your privacy. This policy explains what we collect, how we use it, and the choices you have.</>}
    >
      <Clause h="1. Information We Collect">We collect information you submit on contact forms (name, email, company, market, brief notes), and information your browser sends automatically (IP address, browser type, pages visited, referrer). We use cookies for analytics and basic site functionality.</Clause>
      <Clause h="2. How We Use Information">To respond to inquiries, schedule conversations, send requested resources, improve the Site, and (with your permission) send you periodic insights. We do not sell or rent your personal information.</Clause>
      <Clause h="3. Email & Newsletters">If you opt into our newsletter, we send roughly one piece per month. Every email includes a one-click unsubscribe.</Clause>
      <Clause h="4. Analytics">We use privacy-respecting analytics to understand which pages and resources are useful. We do not run cross-site advertising trackers.</Clause>
      <Clause h="5. Data Retention">We retain inquiry data as long as needed to respond and (if you become a client) for the duration of the engagement plus 7 years for tax and contractual records. You may request deletion of your data at any time.</Clause>
      <Clause h="6. Your Rights">You may request access to, correction of, or deletion of your personal information by emailing {mail}. We respond within 30 days.</Clause>
      <Clause h="7. Children">The Site is intended for business audiences. We do not knowingly collect information from individuals under 18.</Clause>
      <Clause h="8. Changes">We may update this policy. Material changes will be reflected in the "Last updated" date above.</Clause>
      <Clause h="9. Contact">Privacy questions: {mail} · 210-845-5989 · Austin, TX.</Clause>
    </LegalShell>
  );
}
