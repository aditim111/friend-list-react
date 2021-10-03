import React from "react";
import { FaTrash } from "react-icons/fa";
const List = ({ items, removeItem }) => {
  return (
    <div className="friend-list">
      {items.map((item) => {
        const { id, title } = item;
        return (
          <article className="friend-item" key={id}>
            <div>
              <p className="title">{title}</p>
              <p className="small">is your friend</p>
            </div>

            <div className="btn-container">
              <button
                type="button"
                className="delete-btn"
                onClick={() => removeItem(id)}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
