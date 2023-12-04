"use client";
import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "@/app/components/JWTAuth/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "@/app/components/UI/Button";
import Modal from "@/app/components/Modal";
import { withRouter } from "next/router";

type userType = {
  _id?: string;
  Name: string;
  Email: string;
  Profile_picture: string;
  Height: number;
  Weight: number;
  Gym_Goals: string;
  Position: string;
};

type props = {
  children?: React.ReactNode;
  User: userType;
};

const User: React.FC<props> = ({ children, User }) => {
  const [image, setImage] = React.useState(User.Profile_picture);
  const [ConfirmModal, setConfirmModal] = React.useState(false);

  React.useEffect(() => {
    axios
      .get(User.Profile_picture)
      .then((res) => {
        setImage(User.Profile_picture);
      })
      .catch((err) => {
        setImage("");
      });
  }, []);

  const queryClient = useQueryClient();
  const { api_url, getHeaders } = useAuthContext();
  const { mutate } = useMutation({
    mutationKey: ["user"],
    mutationFn: async () => {
      const headers = await getHeaders();
      await queryClient.cancelQueries({ queryKey: ["users"] });
      const previousUsers = (await queryClient.getQueryData([
        "users",
      ])) as userType[];
      await toast.promise(
        axios.delete(`${api_url}/user/delete/${User._id}`, {
          headers: headers,
        }),
        {
          pending: "Deleting User...",
          success: "User Deleted!",
          error: "Error Deleting User!",
        }
      );
      const newUsers = await previousUsers?.filter(
        (user: userType) => user._id !== User._id
      );
      await queryClient.setQueryData(["users"], newUsers);
      return { previousUsers };
    },
    onError: async (err, variables, context: any) => {
      await queryClient.setQueryData(["users"], context?.previousUsers);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return (
    <>
      {ConfirmModal && (
        <Modal withRouter={false} closeModal={setConfirmModal}>
          <div className="px-5 py-5 mx-auto text-center flex flex-col">
            <h1 className="text-blue-200 text-2xl font-bold">Are your sure</h1>
            <div className="mt-2 flex flex-col md:flex-row text-center mx-auto w-5/6">
              <Button
                shadow="default"
                variant="darkBlue"
                size="fillWidth"
                hover="hoverLightBlue"
                rounded="square"
                className=" rounded-lg mx-auto text-center m-1"
                onClick={() => {
                  mutate();
                  setConfirmModal(false);
                }}
              >
                Confirm
              </Button>
              <Button
                shadow="default"
                variant="default"
                size="fillWidth"
                hover="default"
                rounded="square"
                className="rounded-lg mx-auto text-center m-1"
                onClick={() => {
                  setConfirmModal(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      )}
      <div className="md:w-[450px] w-[350px] mx-auto m-4 bg-blue-100 p-1 rounded-xl">
        <div className="flex m-3">
          <div className="">
            {image === "" ? (
              <img
                src="https://placehold.co/300x300"
                alt="Profile Picture"
                className="w-[75px] h-[75px] rounded-full"
              />
            ) : (
              <img
                src={`${image}`}
                alt="Profile Picture"
                className="w-[75px] h-[75px] rounded-full"
              />
            )}
          </div>
          <div className="mx-auto w-3/4 ml-5">
            <div className="text-white text-xl">{User.Position}</div>
            <div className="text-white text-xl">{User.Name}</div>
            <div className="text-white text-xl">{User.Email}</div>
          </div>
        </div>
        <div className="text-center flex flex-col">
          {/* TODO: IF HAD MORE TIME FOR THIS PROJECT AND ASSIGNMENT I WOULD HAVE IMPLEMENTED THIS FEATURE
           <Button
            shadow="default"
            size="small"
            variant="darkBlue"
            hover="default"
            rounded="circle"
            className="w-5/6 border mx-auto text-center m-1"
          >
            Edit Account
          </Button> */}
          <Button
            shadow="default"
            size="small"
            variant="default"
            hover="default"
            rounded="circle"
            className=" mx-auto text-center m-1"
            onClick={() => {
              setConfirmModal(true);
            }}
          >
            Remove Account
          </Button>
        </div>
      </div>
    </>
  );
};
export default User;
