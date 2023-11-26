import {useReducer, useRef} from "react";
import { sortOptions, statusOptions, typeOptions } from "../constants";
import { useDispatch } from "react-redux";
import {
  filterBySearch,
  filterByStatus,
  filterByType,
  sortJobs,
  clearFilters
} from "../redux/jobSlice";

const Filter = () => {
  const dispatch = useDispatch();
  // jsx elemanının referansını alıyoruz
  const searchRef = useRef(null);
  const statusRef = useRef(null);
  const typeRef = useRef(null);
  const sortRef = useRef(null);

  const handleChange = (e) => {
    dispatch(filterBySearch(e.target.value));
  };

  const handleReset = () => {
    dispatch(clearFilters());
    searchRef.current.value = '';
    statusRef.current.value = 'Seçiniz'
    typeRef.current.value = 'Seçiniz'
    sortRef.current.value = 'Seçiniz'
  };
  return (
    <div>
      <section className="filter-sec">
        <h2>Filtreleme Formu</h2>
        <form>
          <div>
            <label>Arama</label>
            <input ref={searchRef} onChange={handleChange} type="search" />
          </div>

          <div>
            <label>Durum</label>
            <select ref={statusRef} onChange={(e) => dispatch(filterByStatus(e.target.value))}>
              <option selected disabled>
                Seçiniz
              </option>
              {statusOptions.map((i) => (
                <option key={i}>{i}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Tür</label>
            <select ref={typeRef} onChange={(e) => dispatch(filterByType(e.target.value))}>
              <option selected disabled>
                Seçiniz
              </option>
              {typeOptions.map((i) => (
                <option key={i}>{i}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Sıralama</label>
            <select ref={sortRef} onChange={(e) => dispatch(sortJobs(e.target.value))}>
              <option selected disabled>
                Seçiniz
              </option>
              {sortOptions.map((i) => (
                <option key={i}>{i}</option>
              ))}
            </select>
          </div>

          <div>
            <button onClick={handleReset} type="button">
              Sıfırla
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Filter;
