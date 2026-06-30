import storyImg from "../../assets/female-kissing-dog.jpg";
import missionImg from "../../assets/ourmission-Photoroom.png";
import visionImg from "../../assets/ourvision-Photoroom.png";
import { FaRegEye } from "react-icons/fa";
import { IoPaw } from "react-icons/io5";
import { TbTargetArrow } from "react-icons/tb";

const OurStory = () => {
  return (
    <div className="px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:px-10">
        <div>
          <img
            src={storyImg}
            alt="Our Story"
            className="h-80 w-full rounded-3xl object-cover sm:h-105"
          />
        </div>

        <div>
          <p className="font-bold text-primary">OUR STORY</p>

          <h2 className="mt-2 text-3xl font-bold text-heading sm:text-4xl lg:text-5xl">
            A Passion For Pet Care
          </h2>

          <p className="mt-6 max-w-xl font-semibold leading-relaxed text-text">
            PawCare started with a simple mission: to create a safe, comfortable
            and loving environment for pets and their parents.
          </p>

          <p className="mt-5 max-w-xl font-semibold leading-relaxed text-text">
            Over the years, we've helped thousands of pets stay healthy, happy
            and loved. Our dedicated team works every day with one goal - your
            pet's well-being.
          </p>

          <div className="mt-8 flex items-center gap-3">
            <IoPaw className="text-3xl text-primary" />

            <p className="text-2xl font-semibold italic text-primary sm:text-3xl">
              Because they deserve the best!
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:px-10">
        <div className="flex flex-col gap-5 overflow-hidden rounded-3xl bg-pink-card p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0 lg:max-w-[62%]">
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-3xl text-white">
                <TbTargetArrow />
              </div>

              <div className="min-w-0">
                <p className="text-3xl font-bold text-heading">Our Mission</p>

                <p className="mt-4 text-left font-semibold leading-relaxed text-text">
                  To provide exceptional pet care services while building
                  lasting relationships with pets and their owners.
                </p>

                <div className="mt-6 h-1 w-12 rounded-full bg-primary"></div>
              </div>
            </div>
          </div>

          <img
            src={missionImg}
            alt="Mission"
            className="mx-auto h-44 w-44 object-contain sm:h-52 sm:w-52"
          />
        </div>

        <div className="flex flex-col gap-5 overflow-hidden rounded-3xl bg-pink-card p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0 lg:max-w-[62%]">
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-3xl text-white">
                <FaRegEye />
              </div>

              <div className="min-w-0">
                <h3 className="text-3xl font-bold text-heading">Our Vision</h3>

                <p className="mt-4 text-left font-semibold leading-relaxed text-text">
                  To become the most trusted pet care center by offering quality
                  care, innovation and compassion in everything we do.
                </p>

                <div className="mt-6 h-1 w-12 rounded-full bg-primary"></div>
              </div>
            </div>
          </div>

          <img
            src={visionImg}
            alt="Vision"
            className="mx-auto h-44 w-44 object-contain sm:h-52 sm:w-52"
          />
        </div>
      </div>
    </div>
  );
};

export default OurStory;
