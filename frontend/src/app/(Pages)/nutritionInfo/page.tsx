import React from "react";
import { Button } from "@/app/components/UI/Button";
import  InformationContainer  from "./components/informationContainer";

const nutritionInfo: React.FC = () => {
  let foodType = "Meat";
  let foodTypeDescription = "Meat is important due to its rich nutrient content, providing essential proteins, vitamins and minerals crucial for overall health. Its cultural significance and versatility in cooking make it a valued part of global cuisine, while its economic impact sustains livelihoods in the meat industry."
  let name = "Lorem ipsum";
  let image = "https://placehold.co/300x150";
  let description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut nibh ultrices libero lobortis finibus. Praesent nibh justo, congue nec elementum lobortis, suscipit nec lacus. Fusce venenatis quam lectus, a sagittis sapien tincidunt sit amet. Aliquam erat volutpat. Fusce varius odio efficitur, auctor nisl sed, consectetur erat. Nulla et auctor";
  let author = "John Smith";
  let calories = 1300;
  for (let i = 0; i < 10; i++)
  {

  }
  return (
    <>

    <div className="">
      <div className="text-center font-bold text-2xl"><h1>Nutritional Information</h1></div>
      <div className="text-center font-bold text-xl"><h2>{foodType}</h2></div><br></br>
      <div className="text-center w-3/4 mx-auto text-sm">{foodTypeDescription}</div>
    </div>


    <InformationContainer
      name="Test"
      image={image}
      description={description}
      author={author}
      calories={calories}
    />
    </>
  );
};


export default nutritionInfo;
