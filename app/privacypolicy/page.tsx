// importing next
import Link from "next/link";

// importing components
import Footer from "@/components/Footer";
import Header from "@/components/Legal/Header";

// importing fonts
import { titleFont } from "@/utils/fonts";

export default function PrivacyPolicy() {
  return (
    <main>
      <Header />

      <div className="flex flex-col gap-5 min-h-screen w-full px-5 py-[2rem]">
        <h1 className={`text-[3rem] text-center ${titleFont.className}`}>
          Privacy Policy
        </h1>

        <h2 className="text-center">Effective as of 5/23/23</h2>

        <div className="flex flex-col gap-5 w-full md:w-3/4 mx-auto">
          <p>
            This Privacy Policy describes how Sponsorless LLC ("Sponsorless,"
            "we," "us," or "our") handles personal information that we collect
            through our digital properties that link to this Privacy Policy,
            including our websites, located at{" "}
            <Link
              href={"https://sponsorless.com/"}
              target="_blank"
              className="text-sky-600"
            >
              https://sponsorless.com/
            </Link>
            ,{" "}
            <Link
              href={"https://shop.sponsorless.com/"}
              target="_blank"
              className="text-sky-600"
            >
              https://shop.sponsorless.com/
            </Link>
            , and any other sponsorless.com subdomain (collectively, the
            "Service"), as well as through social media, our marketing
            activities, live events, and other activities described in this
            Privacy Policy.
          </p>

          <h3>Index</h3>
          <ol className="list-decimal list-inside ml-[2rem]">
            <li>
              <Link href="/privacypolicy/#information-we-collect">
                Personal Information We Collect
              </Link>
            </li>
            <li>
              <Link href="/privacypolicy/#how-we-use-your-information">
                How We Use Your Personal Information
              </Link>
            </li>
            <li>
              <Link href="/privacypolicy/#how-we-share-your-information">
                How We Share Your Personal Information
              </Link>
            </li>
            <li>
              <Link href="/privacypolicy/#your-choices">Your Choices</Link>
            </li>
            <li>
              <Link href="/privacypolicy/#other-sites-and-services">
                Other Sites and Services
              </Link>
            </li>
            <li>
              <Link href="/privacypolicy/#security">Security</Link>
            </li>
            <li>
              <Link href="/privacypolicy/#international-transfers">
                International Data Transfers
              </Link>
            </li>
            <li>
              <Link href="/privacypolicy/#children">Children</Link>
            </li>
            <li>
              <Link href="/privacypolicy/#changes-to-this-privacy-policy">
                Changes to This Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/privacypolicy/#contact-us">How To Contact Us</Link>
            </li>
          </ol>

          <h3 id="information-we-collect">
            1. Personal Information We Collect
          </h3>
          <p>
            Information you provide to us. Personal information you may provide
            to us through the Service or otherwise includes:
          </p>

          <ul className="list-disc list-outside ml-[2rem]">
            <li>
              Contact data, such as your first and last name, salutation, email
              address, billing and mailing addresses, and phone number.
            </li>
            <li>Demographic data, such as city, state, and postal code.</li>
            <li>
              Profile data, such as the wallet address and username or password
              used to establish an online account on the Service, avatar, links
              to your profiles on social networks (such as your Discord or
              Twitter profile), interests, preferences, and any other
              information that you add to your account profile.
            </li>
            <li>
              Communications that we exchange with you, including when you
              contact us through the Service, social media, or otherwise.
            </li>

            <li>
              Event data, such as any events that you may register for through
              your group or local chapter.
            </li>
            <li>
              Payment information data needed to complete transactions is
              collected and processed directly by our payment processor, such as
              Stripe or OpenSea, as further described below in the "How We Share
              Your Personal Information" section.
            </li>
            <li>
              Promotion data, including information you share when you enter a
              competition, promotion, or complete a survey. Please note that if
              you participate in a sweepstakes, contest, or giveaway through the
              Service, we may ask you for your Contact Data to notify you if you
              win or not, to verify your identity, determine your eligibility,
              and/or to send you prizes. These sweepstakes and contests are
              voluntary. We recommend that you read the rules and other relevant
              information for each sweepstakes and contest that you enter.
            </li>
            <li>
              Transactional data, such as information relating to or needed to
              complete your specific NFT purchases or sales on or through the
              Service.
            </li>
            <li>
              Marketing data, such as your preferences for receiving our
              marketing communications and details about your engagement with
              them.
            </li>
            <li>
              Financial data, such as your virtual currency or wallet accounts,
              stored value accounts, and associated details.
            </li>
            <li>
              Other data not specifically listed here, which we will use as
              described in this Privacy Policy or as otherwise disclosed at the
              time of collection.
            </li>
          </ul>

          <p>
            Third-party sources. We may combine personal information we receive
            from you with personal information we obtain from other sources,
            such as:
          </p>
          <ul className="list-disc list-outside ml-[2rem]">
            <li>
              Public sources, such as government agencies, public records,
              social media platforms, public blockchain(s), and other publicly
              available sources.
            </li>
            <li>
              Partners, such as outdoor brands, communities, and athletes with
              which we partner, as well as joint marketing partners and event
              co-sponsors.
            </li>
            <li>
              Affiliate partners, such as our affiliate network provider and
              publishers, influencers, promoters, and others who participate in
              our paid affiliate programs.
            </li>
            <li>
              Third-party services, such as third-party service that you use to
              log into or otherwise link to your Service account. For example,
              you may be able to connect your wallet from a third-party platform
              with your Service account.
            </li>
          </ul>

          <p>
            Automatic data collection. We, our service providers, and our
            business partners may automatically gather information about you,
            your computer or mobile device, and your interactions with
            Sponsorless' digital properties, communications, and other online
            services, including:
          </p>

          <ul className="list-disc list-outside ml-[2rem]">
            <li>
              Cookies: These are small text files that websites store on user
              devices, enabling web servers to record users' web browsing
              activities and remember their submissions, preferences, and login
              status as they navigate a site. Sponsorless’ digital properties
              use both "session cookies" that are deleted when a session ends,
              and "persistent cookies" that remain for a longer period. These
              include both "first-party" cookies placed by Sponsorless and
              "third-party" cookies placed by our business partners and service
              providers.
            </li>
            <li>
              Local storage technologies: These include technologies like HTML5
              and Flash, which provide functionality similar to cookies but can
              store larger amounts of data on your device outside of your
              browser in connection with specific applications.
            </li>
            <li>
              Web beacons: These are small graphic images (also known as "pixel
              tags" or "clear GIFs") that may be included on our digital
              properties, services, applications, messaging, and tools, that
              typically work in conjunction with cookies to identify our users
              and user behavior.
            </li>
            <li>
              Location tracking and location-based services: We may also collect location information from your device to provide location-based services if you grant us permission. This allows us to personalize your experience and provide relevant content and features based on your location. You can manage your device's location settings to control or disable location tracking.
            </li>
          </ul>

          <h3 id="how-we-use-your-information">
            2. How We Use Your Personal Information
          </h3>

          <p>
            We may utilize your personal information for the following purposes
            or as otherwise stated at the time of collection:
          </p>
          <p>Service delivery. We may use your personal information to:</p>

          <ul className="list-disc list-outside ml-[2rem]">
            <li>Provide, operate, and enhance the Service and our business.</li>
            <li>Establish and maintain your user profile on the Service.</li>
            <li>
              Enable security features of the Service, such as sending you
              security codes via email or SMS, and remembering previously
              logged-in devices.
            </li>
            <li>
              Communicate with you regarding the Service, including sending
              announcements, updates, security alerts, and support and
              administrative messages.
            </li>
            <li>
              Understand your needs and interests, and personalize your
              experience with the Service and our communications.
            </li>
            <li>
              Provide support for the Service and respond to your requests,
              questions, and feedback.
            </li>
          </ul>

          <p>
            The website uses cookies to help keep track of items you put into your shopping cart, including when you have abandoned your cart. This information is used to determine when to send cart reminder messages via SMS.
          </p>
          <p>
            Research and development. We may employ your personal information
            for research and development purposes, including analyzing and
            improving the Service and our business. We may create anonymous,
            aggregated, or de-identified data from your personal information and
            the personal information of other individuals we collect. By
            removing information that identifies you, we render personal
            information into anonymous, aggregated, or de-identified data. This
            data may be shared with third parties for lawful business purposes,
            such as analyzing and enhancing the Service and promoting our
            business.
          </p>

          <p>
            Events. After collecting your personal information at an event, we
            may use it to contact you or market to you.
          </p>
          <p>
            Marketing. We and our service providers may collect and utilize your
            personal information for direct marketing communications. You have
            the option to opt-out of our marketing communications, as described
            in the "Opt-out of marketing" section below.
          </p>
          <p>
            Compliance and protection. We may use your personal information to:
          </p>
          <ul className="list-disc list-outside ml-[2rem]">
            <li>
              Comply with applicable laws, lawful requests, and legal processes,
              such as responding to subpoenas or government authorities'
              requests.
            </li>
            <li>
              Protect our, your, or others' rights, privacy, safety, or
              property, including making and defending legal claims.
            </li>
            <li>
              Audit our internal processes to ensure compliance with legal and
              contractual requirements or internal policies.
            </li>
            <li>Enforce the terms and conditions governing the Service.</li>
            <li>
              Prevent, identify, investigate, and deter fraudulent, harmful,
              unauthorized, unethical, or illegal activities, including
              cyberattacks and identity theft.
            </li>
          </ul>

          <p>
            With your consent. In certain cases, we may ask for your explicit
            consent to collect, use, or share your personal information, as
            required by law.
          </p>
          <p>
            Cookies and similar technologies. In addition to the purposes
            mentioned above, we may use cookies and similar technologies for the
            following purposes:
          </p>
          <ul className="list-disc list-outside ml-[2rem]">
            <li>
              Technical operation: To enable the smooth technical operation of
              the Service, such as remembering your preferences and login status
              as you navigate the site.
            </li>
            <li>
              Functionality: To enhance the performance and functionality of our
              services.
            </li>
            <li>
              Analytics: To understand user activity on the Service, including
              which pages are visited most and least, how visitors navigate the
              Service, and user interactions with our emails. We may use Google
              Analytics for this purpose. You can learn more about Google
              Analytics and opt-out of its use relating to our sites by visiting{" "}
              <Link
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                className="text-sky-600"
              >
                https://tools.google.com/dlpage/gaoptout
              </Link>
              .
            </li>
          </ul>

          <h3 id="how-we-share-your-information">
            3. How We Share Your Personal Information
          </h3>
          <p>
            We may share your personal information with the following parties,
            as well as as otherwise described in this Privacy Policy or at the
            time of collection:
          </p>
          <ul className="list-disc list-outside ml-[2rem]">
            <li>
              Service providers: Third parties that provide services on our
              behalf to help operate the Service or our business, such as
              hosting, customer support, email delivery, marketing, consumer
              research, and website analytics.
            </li>
            <li>
              Cryptocurrency platforms: Any information collected necessary to
              process an NFT purchase, such as your wallet address, is collected
              and processed directly by your chosen cryptocurrency platform.
              Please review the privacy policies of the relevant cryptocurrency
              platform to understand how they use your payment information. For
              example, if you use OpenSea to purchase NFT memberships, refer to
              their privacy policy at{" "}
              <Link
                href={"https://opensea.io/privacy"}
                target="_blank"
                className="text-sky-600"
              >
                https://opensea.io/privacy
              </Link>{" "}
              for more information.
            </li>
            <li>
              Payment processors: Your payment card information used for
              purchases on the Service is processed directly by our payment
              processors, such as Shopify. Shopify may use your data in
              accordance with its privacy policy at{" "}
              <Link
                href={"https://www.shopify.com/legal/privacy"}
                target="_blank"
                className="text-sky-600"
              >
                https://www.shopify.com/legal/privacy
              </Link>{" "}
              .
            </li>
            <li>
              Partners: We may share your personal information with our
              partners, including non-profits and brand partners, or enable them
              to collect information directly through our Service. For example,
              if you schedule a time for an event, we will share certain
              personal information with them to deliver the Service to you.
            </li>
            <li>
              Professional advisors: Professional advisors such as lawyers,
              auditors, bankers, and insurers, as necessary for the professional
              services they provide to us.
            </li>
            <li>
              Authorities and others: Law enforcement, government authorities,
              and private parties, when we believe in good faith that it is
              necessary or appropriate for compliance and protection purposes as
              described above.
            </li>
            <li>
              Third-party data sharing excludes text messaging opt-in: The above excludes text messaging originator opt-in data and consent. This information will not be shared with any third parties.
            </li>
            <li>
              Business transferees: Acquirers and other relevant participants in
              business transactions involving a corporate divestiture, merger,
              consolidation, acquisition, reorganization, sale, or other
              disposition of all or any portion of our business, assets, or
              equity interests (including bankruptcy or similar proceedings).
            </li>
          </ul>

          <h3 id="your-choices">4. Your Choices</h3>
          <ol className="list-decimal list-inside ml-[2rem]">
            <li>
              Access or update your information: If you have registered for an
              account with us through the Service, you can review and update
              certain account information by logging into your account.
            </li>
            <li>
              Opt-out of marketing communications: You have the option to
              opt-out of marketing-related emails by following the opt-out or
              unsubscribe instructions provided at the bottom of the email or by
              contacting us directly. However, please note that even if you
              opt-out of marketing emails, you may still receive service-related
              and other non-marketing emails from us.
            </li>
            <li>
              Opt-out of marketing text messages: If you receive marketing text
              messages from us, you can opt-out of receiving further marketing
              text messages by replying STOP to our marketing message.
            </li>
            <li>
              Opt-in and agreement to receive text messages: By opting in and entering your phone number, you agree to receive text messages from us. These messages may include marketing communications, cart reminder messages, and other transactional or informational messages related to our services.
            </li>
            <li>
              Do Not Track: Our Service currently does not respond to "Do Not
              Track" signals or similar mechanisms that some internet browsers
              may send. For more information about "Do Not Track," you can visit{" "}
              <Link
                href="http://www.allaboutdnt.com"
                target="_blank"
                className="text-sky-600"
              >
                http://www.allaboutdnt.com
              </Link>
              .
            </li>
            <li>
              Declining to provide information: Certain services may require the
              collection of specific personal information. If you choose not to
              provide the information that we identify as required or mandatory,
              we may not be able to provide you with those services.
            </li>
          </ol>

          <h3 id="other-sites-and-services">5. Other Sites and Services</h3>
          <p>
            The Service may include links to third-party websites, mobile
            applications, and other online services. Additionally, our content
            may be integrated into web pages or online services not associated
            with us. Please note that these links and integrations do not imply
            our endorsement or affiliation with those third parties. We do not
            control the operations of third-party websites, mobile applications,
            or online services, and we are not responsible for their actions. We
            encourage you to review the privacy policies of any other websites,
            mobile applications, or online services that you use.
          </p>

          <h3 id="security">6. Security</h3>
          <p>
            We employ technical, organizational, and physical measures to
            protect the personal information we collect. However, it's important
            to recognize that no system is entirely foolproof, and inherent
            security risks exist in internet and information technologies. While
            we strive to safeguard your personal information, we cannot
            guarantee its absolute security.
          </p>

          <h3 id="international-transfers">7. International Data Transfers</h3>
          <p>
            As our headquarters are located in the United States, your personal
            information may be transferred to the United States or other
            countries where privacy laws may not provide the same level of
            protection as those in your state, province, or country.
          </p>

          <h3 id="children">8. Children</h3>
          <p>
            The Service is intended for individuals who are 18 years of age or
            older. If you believe we have collected personal information from a
            child in violation of applicable law, please contact us. If we
            become aware that we have inadvertently collected personal
            information from a child without appropriate parental or guardian
            consent, we will take steps to delete the information in accordance
            with applicable laws.
          </p>

          <h3 id="changes-to-this-privacy-policy">
            9. Changes to This Privacy Policy
          </h3>
          <p>
            We reserve the right to modify this Privacy Policy at any time. If
            there are material changes, we will notify you by updating the date
            of the Privacy Policy and posting it on the Service or using other
            appropriate means. Your continued use of the Service after the
            effective date of any modified Privacy Policy signifies your
            acceptance of the changes.
          </p>

          <h3 id="contact-us">10. How To Contact Us</h3>
          <p>
            If you have any questions, concerns, or requests regarding this
            Privacy Policy, you can reach us through the following:
          </p>

          <h3>Email: <a href="mailto:support@sponsorless.com">support@sponsorless.com</a> </h3>
          <h3>Mail: 32 East Utah Ave Payson, UT 84651</h3>
        </div>
      </div>

      <Footer />
    </main>
  );
}
