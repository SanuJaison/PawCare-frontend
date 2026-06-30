const PetShopCategory = ({ category, isActive, onSelect }) => {
  return (
    <button
      type="button"
      onClick={() => onSelect(category.name)}
      className={`flex h-full flex-col items-center justify-center gap-4 rounded-2xl border p-5 text-center shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
        isActive
          ? "border-primary bg-pink-card text-primary"
          : "border-gray-100 bg-white text-heading"
      }`}
    >
      <img
        src={category.image}
        alt={category.name}
        className="h-20 w-20 object-contain"
      />

      <span className="font-bold">{category.name}</span>
    </button>
  );
};

export default PetShopCategory;
