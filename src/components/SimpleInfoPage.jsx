import { Link } from "react-router-dom";
import { IoPaw } from "react-icons/io5";

const SimpleInfoPage = ({ title, subtitle, description, actionLabel, actionPath }) => {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50 flex items-center justify-center p-8 flex-1">
      <div className="bg-white border border-gray-100 shadow-sm rounded-3xl p-10 max-w-2xl text-center">
        <div className="w-18 h-18 rounded-full bg-pink-card text-primary flex items-center justify-center mx-auto text-4xl">
          <IoPaw />
        </div>

        <p className="text-4xl font-bold text-heading mt-6">{title}</p>
        <p className="text-xl font-semibold text-primary mt-3">{subtitle}</p>
        <p className="text-text font-semibold leading-7 mt-4">{description}</p>

        <Link
          to={actionPath}
          className="inline-flex items-center justify-center bg-primary text-white px-7 py-3 rounded-xl font-semibold mt-7 hover:bg-primary-dark transition"
        >
          {actionLabel}
        </Link>
      </div>
    </div>
  );
};

export default SimpleInfoPage;
