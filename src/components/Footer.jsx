import { Link } from "react-router-dom";
import { FaFacebook, FaPhoneAlt, FaYoutube } from "react-icons/fa";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import { IoLocationSharp, IoMail, IoPaw } from "react-icons/io5";
import { LuClock5 } from "react-icons/lu";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const Footer = () => {
  const quickLinks = [
    { label: "Home", path: "/" },
    { label: "Services", path: "/services" },
    { label: "About Us", path: "/about" },
    { label: "Adoption", path: "/adoption" },
    { label: "Pet Shop", path: "/pet-shop" },
    { label: "Contact Us", path: "/contact" },
  ];

  const services = [
    { label: "Pet Grooming", path: "/services" },
    { label: "Veterinary Care", path: "/services" },
    { label: "Pet Boarding", path: "/services" },
    { label: "Pet Training", path: "/services" },
    { label: "Pet Shop", path: "/pet-shop" },
    { label: "Vaccination", path: "/services" },
  ];

  const footerLinkClass =
    "flex items-center font-semibold text-text transition hover:translate-x-1 hover:text-primary";

  return (
    <footer className="bg-pink-bg">
      <div className="grid gap-8 px-4 py-10 sm:px-6 md:grid-cols-2 lg:px-10 xl:grid-cols-[1.2fr_1fr_1fr_1.5fr_1.4fr]">
        <div className="flex flex-col items-start gap-5 border-gray-200 xl:border-r-2 xl:pr-6">
          <Link to="/" className="flex items-center gap-2">
            <IoPaw className="text-primary text-5xl" />
            <div>
              <p className="text-3xl font-bold">
                <span className="text-primary">Paw</span>Care
              </p>
              <p className="text-xs font-semibold">Pet Care Center</p>
            </div>
          </Link>
          <p className="max-w-xs text-sm font-semibold text-text">
            We provide the best care, love and attention to keep your pets
            healthy and happy.
          </p>
          <div className="flex gap-5 text-2xl">
            <FaFacebook className="text-blue-700" />
            <FaInstagram className="text-pink-600" />
            <FaXTwitter />
            <FaYoutube className="text-red-600" />
          </div>
        </div>

        <div className="flex flex-col gap-3 border-gray-200 xl:items-center xl:border-r-2">
          <p className="text-heading font-semibold text-lg">Quick Links</p>
          <div className="space-y-1">
            {quickLinks.map((item) => (
              <Link key={item.label} to={item.path} className={footerLinkClass}>
                <MdOutlineKeyboardArrowRight /> {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 border-gray-200 xl:items-center xl:border-r-2">
          <p className="text-heading font-semibold text-lg">Our Services</p>
          <div className="space-y-1">
            {services.map((item) => (
              <Link key={item.label} to={item.path} className={footerLinkClass}>
                <MdOutlineKeyboardArrowRight /> {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 border-gray-200 xl:border-r-2 xl:px-8">
          <p className="text-heading font-semibold text-lg">Contact Us</p>
          <div className="space-y-3">
            <p className="flex items-start gap-3 text-text font-semibold">
              <IoLocationSharp className="text-primary text-2xl shrink-0" />
              123 Pet Street, Kochi, Kerala 682001
            </p>
            <p className="flex items-center gap-3 text-text font-semibold">
              <FaPhoneAlt className="text-primary text-xl shrink-0" />
              +91 98765 43210
            </p>
            <p className="flex items-center gap-3 text-text font-semibold">
              <IoMail className="text-primary text-2xl shrink-0" />
              pawcare@gmail.com
            </p>
            <p className="flex items-center gap-3 text-text font-semibold">
              <LuClock5 className="text-primary text-2xl shrink-0" />
              Mon - Sun: 9:00 AM - 8:00 PM
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 xl:px-8">
          <p className="text-heading font-semibold text-lg">Newsletter</p>
          <div className="space-y-3">
            <p className="text-text font-semibold">
              Subscribe to get updates about our services and offers.
            </p>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-lg border border-gray-200 bg-white p-3 font-semibold shadow outline-none"
              />
              <button className="rounded-xl border border-gray-200 bg-primary px-5 py-2 font-semibold text-white shadow transition-all duration-500 hover:-translate-y-1 hover:bg-primary-dark hover:shadow-lg">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 bg-pink-card px-4 py-4 text-center text-sm font-semibold text-text sm:px-6 md:flex-row md:justify-between md:text-left lg:px-20">
        <p>© 2026 PawCare Pet Center. All Right Reserved</p>
        <p>Privacy Policy | Terms & Conditions</p>
      </div>
    </footer>
  );
};

export default Footer;
