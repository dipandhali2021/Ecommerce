
import { useEffect, useState } from "react";
import { BsArrowUpCircle } from "react-icons/bs";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="subscribe">
        <h1>ByteBazaar</h1>
        <h3>Subscribe</h3>
        <p>Get 10% off your first order</p>
        
      </div>
      <div className="subscribe">
        <h2>Support</h2>
        <p> 512/14, 5 Th Floor, Raheja Chamber, Nariman Point</p>
        <p>exclusive@bytebazaar.com</p>
        <p> +02222881098</p>
      </div>
      <div className="subscribe">
        <h2>Account</h2>
        <Link to="/my-account">My Account</Link>
        <Link to="/login">Login/Register</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/wishlist">Whislist</Link>
        <Link to="/search">Shop</Link>
      </div>
      <div className="subscribe">
        <h2>Quick Link</h2>
        <Link to="/privacy-policy">Privacy Policy</Link>
        <Link to="/terms-of-use">Terms Of Use</Link>
        <Link to="/faq">FAQ</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <div className="subscribe">
        <h2>Download App</h2>
        <p>Save $3 with App New User Only</p>
        <div className="download-app">
          <div className="qr">
            <img src="../src/assets/qr.png" alt="qr" />
          </div>
          <div className="link">
            <div className="play-store">
              <img src="../src/assets/play.png" alt="qr" />
            </div>
            <div className="app-store">
              <img src="../src/assets/app.png" alt="qr" />
            </div>
          </div>
        </div>
        <div className="social-icons">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF />
          </a>
        </div>
      </div>
      <ScrollToTopButton />
    </footer>
  );
};

export default Footer;

export const PrivacyPolicy = () => {
  return (
    <div className="privacy">
      <h1>Privacy Policy of Dipan</h1>

      <p>
        Dipan operates the bytebazaar.com website, which provides the SERVICE.
      </p>

      <p>
        This page is used to inform website visitors regarding our policies with
        the collection, use, and disclosure of Personal Information if anyone
        decided to use our Service, the ByteBazaar website.
      </p>

      <p>
        If you choose to use our Service, then you agree to the collection and
        use of information in relation with this policy. The Personal
        Information that we collect are used for providing and improving the
        Service. We will not use or share your information with anyone except as
        described in this Privacy Policy.
      </p>

      <p>
        The terms used in this Privacy Policy have the same meanings as in our
        Terms and Conditions, which is accessible at bytebazaar.com, unless
        otherwise defined in this Privacy Policy.
      </p>

      <h2>Information Collection and Use</h2>

      <p>
        For a better experience while using our Service, we may require you to
        provide us with certain personally identifiable information, including
        but not limited to your name, phone number, and postal address. The
        information that we collect will be used to contact or identify you.
      </p>

      <h2>Log Data</h2>

      <p>
        We want to inform you that whenever you visit our Service, we collect
        information that your browser sends to us that is called Log Data. This
        Log Data may include information such as your computer's Internet
        Protocol ("IP") address, browser version, pages of our Service that you
        visit, the time and date of your visit, the time spent on those pages,
        and other statistics.
      </p>

      <h2>Cookies</h2>

      <p>
        Cookies are files with small amount of data that is commonly used an
        anonymous unique identifier. These are sent to your browser from the
        website that you visit and are stored on your computer's hard drive.
      </p>

      <p>
        Our website uses these "cookies" to collection information and to
        improve our Service. You have the option to either accept or refuse
        these cookies, and know when a cookie is being sent to your computer. If
        you choose to refuse our cookies, you may not be able to use some
        portions of our Service.
      </p>

      <h2>Service Providers</h2>

      <p>
        We may employ third-party companies and individuals due to the following
        reasons:
      </p>

      <ul>
        <li>To facilitate our Service;</li>
        <li>To provide the Service on our behalf;</li>
        <li>To perform Service-related services; or</li>
        <li>To assist us in analyzing how our Service is used.</li>
      </ul>

      <p>
        We want to inform our Service users that these third parties have access
        to your Personal Information. The reason is to perform the tasks
        assigned to them on our behalf. However, they are obligated not to
        disclose or use the information for any other purpose.
      </p>

      <h2>Security</h2>

      <p>
        We value your trust in providing us your Personal Information, thus we
        are striving to use commercially acceptable means of protecting it. But
        remember that no method of transmission over the internet, or method of
        electronic storage is 100% secure and reliable, and we cannot guarantee
        its absolute security.
      </p>

      <h2>Links to Other Sites</h2>

      <p>
        Our Service may contain links to other sites. If you click on a
        third-party link, you will be directed to that site. Note that these
        external sites are not operated by us. Therefore, we strongly advise you
        to review the Privacy Policy of these websites. We have no control over,
        and assume no responsibility for the content, privacy policies, or
        practices of any third-party sites or services.
      </p>

      <p>Children's Privacy</p>

      <p>
        Our Services do not address anyone under the age of 13. We do not
        knowingly collect personal identifiable information from children under
        13. In the case we discover that a child under 13 has provided us with
        personal information, we immediately delete this from our servers. If
        you are a parent or guardian and you are aware that your child has
        provided us with personal information, please contact us so that we will
        be able to do necessary actions.
      </p>

      <h2>Changes to This Privacy Policy</h2>

      <p>
        We may update our Privacy Policy from time to time. Thus, we advise you
        to review this page periodically for any changes. We will notify you of
        any changes by posting the new Privacy Policy on this page. These
        changes are effective immediately, after they are posted on this page.
      </p>

      <p>
        Our Privacy Policy was created with the help of the{" "}
        <a href="https://www.privacypolicytemplate.net">
          Privacy Policy Template
        </a>
        .
      </p>

      <h2>Contact Us</h2>

      <p>
        If you have any questions or suggestions about our Privacy Policy, do
        not hesitate to contact us.
      </p>
    </div>
  );
};

