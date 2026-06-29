import { FaUsers } from "react-icons/fa";
import { FaShieldAlt } from "react-icons/fa";
import { LuHeart } from "react-icons/lu";
import { FaHeadset } from "react-icons/fa6";
import { FaAward } from "react-icons/fa6";


const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaUsers />,
      title: "Experienced Staff",
      description: "Our team of experts provide the best care for your pets.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Safe & Secure",
      description: "We ensure a safe and hygienic environment.",
    },
    {
      icon: <LuHeart />,
      title: "Affordable Pricing",
      description: "Quality care for your pets at affordable prices.",
    },
    {
      icon: <FaHeadset />,
      title: "24/7 Support",
      description: "We are always here to help you anytime.",
    },
    {
      icon: <FaAward />,
      title: "Quality Service",
      description: "We are committed to delivering the best.",
    },
  ];

  return (
    <div className="px-20 py-16">
      <p className="text-center text-primary text-2xl font-bold mb-10">
        WHY CHOOSE PAWCARE?
      </p>

      <div className="grid grid-cols-5 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`flex gap-4  ${
              index !== features.length - 1
                ? "border-r-2 border-gray-200 pr-6"
                : ""
            }`}
          >
            <div className="flex-shrink-0">
              <div className="h-14 w-14 rounded-full bg-pink-card flex items-center justify-center text-primary text-3xl">
                {feature.icon}
              </div>
            </div>

            <div>
              <p className="font-bold text-heading">
                {feature.title}
              </p>

              <p className="text-xs text-text font-semibold mt-1">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;