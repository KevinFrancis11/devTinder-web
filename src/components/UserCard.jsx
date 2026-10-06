import React from "react";


const UserCard = ({user}) => {
  const { firstName, secondName, age, skills, photoURL, gender, about} = user;
  const fullName = [firstName, secondName].filter(Boolean).join(" ");
  const ageAndGender = [age, gender].filter(Boolean).join(", ");
  const skill = skills?.map((s)=>s.toUpperCase()).join(", ") ?? " ";
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img className="my-5 border-2 rounded-md w-65 h-75"
          src={photoURL}
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{fullName}</h2>
        <p>{ageAndGender}</p>
        <p>
          {about}
        </p>
        <p>Interests: {skill}</p>
        <div className="card-actions justify-center my-4">
          <button className="btn btn-primary">❌</button>
          <button className="btn btn-primary">💚</button>
        </div>
      </div>  
    </div>
  );
};

export default UserCard;
