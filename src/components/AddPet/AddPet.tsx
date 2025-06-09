import { NavLink } from "react-router-dom"

const AddPet = () => {
  return (
    <div className="mb-5 flex w-full items-center justify-between">
      <h3 className="text-base font-bold lg:text-lg">My pets</h3>
      <NavLink
        to="/add-pet"
        className="bg-primary hover:bg-primary-hover flex h-10 cursor-pointer items-center justify-center gap-1 rounded-4xl px-4 text-white transition-all duration-200 ease-in"
      >
        Add pet
        <svg className="size-4.5 fill-none stroke-white">
          <use href="/sprite.svg#icon-plus" />
        </svg>
      </NavLink>
    </div>
  )
}

export default AddPet
