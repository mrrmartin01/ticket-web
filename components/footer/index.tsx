import Link from "next/link";

const footerSections = [
  {
    title: "Explore Events",
    links: [
      { label: "Upcoming Events", href: "/events/upcoming" },
      { label: "Popular Events", href: "/events/popular" },
      { label: "Categories", href: "/events/categories" },
    ],
  },
  {
    title: "Tickets & Support",
    links: [
      { label: "My Tickets", href: "/account/tickets" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Support Center", href: "/support" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Terms & Policies", href: "/legal" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "support@tickets.com", href: "mailto:support@tickets.com" },
      { label: "+1 (800) 123-4567", href: "tel:+18001234567" },
      { label: "Accra, Ghana", href: null },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="border-t text-sm text-gray-600 px-6 md:px-12 py-16">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-12">
        {/* Brand */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Tickets</h3>
          <p className="mt-2 leading-relaxed">
            Book your next experience - concerts, festivals, sports, and more.
          </p>
        </div>

        {/* Dynamic Sections */}
        {footerSections.map(({ title, links }) => (
          <div key={title}>
            <h4 className="text-gray-900 font-medium mb-3 underline decoration-double">{title}</h4>
            <ul className="space-y-2">
              {links.map(({ label, href }) =>
                href ? (
                  href.startsWith("/") ? (
                    <li key={label}>
                      <Link href={href} className="hover:underline">
                        {label}
                      </Link>
                    </li>
                  ) : (
                    <li key={label}>
                      <a href={href} className="hover:underline">
                        {label}
                      </a>
                    </li>
                  )
                ) : (
                  <li key={label}>
                    <span>{label}</span>
                  </li>
                )
              )}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 border-t pt-6 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Tickets. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
