// src/components/pages/LegalPages.tsx
import type { ReactNode } from 'react';
import Eyebrow from '~/components/Eyebrow';
import { PURPLE } from '~/lib/tokens';

const legalH2 = { fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 24, color: PURPLE, letterSpacing: '-0.015em', margin: '36px 0 12px' } as const;

function LegalShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <section className="hero bg-ivory" style={{ paddingBottom: 0 }}>
        <div className="hero-inner" style={{ padding: '60px 32px 40px' }}>
          <Eyebrow>Legal</Eyebrow>
          <h1 className="display-xl" style={{ margin: '16px 0 0', color: PURPLE }}>{title}</h1>
          <div style={{ marginTop: 16, fontSize: 13, color: '#888', fontFamily: 'var(--font-display)' }}>Last updated: January 2026</div>
        </div>
      </section>
      <section className="section section-white">
        <div className="container-narrow" style={{ fontSize: 15, color: '#444', lineHeight: 1.75 }}>
          {children}
        </div>
      </section>
    </>
  );
}

export function TermsPage() {
  return (
    <LegalShell title="Terms & Conditions">
      <p>These terms govern your use of alloygp.co (the "Site") and any engagement with Alloy Growth Partners, LLC ("Alloy", "we", "us"). By using the Site or engaging Alloy for services, you agree to these terms.</p>
      <h2 style={legalH2}>1. Use of the Site</h2>
      <p>You may view, download, and print Site content for personal, non-commercial use. You may not republish, modify, or use Site content for any commercial purpose without our written permission.</p>
      <h2 style={legalH2}>2. Engagement Agreements</h2>
      <p>Service engagements are governed by a separate written agreement between Alloy and the client. The terms here do not modify or replace those engagement agreements.</p>
      <h2 style={legalH2}>3. Market Exclusivity</h2>
      <p>Market exclusivity is a contractual feature of certain Alloy engagement tiers. The exact metro definition, exclusivity period, and conditions are defined in the relevant engagement agreement.</p>
      <h2 style={legalH2}>4. Intellectual Property</h2>
      <p>BoardSuite™, BoardReach™, BoardMatch™, BoardRetain™, We-Know-CAM™, and the Alloy mark are trademarks of Alloy Growth Partners, LLC. All Site content is © Alloy Growth Partners, LLC.</p>
      <h2 style={legalH2}>5. Disclaimers</h2>
      <p>Results referenced on the Site are specific to the clients who produced them and are not a guarantee of future performance. The Site is provided "as is" without warranty of any kind.</p>
      <h2 style={legalH2}>6. Limitation of Liability</h2>
      <p>To the fullest extent permitted by law, Alloy is not liable for indirect, incidental, special, or consequential damages arising from your use of the Site.</p>
      <h2 style={legalH2}>7. Governing Law</h2>
      <p>These terms are governed by the laws of the State of Texas. Any dispute arising from these terms shall be resolved in the state or federal courts located in Travis County, Texas.</p>
      <h2 style={legalH2}>8. Changes</h2>
      <p>We may update these terms from time to time. Material changes will be reflected in the "Last updated" date above.</p>
      <h2 style={legalH2}>9. Contact</h2>
      <p>Questions about these terms: <a href="mailto:contact@alloygp.co">contact@alloygp.co</a>.</p>
    </LegalShell>
  );
}

export function PrivacyPage() {
  return (
    <LegalShell title="Privacy Policy">
      <p>Alloy Growth Partners, LLC ("Alloy") respects your privacy. This policy explains what we collect, how we use it, and the choices you have.</p>
      <h2 style={legalH2}>1. Information We Collect</h2>
      <p>We collect information you submit on contact forms (name, email, company, market, brief notes), and information your browser sends automatically (IP address, browser type, pages visited, referrer). We use cookies for analytics and basic site functionality.</p>
      <h2 style={legalH2}>2. How We Use Information</h2>
      <p>To respond to inquiries, schedule conversations, send requested resources, improve the Site, and (with your permission) send you periodic insights. We do not sell or rent your personal information.</p>
      <h2 style={legalH2}>3. Email & Newsletters</h2>
      <p>If you opt into our newsletter, we send roughly one piece per month. Every email includes a one-click unsubscribe.</p>
      <h2 style={legalH2}>4. Analytics</h2>
      <p>We use privacy-respecting analytics to understand which pages and resources are useful. We do not run cross-site advertising trackers.</p>
      <h2 style={legalH2}>5. Data Retention</h2>
      <p>We retain inquiry data as long as needed to respond and (if you become a client) for the duration of the engagement plus 7 years for tax and contractual records. You may request deletion of your data at any time.</p>
      <h2 style={legalH2}>6. Your Rights</h2>
      <p>You may request access to, correction of, or deletion of your personal information by emailing <a href="mailto:contact@alloygp.co">contact@alloygp.co</a>. We respond within 30 days.</p>
      <h2 style={legalH2}>7. Children</h2>
      <p>The Site is intended for business audiences. We do not knowingly collect information from individuals under 18.</p>
      <h2 style={legalH2}>8. Changes</h2>
      <p>We may update this policy. Material changes will be reflected in the "Last updated" date above.</p>
      <h2 style={legalH2}>9. Contact</h2>
      <p>Privacy questions: <a href="mailto:contact@alloygp.co">contact@alloygp.co</a> · 210-845-5989 · Austin, TX.</p>
    </LegalShell>
  );
}
