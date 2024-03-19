import { useState } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [todoName, setTodoName] = useState("");
  const [todoDescription, setTodoDescription] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [editTodo, setEditTodo] = useState(null);

  const handleChange = (e) => {
    setTodoName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setTodoDescription(e.target.value);
  };

  const handleAddOrUpdateTodo = () => {
    if (editTodo !== null) {
      const updatedTodos = todos.map((todo) =>
        todo.id === editTodo
          ? { ...todo, name: todoName, description: todoDescription }
          : todo
      );
      setTodos(updatedTodos);
      setEditTodo(null);
    } else {
      if (todoName.trim() !== "") {
        const newTodo = {
          id: Date.now(),
          name: todoName,
          description: todoDescription,
          status: "not completed",
        };
        setTodos([...todos, newTodo]);
      }
    }
    setTodoName("");
    setTodoDescription("");
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleEditTodo = (todo) => {
    setTodoName(todo.name);
    setTodoDescription(todo.description);
    setEditTodo(todo.id);
  };

  const handleStatusChange = (id, newStatus) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, status: newStatus } : todo
    );
    setTodos(updatedTodos);
  };

  const filterTodos = (todo) => {
    if (filterStatus === "all") {
      return true;
    } else {
      return todo.status === filterStatus;
    }
  };

  return (
    <div
      className="container"
      style={{ position: "absolute", top: "20%", left: "10%" }}
    >
      <div className="title">
        <h4
          className="text-center"
          style={{ marginRight: "20%", color: "#13ad89" }}
        >
          My Todo
        </h4>
        <br />
      </div>

      <div className="user-input" style={{ marginLeft: "8%" }}>
        <div className="row">
          <div className="col">
            <input
              type="text"
              value={todoName}
              onChange={handleChange}
              className="form-control"
              style={{
                padding: "5px",
                border: "0.5px solid #13ad89",
                borderRadius: "5px",
                width: "100%",
              }}
              placeholder="Todo Name"
            />
          </div>
          <div className="col">
            <input
              type="text"
              value={todoDescription}
              onChange={handleDescriptionChange}
              className="form-control"
              style={{
                padding: "5px",
                border: "0.5px solid #13ad89",
                borderRadius: "5px",
                width: "100%",
              }}
              placeholder="Todo Description"
            />
          </div>
          <div className="col">
            <button
              onClick={handleAddOrUpdateTodo}
              className="btn btn-primary"
              style={{
                width: "40%",
                height: "5vh",
                color: "white",
                border: "2px solid #13ad89",
                backgroundColor: "#13ad89",
                borderRadius: "10px",
              }}
            >
              {editTodo !== null ? "Update Todo" : "Add Todo"}
            </button>
          </div>
        </div>
      </div>

      <div
        className="user-filter"
        style={{ marginTop: "50px", marginRight: "10px", marginBottom: "50px" }}
      >
        <div className="row">
          <div className="col-9 d-flex align-items-center">
            <h5>My Todos</h5>
          </div>
          <div className="col d-flex align-items-center">
            <h5>Status Filter: </h5>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="form-select"
              style={{
                backgroundColor: "#fe7e7b",
                color: "white",
                width: "auto",
                height: "5vh",
                marginLeft: "10px",
              }}
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="not completed">Not Completed</option>
            </select>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-4 mt-3">
          {todos.length === 0 ? (
            <div className="col">
              <h3 className="text-center">Todo is empty.</h3>
            </div>
          ) : (
            todos.filter(filterTodos).map((todo) => (
              <div key={todo.id} className="col">
                <div
                  className="card h-100"
                  style={{
                    borderRadius: "10px",
                    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                    transition: "0.3s",
                  }}
                >
                  <div
                    className="card-body"
                    style={{ backgroundColor: "#ccf5d3" }}
                  >
                    <p className="card-text">Name: {todo.name}</p>
                    <p className="card-text">Description: {todo.description}</p>
                    <div className="form-group d-flex align-items-center">
                      <label className="me-2">Status: </label>
                      <select
                        className="form-select status"
                        style={{
                          backgroundColor:
                            todo.status === "completed" ? "#13ad89" : "#fe7e7b",
                          color: "white",
                          width: "auto",
                          height: "5vh",
                        }}
                        value={todo.status}
                        onChange={(e) =>
                          handleStatusChange(todo.id, e.target.value)
                        }
                      >
                        <option value="not completed">Not Completed</option>
                        <option id="completed" value="completed">
                          Completed
                        </option>
                      </select>
                    </div>
                    <div className="d-flex justify-content-end mt-3">
                      <button
                        id="edit"
                        type="button"
                        className="btn btn-primary me-2"
                        style={{
                          width: "30%",
                          height: "5vh",
                          color: "white",
                          border: "2px solid #13ad89",
                          backgroundColor: "#13ad89",
                          borderRadius: "10px",
                        }}
                        onClick={() => handleEditTodo(todo)}
                      >
                        Edit
                      </button>
                      <button
                        id="delete"
                        type="button"
                        className="btn btn-danger"
                        style={{
                          width: "30%",
                          height: "5vh",
                          color: "white",
                          border: "2px solid #cd5d1e",
                          backgroundColor: "#cd5d1e",
                          borderRadius: "10px",
                        }}
                        onClick={() => handleDeleteTodo(todo.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
