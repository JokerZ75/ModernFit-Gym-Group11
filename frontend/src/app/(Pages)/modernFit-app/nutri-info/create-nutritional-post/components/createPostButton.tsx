import React from "react";
import { Button } from "@/app/components/UI/Button";
import axios from "axios";
import Link from "next/link";
type permission = {
    isNutritionist: Boolean;
}

const CreatePostButton: React.FC<permission> = async ({isNutritionist}) =>{

    if(isNutritionist == true){
        return (
            <Link href="/modernFit-app/nutri-info/create-nutritional-post">
                <Button
                  variant="darkBlue"
                  hover="hoverLightBlue"
                  shadow="default"
                  size="fillWidth"
                  className="py-5 mt-3 mb-5 rounded-xl"
                >
                  create post
                </Button>
              </Link>
        );
    }
    
};
export default CreatePostButton;