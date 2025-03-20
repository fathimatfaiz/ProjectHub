import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


const EditTitle = () => {
  const {id} = useParams()
  const [title, setTitle] = useState({
    title: "",
    description: "",
    category_id: "",
    
  });

  const [categories, setCategories] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/category")
      .then((result) => {
        if (result.data.Status) {
          setCategories(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.error("Error fetching categories:", err));


      axios.get('http://localhost:3000/auth/title/'+id)
      .then(result => {
          setTitle({
            ...title,
            title: result.data.Result[0].title,
            description: result.data.Result[0].description,
            category_id: result.data.Result[0].category_id
          })
      }).catch(err =>console.log(err));

  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.put('http://localhost:3000/auth/edit_profile/'+id, profile)
    .then(result => {
      if(result.data.Status) {
        navigate('dashboard/profile')

      } else {
        alert(result.data.Error)
      }

    }).catch((err) => console.error("Error fetching categories:", err));
  }

 
  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
    <div className="p-3 rounded w-50 border">
      <h3 className="text-center">Edit Title</h3>
      <form className="row g-1"onSubmit={handleSubmit}>
        <div className="col-12">
          <label htmlFor="inputName" className="form-label">
            Title
          </label>
          <input
             type="text"
             className="form-control rounded-0"
             id="inputName"
             placeholder="Enter Title"
             value={title.title}
             onChange={(e) => setTitle({ ...title, title: e.target.value })}
             required
          />
        </div>

        <div className="col-12">
            <label htmlFor="inputDescription" className="form-label">
              Description
            </label>
            <textarea
              className="form-control rounded-0"
              id="inputDescription"
              placeholder="Enter a description"
              rows="4"
              value={title.description}
              onChange={(e) =>
                setTitle({ ...title, description: e.target.value })
              }
              required
            />
          </div>
        

        <div className="col-12">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            name="category"
            id="category"
            className="form-select"
            value={title.category_id}
            onChange={(e) =>
              setTitle({ ...title, category_id: e.target.value })
            }
            required
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

     

        <div className="col-12">
          <button
            type="submit"
            className="btn btn-success w-100 rounded-0 mb-2"
          >
           Edit Title
          </button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default EditTitle