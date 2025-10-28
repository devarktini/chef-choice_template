import AnimatedBackground from '@/components/AnimatedBackground';

export default function DisclaimerPage() {
  return (
    <>
      <AnimatedBackground />
      <div className="max-w-4xl mt-20 mx-auto p-10 bg-white text-gray-800 border border-gray-200 rounded-2xl">
      <h1 className="text-3xl mb-5 text-gray-900">Disclaimer</h1>
      <p className="mb-4 leading-relaxed">
        The information provided on Chef Choice Menu is for general
        informational purposes only. While we strive for accuracy, we make no
        warranties regarding the completeness or reliability of the content.
      </p>

      <h2 className="text-xl mt-6 mb-3 text-gray-700">Service Disclaimer</h2>
      <p className="mb-4 leading-relaxed">
        Chefs listed on our platform are independent contractors. We are not
        responsible for their actions, cooking methods, food safety handling, or
        the outcome of your dining experience. All arrangements are made at your
        discretion.
      </p>

      <h2 className="text-xl mt-6 mb-3 text-gray-700">Health & Allergies</h2>
      <p className="mb-4 leading-relaxed">
        Customers must disclose allergies or dietary restrictions during
        booking. Chef Choice Menu does not guarantee allergen-free meals and
        assumes no liability for undisclosed conditions.
      </p>

      <h2 className="text-xl mt-6 mb-3 text-gray-700">External Links</h2>
      <p className="mb-4 leading-relaxed">
        Our website may contain links to third-party sites. We are not
        responsible for the content, privacy policies, or practices of external
        websites.
      </p>

      <h2 className="text-xl mt-6 mb-3 text-gray-700">Limitation of Liability</h2>
      <p className="mb-4 leading-relaxed">
        To the maximum extent permitted by law, Chef Choice Menu disclaims
        liability for damages, losses, or issues arising from the use of our
        website, chefs, or services.
      </p>

      <h2 className="text-xl mt-6 mb-3 text-gray-700">Consent</h2>
      <p className="mb-4 leading-relaxed">
        By using our website, you hereby consent to our disclaimer and agree to
        its terms.
      </p>

      <h2 className="text-xl mt-6 mb-3 text-gray-700">Contact Us</h2>
      <p className="mb-2">Email: support@chefchoicemenu.com</p>
      <p>Phone: +91 85 959 039 39</p>
    </div>
    </>
  );
}
