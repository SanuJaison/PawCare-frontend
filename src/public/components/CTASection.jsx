import { Link } from "react-router-dom";
import { CalendarDays } from "lucide-react";
import ctaImg from "../../assets/cta.png";

const CTASection = () => {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[30px] bg-pink-card">
        <div className="grid items-center gap-2 lg:grid-cols-2 lg:gap-0">
          <div className="flex h-64 items-end justify-center overflow-hidden px-4 pt-4 sm:h-80 lg:h-full lg:px-0 lg:pt-0">
            <img
              src={ctaImg}
              alt="Pets"
              className="h-full w-full object-contain object-bottom lg:h-auto lg:w-fit lg:object-cover"
            />
          </div>

          <div className="px-5 pb-8 pt-2 text-left sm:px-8 lg:py-12 lg:pl-0 lg:pr-10">
            <h2 className="max-w-xl text-3xl font-bold leading-tight text-heading sm:text-4xl lg:text-5xl">
              Need Professional Pet Care?
            </h2>

            <p className="mt-4 max-w-xl text-base font-semibold leading-7 text-text sm:text-lg sm:leading-8">
              Book an appointment today and let our experts take care of your
              furry friend.
            </p>

            <Link
              to="/appointments"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-primary shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <CalendarDays />
              Book Appointment
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
