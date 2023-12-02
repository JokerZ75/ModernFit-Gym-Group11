"use client";
import React from "react";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FieldValues, useForm } from "react-hook-form";
import { Button } from "@/app/components/UI/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "@/app/components/JWTAuth/AuthContext";
import { Content } from "next/font/google";
import { toast } from "react-toastify";

type props = {
  id: string;
  title: string;
  image: string;
  description: string;
  calories: number;
  catagory: string;
};

const EditRemoveForm: React.FC<props> = ({
  id,
  title,
  image,
  description,
  calories,
  catagory,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const { getHeaders, api_url } = useAuthContext();

  const labelSpanRef = React.useRef<HTMLSpanElement>(null);
  const formRef = React.useRef<HTMLFormElement>(null);

  const onSubmit = async (data: FieldValues) => {
    const formData = new FormData();
    formData.append("Title", data.Title);
    formData.append("Category", data.Category);
    formData.append("AverageKcal", data.AverageKcal);
    formData.append("Image", data.Image[0]);
    formData.append("Content", data.Content);
    updatePost(formData);
  };

  const queryClient = useQueryClient();

  const { mutate: updatePost } = useMutation({
    mutationKey: ["updatePost"],
    mutationFn: async (data: FieldValues) => {
      let headers = (await getHeaders()) as {
        "Content-Type": string;
        Authorization: string;
      };
      headers["Content-Type"] = "multipart/form-data";
      const { data: post } = await toast.promise(
        axios.post(`${api_url}/nutritional_post/update/${id}`, data, {
          headers: headers,
        }),
        {
          pending: "Updating post...",
          success: "Post updated successfully!",
          error: "Error updating post",
        }
      );

      return post;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["post", id],
      });
      queryClient.invalidateQueries({
        queryKey: ["posts", catagory],
      });
    },
    onError: (error: any) => {
      if (error.response.data?.msg === "Post already exists") {
        toast.error("Post may already exists");
      } else if (error.response.status === 400) {
        toast.error(error.response.data.msg);
      }
    },
  });

  const { mutate: deletePost } = useMutation({
    mutationKey: ["deletePost"],
    mutationFn: async () => {
      const headers = await getHeaders();
      const { data: post } = await toast.promise(
        axios.delete(`${api_url}/nutritional_post/${id}`, {
          headers: headers,
        }),
        {
          pending: "Deleting post...",
          success: "Post deleted successfully!",
          error: "Error deleting post",
        }
      );
      return post;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts", catagory],
      });
      setTimeout(() => {
        window.location.href = "../";
      }, 1000);
    },
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const headers = await getHeaders();
      const { data } = await axios.get(`${api_url}/mealcatagory/`, {
        headers: headers,
      });
      return data as {
        _id: string;
        Name: string;
      }[];
    },
  });

  React.useEffect(() => {
    const selectInput = document.getElementById(
      "catSelect"
    ) as HTMLSelectElement;
    selectInput.value = catagory;
  }, [categories]);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="create-post-form"
        ref={formRef}
      >
        <input
          type="text"
          {...register("Title", { required: true })}
          placeholder="Title"
          defaultValue={title}
        />
        {errors.Title && <p className="form-error">This field is required</p>}
        <select
          {...register("Category", { required: true })}
          name="Category"
          id="catSelect"
        >
          <option className="" value="">
            Select Category
          </option>
          {categories?.map((category) => (
            <option key={category?._id} value={category?._id}>
              {category?.Name}
            </option>
          ))}
        </select>
        {errors.Category && (
          <p className="form-error">This field is required</p>
        )}
        <input
          type="number"
          {...register("AverageKcal", { required: true })}
          placeholder="Average Kcal"
          defaultValue={calories}
        />
        {errors.AverageKcal && (
          <p className="form-error">
            This field is required and should be whole numbers
          </p>
        )}
        {/* TODO: put image in background here*/}
        <div className="mt-4 relative w-full">
          <label
            htmlFor="Image"
            className="flex flex-col items-center w-full border-2 border-gray-300 rounded-md text-blue-200 font-bold text-xl py-16 "
          >
            <FontAwesomeIcon icon={faUpload} />
            <span ref={labelSpanRef}>upload image</span>
          </label>
          <input
            className="absolute w-full border-2 h-full top-0 left-0 opacity-0"
            type="file"
            {...register("Image", { required: true })}
            onChange={() => {
              labelSpanRef.current!.innerText = `${
                formRef.current!.Image.files[0].name
              }`;
            }}
          />
        </div>
        {errors.Image && <p className="form-error">This field is required</p>}
        <textarea
          {...register("Content", { required: true })}
          name="Content"
          cols={50}
          placeholder="Content"
          defaultValue={description}
        />
        {errors.Content && <p className="form-error">This field is required</p>}
        <div className="">
          <Button
            variant="darkBlue"
            hover="hoverLightBlue"
            size="fillWidth"
            className="rounded-xl py-4 mt-4"
            type="submit"
          >
            Update
          </Button>
        </div>
      </form>
      <Button
        variant="default"
        hover="default"
        size="fillWidth"
        className="rounded-xl py-4 mt-4"
        onClick={() => {
          deletePost();
        }}
      >
        Remove
      </Button>
    </>
  );
};

export default EditRemoveForm;
