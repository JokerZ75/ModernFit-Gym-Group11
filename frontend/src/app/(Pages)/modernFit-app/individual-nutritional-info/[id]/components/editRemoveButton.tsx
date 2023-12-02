import React from "react";
import { Button } from "@/app/components/UI/Button";
import axios from "axios";
import Link from "next/link";

type props = {
    id: string;
    isNutritionist: Boolean;

}

const EditRemoveButton: React.FC<props> = async ({ id, isNutritionist}) =>{    
    if (isNutritionist == true){
        return (
            <div className="text-right pt-7">
                <Button
                    shadow="default"
                    size="small"
                    variant="darkBlue"
                    hover="default"
                    rounded="circle"
                    className="w-1/6 border mx-auto text-center"
                >
                <Link href={`../editRemovePosts/${id}`}> edit / remove Post </Link>
            </Button></div>
        );}
};
export default EditRemoveButton;