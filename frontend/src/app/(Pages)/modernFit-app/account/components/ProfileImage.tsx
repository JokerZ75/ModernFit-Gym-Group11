"use client";
import React from "react";
import { useForm, FieldValues, UseFormRegister } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useAuthContext } from "@/app/components/JWTAuth/AuthContext";
import { Button } from "@/app/components/UI/Button";
import { toast } from "react-toastify";

const ProfileImage: React.FC<{}> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { api_url, getHeaders } = useAuthContext();
  const formRef = React.useRef<HTMLFormElement>(null);
  const labelRef = React.useRef<HTMLLabelElement>(null);
  const [profileImage, setProfileImage] = React.useState<string>("");

  const { mutate: uploadProfileImage } = useMutation({
    mutationKey: ["uploadProfileImage"],
    mutationFn: async (formData: any) => {
      let headers = (await getHeaders()) as {
        "Content-Type": string;
        Authorization: string;
      };
      headers["Content-Type"] = "multipart/form-data";
      const data = await axios.post(
        `${api_url}/user/profile-picture`,
        formData,
        {
          headers: headers,
        }
      );
      return data;
    },
    onSuccess: async (data) => {
      toast.success("Profile picture updated");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    },
  });

  const onSubmit = async (data: FieldValues) => {
    const formData = new FormData();
    formData.append("profileImage", data.profileImage[0]);
    uploadProfileImage(formData);
  };

  const { data: userInfo } = useQuery({
    queryKey: ["userInfo"],
    queryFn: async () => {
      const headers = await getHeaders();
      const { data } = await axios.get(`${api_url}/user`, {
        headers: headers,
      });
      setProfileImage(data.Profile_picture);
      return data;
    },
    refetchOnMount: true,
  });

  React.useEffect(() => {
    axios
      .get(`${userInfo?.Profile_picture}`)
      .then((res) => {
        if (userInfo?.Profile_picture == null) {
          setProfileImage("");
        }else{
          setProfileImage(userInfo?.Profile_picture);
        }
      }).catch((err) => {});
  }, [userInfo]);

  return (
    <div>
      <div className="relative">
        {profileImage == "" ? (
          <img
            src="https://placehold.jp/200x200.png"
            alt="profile image"
            className="block rounded-full m-4 ml-auto mr-auto profile-scaling object-cover"
          />
        ) : (
          <img
            src={`${profileImage}`}
            alt="profile image"
            className="block rounded-full m-4 ml-auto mr-auto profile-scaling object-cover"
          />
        )}
        <form
          ref={formRef}
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
          className="absolute flex top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-500 ease-in-out  profile-scaling rounded-full"
        >
          <label
            htmlFor="profileImage"
            ref={labelRef}
            className="mx-auto my-auto font-bold text-white text-2xl"
          >
            Upload Image
          </label>
          <input
            type="file"
            className="w-full h-full absolute  opacity-0"
            accept="image/*"
            {...register("profileImage", { required: true })}
            id="profileImage"
            onChange={async () => {
              labelRef.current!.innerText =
                formRef.current!.profileImage.files[0].name;
              formRef.current!.classList.remove("opacity-0");
            }}
          />
        </form>
        <Button
          variant="darkBlue"
          hover="hoverLightBlue"
          className="rounded-lg absolute  mx-auto mb-2"
          size="fillWidth"
          type="submit"
          onClick={handleSubmit(onSubmit)}
        >
          Upload
        </Button>
      </div>
    </div>
  );
};

export default ProfileImage;
