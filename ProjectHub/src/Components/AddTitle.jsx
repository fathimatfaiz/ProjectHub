import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddTitle = () => {
  const [title, setTitle] = useState({
    title: "",
    description: "",
    category_id: "",
  });
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

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
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/student/add_title", {
        title: title.title,
        description: title.description,
        category_id: title.category_id,
      })
      .then((result) => {
        if (result.data.Status) {
          navigate("/student_detail/title");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => {
        console.error(
          "Error adding title:",
          err.response ? err.response.data : err.message
        );
        alert("Failed to add title. Check the console for details.");
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Add Title</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
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
              className="form-control rounded-0"
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
              Add Title
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTitle;
