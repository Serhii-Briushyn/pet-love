type SortButtonProps = {
  label: string
  isActive: boolean
  onClick: () => void
}

const SortButton: React.FC<SortButtonProps> = ({ label, isActive, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`hover:bg-primary flex h-10.5 cursor-pointer items-center gap-2 rounded-4xl px-3 transition-all duration-200 ease-in hover:text-white lg:h-12 lg:px-3.5 ${isActive ? "bg-primary text-white" : "dark:bg-secondary bg-white text-black"} `}
  >
    {label}
    {isActive && (
      <svg className="h-4.5 w-4.5 fill-none stroke-white">
        <use href="/sprite.svg#icon-close" />
      </svg>
    )}
  </button>
)

export default SortButton
