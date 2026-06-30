import { IoIosNotificationsOutline } from "react-icons/io";
import { IoMenu, IoPaw, IoSearchOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";

const PetCenterNavbar = ({ onMenuClick }) => {
  return (
    <div className="flex min-h-20 flex-col gap-3 border-b border-gray-200 bg-white px-4 py-4 shadow-sm sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
      <div className="flex w-full items-center gap-3 lg:w-auto">
        <button
          type="button"
          onClick={onMenuClick}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-3xl text-heading shadow-sm transition hover:bg-gray-50 lg:hidden"
        >
          <IoMenu />
        </button>

        <div className="relative min-w-0 flex-1 lg:w-105 lg:flex-none">
          <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-gray-400" />

          <input
            type="text"
            placeholder="Search users, pets, appointments, products..."
            className="h-12 w-full rounded-xl border border-gray-200 pl-12 pr-4 text-sm font-medium outline-none focus:border-primary"
          />
        </div>
      </div>

      <div className="flex items-center justify-between lg:justify-end">
        <div className="flex items-center">
          <button className="relative rounded-xl px-4 py-3 hover:bg-gray-50 sm:px-5">
            <IoIosNotificationsOutline className="text-3xl text-heading" />

            <span className="absolute right-3 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white sm:right-4">
              8
            </span>
          </button>

          <button className="relative rounded-xl px-4 py-3 hover:bg-gray-50 sm:px-5">
            <MdOutlineEmail className="text-2xl text-heading" />

            <span className="absolute right-3 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
              5
            </span>
          </button>
        </div>

        <div className="ml-2 flex items-center gap-3 border-l-2 border-l-gray-100 pl-4 sm:gap-4 sm:pl-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary sm:h-12 sm:w-12">
            <IoPaw className="text-3xl text-white" />
          </div>

          <div className="hidden sm:block">
            <p className="font-bold text-heading">Admin</p>

            <p className="text-sm font-semibold text-text">Super Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetCenterNavbar;
