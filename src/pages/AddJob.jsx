import { toast } from "react-toastify";
import { statusOptions, typeOptions } from "./../constants/index";
import { v4 } from "uuid";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddJob = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // form sınıfından örnek alma
    const form = new FormData(e.target);
    // formdaki verilerden obje oluşturma
    const newjob = Object.fromEntries(form.entries());

    // select alanlarını kontrol etme
    if (!newjob.type || !newjob.status) {
      toast.info('Lütfen tip ve durum seçiniz');
      return;
    }

    // işe id ekle
    newjob.id = v4();
    // tarih ekleme
    newjob.date = new Date();

    axios.post('http://localhost:4000/jobs',newjob)
    .then(() => {
      navigate('/')
      toast.success('Ekleme işlemi başarılı')
    })
    .catch(() => toast.error('Ekleme işlemi başarısız'))
  };
  return (
    <div className="add-page">
      <section className="add-sec">
        <h2>Yeni İş Ekle</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Pozisyon</label>
            <input type="text" name="position" required />
          </div>
          <div>
            <label>Şirket</label>
            <input type="text" name="company" required />
          </div>
          <div>
            <label>Lokasyon</label>
            <input type="text" name="location" required />
          </div>
          <div>
            <label>Durum</label>
            <select name="status">
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
            <select name="type">
              <option selected disabled>
                Seçiniz
              </option>
              {typeOptions.map((i) => (
                <option key={i}>{i}</option>
              ))}
            </select>
          </div>

          <div>
            <button>Ekle</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddJob;
