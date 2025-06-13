import { useSelector } from "react-redux"
import { selectPets } from "@store/users/selectors"
import { PetsItem } from "@components/PetsItem/PetsItem"

const PetsList = () => {
  const pets = useSelector(selectPets)
  return (
    <ul className="profile-scrollbar grid h-auto gap-3.5 lg:grid-cols-2 xl:grid-cols-1 xl:overflow-y-auto">
      {pets.map((pet) => (
        <PetsItem key={pet._id} pet={pet} />
      ))}
    </ul>
  )
}

export default PetsList