export const TermsOfUse = () => {
  return (
    <section className="privacy">
      <h1>TERMS OF USE</h1>
      <p>Last updated January 26, 2024</p>
      <h2>AGREEMENT TO OUR LEGAL TERMS</h2>
      <p>
        We are ByteBazaar Company. a company registered in India at H4, IITDMJ,
        Jabalpur, Madhya Pradesh 482005.
      </p>
      <p>
        We operate the website bytebazaar com (the &quot;Site&quot;), as well as
        any other related products and services that refer or link to these
        legal terms (the &quot;Legal Terms&quot;) (collectively, the
        &quot;Services&quot;).
      </p>
      <p>
        We provide seller to sell their electronic product online You can
        contact us by phone at 7742002899, email at dipandhali2021@gmail.com, or
        by mail to H4, IITDMJ, Jabalpur, Madhya Pradesh 482005, India.
      </p>
      <p>
        These Legal Terms constitute a legally binding agreement made between
        you, whether personally or on behalf of an entity (&quot;you&quot;), and
        ByteBazaar, concerning your access to and use of the Services. You agree
        that by accessing the Services, you have read, understood, and agreed to
        be bound by all of these Legal Terms. IF YOU DO NOT AGREE WITH ALL OF
        THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE
        SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.
      </p>
      <p>
        We will provide you with prior notice of any scheduled changes to the
        Services you are using. The modified Legal Terms will become effective
        upon posting or notifying you by info@Bytebazaar com, as stated in the
        email message. By continuing to use the Services after the effective
        date of any changes, you agree to be bound by the modified terms.
      </p>
      <p>
        All users who are minors in the jurisdiction in which they reside
        (generally under the age of 18) must have the permission of, and be
        directly supervised by, their parent or guardian to use the Services. If
        you are a minor, you must have your parent or guardian read and agree to
        these Legal Terms prior to you using the Services.
      </p>
      <p>
        We recommend that you print a copy of these Legal Terms for your
        records.
      </p>
      <h2>TABLE OF CONTENTS</h2>
      <ol>
        <li>
          <a href="#services">OUR SERVICES</a>
        </li>
        <li>
          <a href="#intellectual-property">INTELLECTUAL PROPERTY RIGHTS</a>
        </li>
        <li>
          <a href="#user-representations">USER REPRESENTATIONS</a>
        </li>
        <li>
          <a href="#user-registration">USER REGISTRATION</a>
        </li>
        <li>
          <a href="#products">PRODUCTS</a>
        </li>
        <li>
          <a href="#purchases-payment">PURCHASES AND PAYMENT</a>
        </li>
        <li>
          <a href="#return-policy">RETURN POLICY</a>
        </li>
        <li>
          <a href="#prohibited-activities">PROHIBITED ACTIVITIES</a>
        </li>
        <li>
          <a href="#user-generated-contributions">
            USER GENERATED CONTRIBUTIONS
          </a>
        </li>
        <li>
          <a href="#contribution-license">CONTRIBUTION LICENSE</a>
        </li>
        <li>
          <a href="#guidelines-reviews">GUIDELINES FOR REVIEWS</a>
        </li>
        <li>
          <a href="#social-media">SOCIAL MEDIA</a>
        </li>
        <li>
          <a href="#services-management">SERVICES MANAGEMENT</a>
        </li>
        <li>
          <a href="#privacy-policy">PRIVACY POLICY</a>
        </li>
        <li>
          <a href="#term-termination">TERM AND TERMINATION</a>
        </li>
        <li>
          <a href="#modifications-interruptions">
            MODIFICATIONS AND INTERRUPTIONS
          </a>
        </li>
        <li>
          <a href="#governing-law">GOVERNING LAW</a>
        </li>
        <li>
          <a href="#dispute-resolution">DISPUTE RESOLUTION</a>
        </li>
        <li>
          <a href="#corrections">CORRECTIONS</a>
        </li>
        <li>
          <a href="#disclaimer">DISCLAIMER</a>
        </li>
        <li>
          <a href="#limitations-of-liability">LIMITATIONS OF LIABILITY</a>
        </li>
        <li>
          <a href="#indemnification">INDEMNIFICATION</a>
        </li>
        <li>
          <a href="#user-data">USER DATA</a>
        </li>
        <li>
          <a href="#electronic-communications">
            ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES
          </a>
        </li>
        <li>
          <a href="#miscellaneous">MISCELLANEOUS</a>
        </li>
        <li>
          <a href="#contact-us">CONTACT US</a>
        </li>
      </ol>

      <h2 id="services">1. OUR SERVICES</h2>

      <p>
        The information provided when using the Services is not intended for
        distribution to or use by any person or entity in any jurisdiction or
        country where such distribution or use would be contrary to law or
        regulation or which would subject us to any registration requirement
        within such jurisdiction or country. Accordingly, those persons who
        choose to access the Services from other locations do so on their own
        initiative and are solely responsible for compliance with local laws, if
        and to the extent local laws are applicable.
      </p>

      <h2 id="intellectual-property">2. INTELLECTUAL PROPERTY RIGHTS</h2>

      <h4>Our intellectual property</h4>
      <p>
        We are the owner or the licensee of all intellectual property rights in
        our Services, including all source code, databases, functionality,
        software, website designs, audio, video, text, photographs, and graphics
        in the Services (collectively, the &quot;Content&quot;), as well as the
        trademarks, service marks, and logos contained therein (the
        &quot;Marks&quot;).
      </p>
      <p>
        Our Content and Marks are protected by copyright and trademark laws (and
        various other intellectual property rights and unfair competition laws)
        and treaties in the United States and around the world.
      </p>
      <p>
        The Content and Marks are provided in or through the Services &quot;AS
        IS&quot; for your personal, non-commercial use or internal business
        purpose only.
      </p>
      <h4>Your use of our Services</h4>
      <p>
        Subject to your compliance with these Legal Terms, including the
        &quot;PROHIBITED ACTIVITIES&quot; section below, we grant you a
        non-exclusive, non-transferable, revocable license to:
      </p>
      <ol>
        <li>access the Services; and</li>
        <li>
          download or print a copy of any portion of the Content to which you
          have properly gained access.
        </li>
      </ol>
      <p>
        solely for your personal, non-commercial use or internal business
        purpose.
      </p>
      <p>
        Except as set out in this section or elsewhere in our Legal Terms, no
        part of the Services and no Content or Marks may be copied, reproduced,
        aggregated, republished, uploaded, posted, publicly displayed, encoded,
        translated, transmitted, distributed, sold, licensed, or otherwise
        exploited for any commercial purpose whatsoever, without our express
        prior written permission.
      </p>
      <p>
        If you wish to make any use of the Services, Content, or Marks other
        than as set out in this section or elsewhere in our Legal Terms, please
        address your request to: dipandnali2021@gmail com. If we ever grant you
        the permission to post, reproduce, or publicly display any part of our
        Services or Content, you must identify us as the owners or licensors of
        the Services, Content, or Marks and ensure that any copyright or
        proprietary notice appears or is visible on posting, reproducing, or
        displaying our Content.
      </p>
      <p>
        We reserve all rights not expressly granted to you in and to the
        Services, Content, and Marks. Any breach of these Intellectual Property
        Rights will constitute a material breach of our Legal Terms and your
        right to use our Services will terminate immediately.
      </p>
      <h4>Your submissions and contributions</h4>
      <p>
        Please review this section and the &quot;PROHIBITED ACTIVITIES&quot;
        section carefully prior to using our Services to understand the (a)
        rights you give us and (b) obligations you have when you post or upload
        any content through the Services.
      </p>
      <p>
        <strong>Submissions:</strong> By directly sending us any question,
        comment, suggestion, idea, feedback, or other information about the
        Services (&quot;Submissions&quot;), you agree to assign to us all
        intellectual property rights in such Submission. You agree that we shall
        own this Submission and be entitled to its unrestricted use and
        dissemination for any lawful purpose, commercial or otherwise, without
        acknowledgment or compensation to you.
      </p>
      <p>
        <strong> Contributions:</strong> The Services may invite you to chat,
        contribute to, or participate in blogs, message boards, online forums,
        and other functionality during which you may create, submit, post,
        display, transmit, publish, distribute, or broadcast content and
        materials to us or through the Services, including but not limited to
        text, writings, video, audio, photographs, music, graphics, comments,
        reviews, rating suggestions, personal information, or other material
        (&quot;Contributions&quot;). Any Submission that is publicly posted
        shall also be treated as a Contribution.
      </p>
      <p>
        You understand that Contributions may be viewable by other users of the
        Services.
      </p>
      <p>
        <strong>
          When you post Contributions, you grant us a license (including use of
          your name, trademarks, and logos):
        </strong>{" "}
        By posting any Contributions, you grant us an unrestricted, unlimited,
        irrevocable, perpetual, non-exclusive, transferable, royalty-free,
        fully-paid, worldwide right, and license to: use, copy, reproduce,
        distribute, sell, resell, publish, broadcast, retitle, store, publicly
        perform, publicly display, reformat, translate, excerpt (in whole or in
        part), and exploit your Contributions (including, without imitation,
        your image, name, and voice) for any purpose, commercial, advertising,
        or otherwise, to prepare derivative works of, or incorporate into other
        works, your Contributions, and to sublicense the licenses granted in
        this section. Our use and distribution may occur in any media formats
        and through any media channels.
      </p>
      <p>
        This license includes our use of your name, company name, and franchise
        name, as applicable, and any of the trademarks, service marks, trade
        names, logos, and personal and commercial images you provide.
      </p>
      <p>
        <strong>You are responsible for what you post or upload:</strong> By
        sending us Submissions and/or posting Contributions through any part of
        the Services or making Contributions accessible through the Services by
        linking your account through the Services to any of your social
        networking accounts, you:
      </p>
      <ul>
        <li>
          confirm that you have read and agree with our &quot;PROHIBITED
          ACTIVITIES&quot; and will not post, send, publish, upload, or transmit
          through the Services any Submission nor post any Contribution that is
          illegal, harassing, hateful, harmful, defamatory, obscene, bullying,
          abusive, discriminatory, threatening to any person or group, sexually
          explicit, false, inaccurate, deceitful, or misleading;
        </li>
        <li>
          to the extent permissible by applicable law, waive any and all moral
          rights to any such Submission and/or Contribution;
        </li>
        <li>
          warrant that any such Submission and/or Contributions are original to
          you or that you have the necessary rights and licenses to submit such
          Submissions and/or Contributions and that you have full authority to
          grant us the above-mentioned rights in relation to your Submissions
          and/or Contributions; and
        </li>
        <li>
          warrant and represent that your Submissions and/or Contributions do
          not constitute confidential information.
        </li>
      </ul>
      <p>
        You are solely responsible for your Submissions and/or Contributions and
        you expressly agree to reimburse us for any and all losses that we may
        suffer because of your breach of (a) this section, (b) any third
        party&#39;s intellectual property rights, or (c) applicable law.
      </p>
      <p>
        <strong>We may remove or edit your Content:</strong> Although we have no
        obligation to monitor any Contributions, we shall have the right to
        remove or edit any Contributions at any time without notice if in our
        reasonable opinion we consider such Contributions harmful or in breach
        of these Legal Terms. If we remove or edit any such Contributions, we
        may also suspend or disable your account and report you to the
        authorities.
      </p>

      <h2 id="user-representations">3. USER REPRESENTATIONS</h2>

      <p>
        By using the Services, you represent and warrant that: (1) all
        registration information you submit will be true, accurate, current, and
        complete; (2) you will maintain the accuracy of such information and
        promptly update such registration information as necessary; (3) you have
        the legal capacity and you agree to comply with these Legal Terms; (4)
        you are not a minor in the Jurisdiction in which you reside, or if a
        minor, you have received parental permission to use the Services; (5)
        you will not access the Services through automated or non-human means,
        whether through a bot, script or otherwise; (6) you will not use the
        Services for any illegal or unauthorized purpose; and (7) your use of
        the Services will not violate any applicable law or regulation.
      </p>
      <p>
        If you provide any information that is untrue, inaccurate, not current,
        or incomplete, we have the right to suspend or terminate your account
        and refuse any and all current or future use of the Services (or any
        portion thereof).
      </p>
      <h2 id="user-registration">4. USER REGISTRATION</h2>

      <p>
        You may be required to register to use the Services. You agree to keep
        your password confidential and will be responsible for all use of your
        account and password. We reserve the right to remove, reclaim, or change
        a username you select if we determine, in our sole discretion, that such
        username is inappropriate, obscene, or otherwise objectionable.
      </p>
      <h2 id="products">5. PRODUCTS</h2>

      <p>
        We make every effort to display as accurately as possible the colors,
        features, specifications, and details of the products available on the
        Services. However, we do not guarantee that the colors, features,
        specifications, and details of the products will be accurate, complete,
        reliable, current, or free of other errors, and your electronic display
        may not accurately reflect the actual colors and details of the
        products. All products are subject to availability, and we cannot
        guarantee that items will be in stock. We reserve the right to
        discontinue any products at any time for any reason. Prices for all
        products are subject to change.
      </p>
      <h2 id="purchases-payment">6. PURCHASES AND PAYMENT</h2>

      <p>We accept the following forms of payment:</p>
      <ul>
        <li>Visa,</li>
        <li>Mastercard,</li>
        <li>American Express.</li>
      </ul>
      <p>
        You agree to provide current, complete, and accurate purchase and
        account information for all purchases made via the Services. You further
        agree to promptly update account and payment information, including
        email address, payment method, and payment card expiration date, so that
        we can complete your transactions and contact you as needed. Sales tax
        will be added to the price of purchases as deemed required by us. We may
        change prices at any time. All payments shall be in Indian Rupees (INR).
      </p>
      <p>
        You agree to pay all charges at the prices then in effect for your
        purchases and any applicable shipping fees, and you authorize us to
        charge your chosen payment provider for any such amounts upon placing
        your order. If your order is subject to recurring charges, then you
        consent to our charging your payment method on a recurring basis without
        requiring your prior approval for each recurring charge, until such time
        as you cancel the applicable order. We reserve the right to correct any
        errors or mistakes in pricing, even if we have already requested or
        received payment.
      </p>
      <p>
        We reserve the right to refuse any order placed through the Services. We
        may, in our sole discretion, limit or cancel quantities purchased per
        person, per household, or per order. These restrictions may include
        orders placed by or under the same customer account, the same payment
        method, and/or orders that use the same billing or shipping address. We
        reserve the right to limit or prohibit orders that, in our sole
        judgment, appear to be placed by dealers, resellers, or distributors.
      </p>
      <h2 id="return-policy">7. RETURN POLICY</h2>

      <p>
        Please review our Return Policy posted on the Services prior to making
        any purchases.
      </p>
      <h2 id="prohibited-activities">8. PROHIBITED ACTIVITIES</h2>

      <p>
        You may not access or use the Services for any purpose other than that
        for which we make the Services available. The Services may not be used
        in connection with any commercial endeavors except those that are
        specifically endorsed or approved by us.
      </p>
      <p>As a user of the Services, you agree not to:</p>
      <ul>
        <li>
          Systematically retrieve data or other content from the Services to
          create or compile, directly or indirectly, a collection, compilation,
          database, or directory without written permission from us.
        </li>
        <li>
          Trick, defraud, or mislead us and other users, especially in any
          attempt to obtain sensitive account information such as user
          passwords.
        </li>
        <li>
          Circumvent, disable, or otherwise interfere with security-related
          features of the Services, including features that prevent or restrict
          the use or copying of any Content or enforce limitations on the use of
          the Services and/or the Content contained therein.
        </li>
        <li>
          Disparage, tarnish, or otherwise harm, in our opinion, us and/or the
          Services.
        </li>
        <li>
          Use any information obtained from the Services in order to harass,
          abuse, or harm another person.
        </li>
        <li>
          Make improper use of our support services or submit false reports of
          abuse or misconduct.
        </li>
        <li>
          Use the Services in a manner inconsistent with any applicable laws or
          regulations.
        </li>
        <li>Engage in unauthorized framing of or linking to the Services.</li>
        <li>
          Upload or transmit (or attempt to upload or transmit) viruses, Trojan
          horses, or other material, including excessive use of capital letters
          and spamming (continuous posting of repetitive text), that interferes
          with any party&#39;s uninterrupted use and enjoyment of the Services
          or modifies, impairs, disrupts, alters, or interferes with the use,
          features, functions, operation, or maintenance of the Services.
        </li>
        <li>
          Engage in any automated use of the system, such as using scripts to
          send comments or messages, or using any data mining, robots, or
          similar data gathering and extraction tools.
        </li>
        <li>
          Delete the copyright or other proprietary rights notice from any
          Content.
        </li>
        <li>
          Attempt to impersonate another user or person or use the username of
          another user.
        </li>
        <li>
          <p>
            Upload or transmit (or attempt to upload or transmit) any material
            that acts as a passive or active information collection or
            transmission mechanism, including without limitation, clear graphics
            interchange formats (&quot;gifs&quot;), 1x1 pixels, web bugs,
            cookies, or other similar devices (sometimes referred to as
            &quot;spyware&quot; or âpassive collection mechanisms&quot; or
            &quot;pems&quot;).
          </p>
        </li>
        <li>
          <p>
            Interfere with, disrupt, or create an undue burden on the Services
            or the networks or services connected to the Services.
          </p>
        </li>
        <li>
          Harass, annoy, intimidate, or threaten any of our employees or agents
          engaged in providing any portion of the Services to you
        </li>
        <li>
          Attempt to bypass any measures of the Services designed to prevent or
          restrict access to the Services, or any portion of the Services.
        </li>
        <li>
          Copy or adapt the Services&#39; software, including but not limited to
          Flash, PHP, HTML, JavaScript, or other code.
        </li>
        <li>
          Except as permitted by applicable law, decipher, decompile,
          disassemble, or reverse engineer any of the software comprising or in
          any way making up a part of the Services.
        </li>
        <li>
          Except as may be the result of standard search engine or Internet
          browser usage, use, launch, develop, or distribute any automated
          system, including without imitation, any spider, robot, cheat utility.
          scraper, or offline reader that accesses the Services, or use or
          launch any unauthorized script or other software.
        </li>
        <li>
          Use a buying agent or purchasing agent to make purchases on the
          Services
        </li>
        <li>
          Make any unauthorized use of the Services, including collecting
          usernames and/or email addresses of users by electronic or other means
          for the purpose of sending unsolicited email, or creating user
          accounts by automated means or under false pretenses.
        </li>
        <li>
          Use the Services as part of any effort to compete with us or otherwise
          use the Services and/or the Content for any revenue-generating
          endeavor or commercial enterprise.
        </li>
        <li>
          <p>
            Use the Services to advertise or offer to sell goods and services.
          </p>
        </li>
      </ul>
      <h2 id="user-generated-contributions">9. USER GENERATED CONTRIBUTIONS</h2>
      <p>
        The Services may invite you to chat, contribute to, or participate in
        blogs, message boards, online forums, and other functionality, and may
        provide you with the opportunity to create, submit, post, display,
        transmit, perform, publish, distribute, or broadcast content and
        materials to us or on the Services, including but not limited to text,
        writings, video, audio, photographs, graphics, comments, suggestions, or
        personal information or other material (collectively,
        &quot;Contributions&quot;). Contributions may be viewable by other users
        of the Services and through third-party websites. As such, any
        Contributions you transmit may be treated as non-confidential and
        non-proprietary. When you create or make available any Contributions,
        you thereby represent and warrant that
      </p>
      <ul>
        <li>
          The creation, distribution, transmission, public display, or
          performance, and the accessing, downloading, or copying of your
          Contributions do not and will not infringe the proprietary rights,
          including but not limited to the copyright, patent, trademark, trade
          secret, or moral rights of any third party.
        </li>
        <li>
          You are the creator and owner of or have the necessary licenses,
          rights, consents, releases, and permissions to use and to authorize
          us, the Services, and other users of the Services to use your
          Contributions in any manner contemplated by the Services and these
          Legal Terms.
        </li>
        <li>
          You have the written consent, release, and/or permission of each and
          every identifiable individual person in your Contributions to use the
          name or likeness of each and every such identifiable individual person
          to enable inclusion and use of your Contributions in any manner
          contemplated by the Services and these Legal Terms.
        </li>
        <li>Your Contributions are not false, inaccurate, or misleading</li>
        <li>
          Your Contributions are not unsolicited or unauthorized advertising,
          promotional materials, pyramid schemes, chain letters, spam, mass
          mailings, or other forms of solicitation.
        </li>
        <li>
          Your Contributions are not obscene, lewd, lascivious, filthy, violent,
          harassing, libelous, slanderous, or otherwise objectionable (as
          determined by us)
        </li>
        <li>
          Your Contributions do not ridicule, mock, disparage, intimidate, or
          abuse anyone.
        </li>
        <li>
          Your Contributions are not used to harass or threaten (in the legal
          sense of those terms) any other person and to promote violence against
          a specific person or class of people.
        </li>
        <li>
          Your Contributions do not violate any applicable law, regulation, or
          rule.
        </li>
        <li>
          Your Contributions do not violate the privacy or publicity rights of
          any third party.
        </li>
        <li>
          Your Contributions do not violate any applicable law concerning child
          pornography. or otherwise intended to protect the health or well-being
          of minors.
        </li>
        <li>
          Your Contributions do not include any offensive comments that are
          connected to race, national origin, gender, sexual preference, or
          physical handicap.
        </li>
        <li>
          Your Contributions do not otherwise violate, or link to material that
          violates, any provision of these Legal Terms, or any applicable law or
          regulation
        </li>
      </ul>
      <p>
        Any use of the Services in violation of the foregoing violates these
        Legal Terms and may result in, among other things, termination or
        suspension of your rights to use the Services
      </p>
      <h2 id="contribution-license">10. CONTRIBUTION LICENSE</h2>

      <p>
        By posting your Contributions to any part of the Services or making
        Contributions accessible to the Services by linking your account from
        the Services to any of your social networking accounts, you
        automatically grant, and you represent and warrant that you have the
        right to grant, to us an unrestricted, unlimited, irrevocable,
        perpetual, non-exclusive, transferable, royalty-free, fully-paid,
        worldwide right, and license to host, use, copy, reproduce, disclose,
        sell resell, publish, broadcast, retitle, archive, store, cache,
        publicly perform, publicly display, reformat, translate, transmit,
        excerpt (in whole or in part), and distribute such Contributions
        (including, without limitation, your image and voice) for any purpose,
        commercial, advertising, or otherwise, and to prepare derivative works
        of, or incorporate into other works, such Contributions, and grant and
        authorize sublicenses of the foregoing. The use and distribution may
        occur in any media formats and through any media channels. This license
        will apply to any form, media, or technology now known or hereafter
        developed, and includes our use of your name, company name, and
        franchise name, as applicable, and any of the trademarks, service marks,
        trade names, logos, and personal and commercial images you provide. You
        waive all moral rights in your Contributions, and you warrant that moral
        rights have not otherwise been asserted in your Contributions. We do not
        assert any ownership over your Contributions. You retain full ownership
        of all of your Contributions and any intellectual property rights or
        other proprietary rights associated with your Contributions. We are not
        liable for any statements or representations in your Contributions
        provided by you in any area on the Services. You are solely responsible
        for your Contributions to the Services and you expressly agree to
        exonerate us from any and all responsibility and to refrain from any
        legal action against us regarding your Contributions. We have the right,
        in our sole and absolute discretion, (1) to edit, redact, or otherwise
        change any Contributions; (2) to re-categorize any Contributions to
        place them in more appropriate locations on the Services; and (3) to
        pre-screen or delete any Contributions at any time and for any reason,
        without notice. We have no obligation to monitor your Contributions.
      </p>
      <h2 id="guidelines-reviews">11. GUIDELINES FOR REVIEWS</h2>

      <p>
        We may provide you areas on the Services to leave reviews or ratings.
        When posting a review, you must comply with the following criteria: (1)
        you should have firsthand experience with the person/entity being
        reviewed: (2) your reviews should not contain offensive profanity, or
        abusive, racist, offensive, or hateful language: (3) your reviews should
        not contain discriminatory references based on religion, race, gender,
        national origin, age, marital status, sexual orientation, or disability:
        (4) your reviews should not contain references to illegal activity; (5)
        you should not be affiliated with competitors f posting negative
        reviews; (6) you should not make any conclusions as to the legality of
        conduct; (7) you may not post any false or misleading statements and (8)
        you may not organize a campaign encouraging others to post reviews,
        whether positive or negative. We may accept, reject, or remove reviews
        in our sole discretion. We have absolutely no obligation to screen
        reviews or to delete reviews, even if anyone considers reviews
        objectionable or inaccurate. Reviews are not endorsed by us, and do not
        necessarily represent our opinions or the views of any of our affiliates
        or partners. We do not assume liability for any review or for any
        claims, liabilities, or losses resulting from any review. By posting a
        review, you hereby grant to us a perpetual, non-exclusive, worldwide,
        royalty-free, fully paid, assignable, and sublicensable right and
        license to reproduce, modify, translate, transmit by any means, display,
        perform, andor distribute all content relating to review.
      </p>
      <h2 id="social-media">12. SOCIAL MEDIA</h2>

      <p>
        As part of the functionality of the Services, you may link your account
        with online accounts you have with third-party service providers (each
        such account, a &quot;Third-Party Account&quot;) by either (1) providing
        your Third-Party Account login information through the Services; or (2)
        allowing us to access your Third-Party Account, as is permitted under
        the applicable terms and conditions that govern your use of each
        Third-Party Account. You represent and warrant that you are entitled to
        disclose your Third-Party Account login information to us and/or grant
        us access to your Third-Party Account, without breach by you of any of
        the terms and conditions that govern your use of the applicable
        Third-Party Account, and without obligating us to pay any fees or making
        us subject to any usage limitations imposed by the third-party service
        provider of the Third-Party Account. By granting us access to any
        Third-Party Accounts, you understand that (1) we may access, make
        available, and store (if applicable) any content that you have provided
        to and stored in your Third-Party Account (the &quot;Social Network
        Content&quot;) so that it is available on and through the Services via
        your account, including without limitation any friend lists; and (2) we
        may submit to and receive from your Third-Party Account additional
        information to the extent you are notified when you link your account
        with the Third-Party Account. Depending on the Third-Party Accounts you
        choose and subject to the privacy settings that you have set in such
        Third-Party Accounts, personally identifiable information that you post
        to your Third-Party Accounts may be available on and through your
        account on the Services. Please note that if a Third-Party Account or
        associated service becomes unavailable or our access to such Third-Party
        Account is terminated by the third-party service provider, then Social
        Network Content may no longer be available on and through the Services.
        You will have the ability to disable the connection between your account
        on the Services and your Third-Party Accounts at any time. PLEASE NOTE
        THAT YOUR RELATIONSHIP WITH THE THIRD-PARTY SERVICE PROVIDERS ASSOCIATED
        WITH YOUR THIRD-PARTY ACCOUNTS IS GOVERNED SOLELY BY YOUR AGREEMENT(S)
        WITH SUCH THIRD-PARTY SERVICE PROVIDERS. We make no effort to review any
        Social Network Content for any purpose, including but not limited to,
        for accuracy, legality, or non-infringement, and we are not responsible
        for any Social Network Content. You acknowledge and agree that we may
        access your email address book associated with a Third-Party Account and
        your contacts list stored on your mobile device or tablet computer
        solely for purposes of identifying and informing you of those contacts
        who have also registered to use the Services. You can deactivate the
        connection between the Services and your Third-Party Account by
        contacting us using the contact information below or through your
        account settings (if applicable). We will attempt to delete any
        information stored on our servers that was obtained through such
        Third-Party Account, except the username and profile picture that become
        associated with your account.
      </p>
      <h2 id="services-management">13. SERVICES MANAGEMENT</h2>

      <p>
        We reserve the right, but not the obligation, to: (1) monitor the
        Services for violations of these Legal Terms; (2) take appropriate legal
        action against anyone who, in our sole discretion, violates the law or
        these Legal Terms, including without limitation, reporting such user to
        law enforcement authorities; (3) in our sole discretion and without
        limitation, refuse, restrict access to, limit the availability of, or
        disable (to the extent technologically feasible) any of your
        Contributions or any portion thereof; (4) in our sole discretion and
        without limitation, notice, or liability, to remove from the Services or
        otherwise disable all files and content that are excessive in size or
        are in any way burdensome to our systems; and (5) otherwise manage the
        Services in a manner designed to protect our rights and property and to
        facilitate the proper functioning of the Services.
      </p>
      <h2 id="privacy-policy">14. PRIVACY POLICY</h2>

      <p>
        We care about data privacy and security. Please review our Privacy
        Policy: bigbazaar/privacy-policy.com. By using the Services, you agree
        to be bound by our Privacy Policy, which is incorporated into these
        Legal Terms. Please be advised the Services are hosted in India. If you
        access the Services from any other region of the world with laws or
        other requirements governing personal data collection, use, or
        disclosure that differ from applicable laws in India, then through your
        continued use of the Services, you are transferring your data to India,
        and you expressly consent to have your data transferred to and processed
        in India.
      </p>
      <h2 id="term-termination">15. TERM AND TERMINATION</h2>

      <p>
        These Legal Terms shall remain in full force and effect while you use
        the Services. WITHOUT LIMITING ANY OTHER PROVISION OF THESE LEGAL TERMS,
        WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR
        LIABILITY, DENY ACCESS TO AND USE OF THE SERVICES (INCLUDING BLOCKING
        CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON,
        INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY,
        OR COVENANT CONTAINED IN THESE LEGAL TERMS OR OF ANY APPLICABLE LAW OR
        REGULATION. WE MAY TERMINATE YOUR USE OR PARTICIPATION IN THE SERVICES
        OR DELETE YOUR ACCOUNT AND ANY CONTENT OR INFORMATION THAT YOU POSTED AT
        ANY TIME, WITHOUT WARNING, IN OUR SOLE DISCRETION.
      </p>
      <p>
        If we terminate or suspend your account for any reason, you are
        prohibited from registering and creating a new account under your name,
        a fake or borrowed name, or the name of any third party, even if you may
        be acting on behalf of the third party. In addition to terminating or
        suspending your account, we reserve the right to take appropriate legal
        action, including without limitation pursuing civil, criminal, and
        injunctive redress.
      </p>
      <h2 id="modifications-interruptions">
        16. MODIFICATIONS AND INTERRUPTIONS
      </h2>

      <p>
        We reserve the right to change, modify, or remove the contents of the
        Services at any time or for any reason at our sole discretion without
        notice. However, we have no obligation to update any information on our
        Services. We also reserve the right to modify or discontinue all or part
        of the Services without notice at any time. We will not be liable to you
        or any third party for any modification, price change, suspension, or
        discontinuance of the Services.
      </p>
      <p>
        We cannot guarantee the Services will be available at all times. We may
        experience hardware, software, or other problems or need to perform
        maintenance related to the Services, resulting in interruptions, delays,
        or errors. We reserve the right to change, revise, update, suspend,
        discontinue, or otherwise modify the Services at any time or for any
        reason without notice to you. You agree that we have no liability
        whatsoever for any loss, damage, or inconvenience caused by your
        inability to access or use the Services during any downtime or
        discontinuance of the Services. Nothing in these Legal Terms will be
        construed to obligate us to maintain and support the Services or to
        supply any corrections, updates, or releases in connection therewith.
      </p>
      <h2 id="governing-law">17. GOVERNING LAW</h2>

      <p>
        These Legal Terms shall be governed by and defined following the laws of
        India. BigBazaar and yourself irrevocably consent that the courts of
        India shall have exclusive jurisdiction to resolve any dispute which may
        arise in connection with these Legal Terms.
      </p>
      <h2 id="dispute-resolution">18. DISPUTE RESOLUTION</h2>

      <p>
        You agree to irrevocably submit all disputes related to these Legal
        Terms or the legal relationship established by these Legal Terms to the
        jurisdiction of the India courts. BigBazaar shall also maintain the
        right to bring proceedings as to the substance of the matter in the
        courts of the country where you reside or, if these Legal Terms are
        entered into in the course of your trade or profession, the state of
        your principal place of business.
      </p>
      <h2 id="corrections">19. CORRECTIONS</h2>

      <p>
        There may be information on the Services that contains typographical
        errors, inaccuracies, or omissions, including descriptions, pricing,
        availability, and various other information. We reserve the right to
        correct any errors, inaccuracies, or omissions and to change or update
        the information on the Services at any time, without prior notice.
      </p>
      <h2 id="disclaimer">20. DISCLAIMER</h2>

      <p>
        THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE
        THAT YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST
        EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED,
        IN CONNECTION WITH THE SERVICES AND YOUR USE THEREOF, INCLUDING, WITHOUT
        LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
        PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE MAKE NO WARRANTIES OR
        REPRESENTATIONS ABOUT THE ACCURACY OR COMPLETENESS OF THE SERVICES&#39;
        CONTENT OR THE CONTENT OF ANY WEBSITES OR MOBILE APPLICATIONS LINKED TO
        THE SERVICES AND WE WILL ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY
        (1) ERRORS, MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS, (2)
        PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING
        FROM YOUR ACCESS TO AND USE OF THE SERVICES, (3) ANY UNAUTHORIZED ACCESS
        TO OR USE OF OUR SECURE SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION
        AND/OR FINANCIAL INFORMATION STORED THEREIN, (4) ANY INTERRUPTION OR
        CESSATION OF TRANSMISSION TO OR FROM THE SERVICES, (5) ANY BUGS,
        VIRUSES, TROJAN HORSES, OR THE LIKE WHICH MAY BE TRANSMITTED TO OR
        THROUGH THE SERVICES BY ANY THIRD PARTY, AND/OR (6) ANY ERRORS OR
        OMISSIONS IN ANY CONTENT AND MATERIALS OR FOR ANY LOSS OR DAMAGE OF ANY
        KIND INCURRED AS A RESULT OF THE USE OF ANY CONTENT POSTED, TRANSMITTED,
        OR OTHERWISE MADE AVAILABLE VIA THE SERVICES. WE DO NOT WARRANT,
        ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR ANY PRODUCT OR SERVICE
        ADVERTISED OR OFFERED BY A THIRD PARTY THROUGH THE SERVICES, ANY
        HYPERLINKED WEBSITE, OR ANY WEBSITE OR MOBILE APPLICATION FEATURED IN
        ANY BANNER OR OTHER ADVERTISING, AND WE WILL NOT BE A PARTY TO OR IN ANY
        WAY BE RESPONSIBLE FOR MONITORING ANY TRANSACTION BETWEEN YOU AND ANY
        THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES. AS WITH THE PURCHASE OF A
        PRODUCT OR SERVICE THROUGH ANY MEDIUM OR IN ANY ENVIRONMENT, YOU SHOULD
        USE YOUR BEST JUDGMENT AND EXERCISE CAUTION WHERE APPROPRIATE.
      </p>
      <h2 id="limitations-of-liability">21. LIMITATIONS OF LIABILITY</h2>

      <p>
        IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO
        YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL,
        EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST
        PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR
        USE OF THE SERVICES, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF
        SUCH DAMAGES.
      </p>
      <h2 id="indemnification">22. INDEMNIFICATION</h2>

      <p>
        You agree to defend, indemnify, and hold us harmless, including our
        subsidiaries, affiliates, and all of our respective officers, agents,
        partners, and employees, from and against any loss, damage, liability,
        claim, or demand, including reasonable attorneys&#39; fees and expenses,
        made by any third party due to or arising out of: (1) your
        Contributions: (2) use of the Services: (3) breach of these Legal Terms;
        (4) any breach of your representations and warranties set forth in these
        Legal Terms; (5) your violation of the rights of a third party,
        including but not limited to intellectual property rights: or (6) any
        overt harmful act toward any other user of the Services with whom you
        connected via the Services. Notwithstanding the foregoing, we reserve
        the right, at your expense, to assume the exclusive defense and control
        of any matter for which you are required to indemnify us, and you agree
        to cooperate, at your expense, with our defense of such claims. We will
        use reasonable efforts to notify you of any such claim, action, or
        proceeding which is subject to this indemnification upon becoming aware
        of it.
      </p>
      <h2 id="user-data">23. USER DATA</h2>

      <p>
        We will maintain certain data that you transmit to the Services for the
        purpose of managing the performance of the Services, as well as data
        relating to your use of the Services. Although we perform regular
        routine backups of data, you are solely responsible for all data that
        you transmit or that relates to any activity you have undertaken using
        the Services. You agree that we shall have no liability to you for any
        loss or corruption of any such data, and you hereby waive any right of
        action against us arising from any such loss or corruption of such data
      </p>
      <h2 id="electronic-communications">
        24. ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES
      </h2>

      <p>
        Visiting the Services, sending us emails, and completing online forms
        constitute electronic communications. You consent to receive electronic
        communications, and you agree that all agreements, notices, disclosures,
        and other communications we provide to you electronically, via email and
        on the Services, satisfy any legal requirement that such communication
        be in writing. YOU HEREBY AGREE TO THE USE OF ELECTRONIC SIGNATURES,
        CONTRACTS, ORDERS, AND OTHER RECORDS, AND TO ELECTRONIC DELIVERY OF
        NOTICES, POLICIES, AND RECORDS OF TRANSACTIONS INITIATED OR COMPLETED BY
        US OR VIA THE SERVICES. You hereby waive any rights or requirements
        under any statutes, regulations, rules, ordinances, or other laws in any
        jurisdiction which require an original signature or delivery or
        retention of non-electronic records, or to payments or the granting of
        credits by any means other than electronic means
      </p>
      <h2 id="miscellaneous">25. MISCELLANEOUS</h2>

      <p>
        These Legal Terms and any policies or operating rules posted by us on
        the Services or in respect to the Services constitute the entire
        agreement and understanding between you and us. Our failure to exercise
        or enforce any right or provision of these Legal Terms shall not operate
        as a waiver of such right or provision. These Legal Terms operate to the
        fullest extent permissible by law. We may assign any or all of our
        rights and obligations to others at any time. We shall not be
        responsible or liable for any loss, damage, delay, or failure to act
        caused by any cause beyond our reasonable control. If any provision or
        part of a provision of these Legal Terms is determined to be unlawful,
        void, or unenforceable, that provision or part of the provision is
        deemed severable from these Legal Terms and does not affect the validity
        and enforceability of any remaining provisions. There is no joint
        venture, partnership, employment or agency relationship created between
        you and us as a result of these Legal Terms or use of the Services. You
        agree that these Legal Terms will not be construed against us by virtue
        of having drafted them. You hereby waive any and all defenses you may
        have based on the electronic form of these Legal Terms and the lack of
        signing by the parties hereto to execute these Legal Terms.
      </p>
      <h2 id="contact-us">26. CONTACT US</h2>

      <p>
        In order to resolve a complaint regarding the Services of to receive
        further information regarding use of the Services, please contact us at:
      </p>
      <p>BigBazaar H4,II TOMY Jabalpur, Madhya Pradesh 482005 India</p>
      <p>Phone: 7742002899 dipandhali2021@gmail.com</p>
      <p>
        These terms of use were created using Termly&#39;s Terms and Conditions
        Generator.
      </p>
    </section>
  );
};

export const FAQ = () => {
  return (
    <section className="privacy">
      <h2>1. General Questions</h2>
      <p>
        <strong>What is the status of my order?</strong>
        <br></br>
        Once you have placed your order, we will send you a confirmation email
        to track the status of your order...
      </p>

      <p>
        <strong>Can I change my order?</strong>
        <br></br>
        We can only change orders that have not been processed for shipping
        yet...
      </p>

      <p>
        <strong>Where do you ship?</strong>
        <br></br>
        We currently ship in the United-States, Canada, Australia, France, the
        UK, and Germany...
      </p>

      <p>
        <strong>How long does it take to ship my order?</strong>
        <br></br>
        Once you've placed your order, it usually takes 24 to 48 hours to
        process it for delivery...
      </p>

      <h2>2. Payment</h2>
      <p>
        <strong>What payment methods do you accept?</strong>
        <br></br>
        You can purchase on our website using a debit or credit card...
      </p>

      <p>
        <strong>Which currency will I be charged in?</strong>
        <br></br>
        We currently only support the following currencies for charging our
        customers in their local currencies: USD, CAD, and EUR...
      </p>

      <p>
        <strong>Do you offer 3 or 4 times payment option?</strong>
        <br></br>
        We accept 3 times payment thank to our partner Affirm...
      </p>

      <h2>3. Shipping</h2>
      <p>
        <strong>Where do you ship?</strong>
        <br></br>
        We currently ship in the United-States, Canada, Australia, France, the
        UK, and Germany...
      </p>

      <p>
        <strong>How long does it take to ship my order?</strong>
        <br></br>
        Once you've placed your order, it usually takes 24 to 48 hours to
        process it for delivery...
      </p>

      <p>
        <strong>Do you offer fast shipping?</strong>
        <br></br>
        We offer fast shipping on a select number of countries...
      </p>

      <p>
        <strong>How can I track my package?</strong>
        <br></br>
        Once you have placed your order, we will send you a confirmation email
        to track the status of your order...
      </p>

      <p>
        <strong>What if I'm not home?</strong>
        <br></br>
        If you're not home, a new delivery will be performed the next day or the
        delivery partner will reach out to schedule a new delivery date...
      </p>

      <p>
        <strong>Will I pay taxes for international shipping?</strong>
        <br></br>
        Deliveries in Europe will have to pay custom taxes...
      </p>

      <h2>4. Returns</h2>
      <p>
        <strong>Do you accept returns?</strong>
        <br></br>
        We do accept returns in respect to the following conditions...
      </p>

      <p>
        <strong>Can I exchange an item?</strong>
        <br></br>
        We do accept exchanges and they follow the same conditions as returns...
      </p>

      <p>
        <strong>Are returns free?</strong>
        <br></br>
        Returns within the US are free. Returns from outside of the US are the
        responsibility of the buyer...
      </p>

      <p>
        <strong>How long does it take to process a return?</strong>
        <br></br>
        Returns are confirmed within 14 days of receiving the package at our
        warehouse...
      </p>

      <h2>5. Other Questions</h2>
      <p>
        <strong>Do you offer a referral program? How does it work?</strong>
        <br></br>
        We have created a referral program to thank our customers for referring
        their friends and family...
      </p>

      <p>
        <strong>Do you have physical stores?</strong>
        <br></br>
        We currently don't have any physical stores under our brand name...
      </p>

      <p>
        <strong>Is there a warranty?</strong>
        <br></br>
        We guarantee any of our product made by us and sold through our online
        store to be free of defect...
      </p>
    </section>
  );
};

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="scroll-to-top">
      {isVisible && (
        <div onClick={scrollToTop}>
          <BsArrowUpCircle />
        </div>
      )}
    </div>
  );
};
