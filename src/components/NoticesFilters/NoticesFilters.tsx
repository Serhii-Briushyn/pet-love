import { useDispatch, useSelector } from "react-redux"

import { AppDispatch } from "@store/store"
import {
  selectCategories,
  selectFilters,
  selectSexOptions,
  selectSorting,
  selectSpeciesOptions,
} from "@store/notices/selectors"
import { selectCities } from "@store/cities/selectors"
import { setFilters, setSorting } from "@store/notices/slice"
import { useNoticesInit } from "@hooks/useNoticesInit"

import SearchField from "@components/SearchField/SearchField"
import CitySearchField from "@components/CitySearchField/CitySearchField"
import FilterSelect from "@components/FilterSelect/FilterSelect"
import { sortingOptions } from "@constants/noticesSortingOptions"
import SortButton from "@components/SortButton/SortButton"

const NoticesFilters = () => {
  const dispatch = useDispatch<AppDispatch>()
  const filters = useSelector(selectFilters)
  const sorting = useSelector(selectSorting)
  const categories = useSelector(selectCategories)
  const sexOptions = useSelector(selectSexOptions)
  const speciesOptions = useSelector(selectSpeciesOptions)
  const cities = useSelector(selectCities)

  useNoticesInit()

  const onChange = (field: keyof typeof filters) => (value: string) => {
    if (filters[field] !== value) {
      dispatch(setFilters({ [field]: value }))
    }
  }

  return (
    <div className="bg-secondary mb-10 rounded-4xl p-5 lg:px-8 lg:py-10 xl:px-10">
      <div className="flex flex-col gap-3 lg:gap-4 xl:flex-row">
        <div className="flex w-full flex-col gap-3 lg:flex-row lg:gap-4 xl:contents">
          <SearchField variant="notices" value={filters.keyword} onSearch={onChange("keyword")} />
          <div className="flex gap-2 lg:contents">
            <FilterSelect
              text="Category"
              value={filters.category}
              options={categories}
              onChange={onChange("category")}
            />
            <FilterSelect
              text="By gender"
              value={filters.sex}
              options={sexOptions}
              onChange={onChange("sex")}
            />
          </div>
        </div>
        <div className="flex w-full flex-col gap-3 lg:flex-row lg:gap-4 xl:contents">
          <FilterSelect
            text="By type"
            value={filters.species}
            options={speciesOptions}
            onChange={onChange("species")}
          />
          <CitySearchField
            cities={cities}
            value={filters.location}
            onSearch={onChange("location")}
          />
        </div>
      </div>

      <div className="my-5 h-[1px] w-full bg-black/10"></div>

      <div className="flex flex-wrap gap-2.5 lg:gap-2">
        {sortingOptions.map(({ label, key }) => (
          <SortButton
            key={key}
            label={label}
            isActive={sorting === key}
            onClick={() => dispatch(setSorting(sorting === key ? null : key))}
          />
        ))}
      </div>
    </div>
  )
}

export default NoticesFilters
