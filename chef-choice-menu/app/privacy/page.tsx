import AnimatedBackground from '@/components/AnimatedBackground';

export default function PrivacyPage() {
  return (
    <>
      <AnimatedBackground />
      <div className="max-w-4xl mt-20 mx-auto p-10 leading-relaxed text-gray-800 bg-white rounded-2xl shadow-lg">
      <h1 className="text-3xl mb-5 text-gray-900">Privacy Policy</h1>
      <p className="mb-4">
        Chef Choice Menu (“we,” “our,” or “us”) values your privacy and is
        committed to protecting your personal information. This Privacy Policy
        explains how we collect, use, and safeguard the data you provide while
        using our website and services.
      </p>

      <h2 className="text-xl mt-8 mb-3 text-gray-700">Scope</h2>
      <p className="mb-4">
        This Privacy Policy applies to customers booking chefs, visitors to our
        website, and individuals who interact with our platform.
      </p>

      <h2 className="text-xl mt-8 mb-3 text-gray-700">Information We Collect</h2>
      <ul className="list-disc pl-5 mb-4">
        <li>Contact details: Name, email, phone number, address</li>
        <li>Booking details: Selected services, date, and preferences</li>
        <li>
          Payment information (processed securely through third-party providers)
        </li>
        <li>Technical data: IP address, browser type, device information</li>
      </ul>

      <h2 className="text-xl mt-8 mb-3 text-gray-700">How We Collect Data</h2>
      <p className="mb-4">
        We collect personal information when you register, book a chef, fill out
        forms, or communicate with us by email, phone, or chat.
      </p>

      <h2 className="text-xl mt-8 mb-3 text-gray-700">How We Use Your Information</h2>
      <ul className="list-disc pl-5 mb-4">
        <li>To provide chef booking and related services</li>
        <li>To process payments and issue invoices</li>
        <li>To communicate booking updates, promotions, and service alerts</li>
        <li>To improve our website and customer experience</li>
        <li>To comply with legal and regulatory requirements</li>
      </ul>

      <h2 className="text-xl mt-8 mb-3 text-gray-700">Data Sharing</h2>
      <p className="mb-4">
        We do not sell or rent personal data. We may share limited information
        with trusted service providers (payment processors, SMS platforms)
        solely to deliver our services.
      </p>

      <h2 className="text-xl mt-8 mb-3 text-gray-700">SMS & Mobile Data</h2>
      <p className="mb-4">
        We will never sell your mobile information or share it with third
        parties for marketing. Any SMS consent is used only for booking updates
        and chef service communication.
      </p>

      <h2 className="text-xl mt-8 mb-3 text-gray-700">Data Retention</h2>
      <p className="mb-4">
        Your personal data will be retained only as long as necessary to fulfill
        service obligations or comply with legal requirements.
      </p>

      <h2 className="text-xl mt-8 mb-3 text-gray-700">Security</h2>
      <p className="mb-4">
        We implement encryption, secure servers, and restricted access to
        protect your information.
      </p>

      <h2 className="text-xl mt-8 mb-3 text-gray-700">Your Rights</h2>
      <p className="mb-4">
        You have the right to request access, correction, or deletion of your
        data at any time by contacting us.
      </p>

      <h2 className="text-xl mt-8 mb-3 text-gray-700">Contact Us</h2>
      <p className="mb-2">Email: support@chefchoicemenu.com</p>
      <p>Phone: +91 85 959 039 39</p>
    </div>
    </>
  );
}
