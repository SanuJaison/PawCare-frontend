import { Link } from "react-router-dom";
import { CalendarDays } from "lucide-react";
import { FaAward } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { IoPawOutline } from "react-icons/io5";
import { LuDog } from "react-icons/lu";
import ctaImg from "../../assets/abtcta-Photoroom.png";

const AboutStatsCTA = () => {
  const stats = [
    { icon: <IoPawOutline />, value: "10+", label: "Years of Experience" },
    { icon: <LuDog />, value: "5000+", label: "Happy Pets" },
    { icon: <FaRegHeart />, value: "2000+", label: "Happy Pet Parents" },
    { icon: <FaAward />, value: "15+", label: "Expert Team Members" },
  ];

  return (
    <div className="px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
      <div className="rounded-3xl bg-pink-card px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-center gap-4 rounded-2xl bg-white/60 p-4 lg:bg-transparent lg:p-0"
            >
              <div className="text-4xl text-primary sm:text-5xl">{item.icon}</div>

              <div>
                <p className="text-3xl font-bold text-heading sm:text-4xl">
                  {item.value}
                </p>
                <p className="mt-1 font-semibold text-text">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-6 overflow-hidden rounded-3xl bg-pink-card px-5 py-8 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-20 lg:py-0">
        <div className="min-w-0">
          <h2 className="max-w-2xl text-3xl font-bold leading-tight text-heading sm:text-4xl lg:text-5xl">
            Join The PawCare Family Today!
          </h2>

          <p className="mt-4 text-lg font-semibold text-text sm:text-xl">
            Experience the best care for your furry friends.
          </p>

          <Link
            to="/appointments"
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-primary px-5 py-2 font-semibold text-white shadow transition-all duration-500 hover:-translate-y-1 hover:bg-primary-dark hover:shadow-lg"
          >
            <CalendarDays /> Book Appointment
          </Link>
        </div>

        <img
          src={ctaImg}
          alt="Dog and Cat"
          className="mx-auto h-64 w-full object-contain object-bottom sm:h-80 lg:w-100"
        />
      </div>
    </div>
  );
};

export default AboutStatsCTA;
