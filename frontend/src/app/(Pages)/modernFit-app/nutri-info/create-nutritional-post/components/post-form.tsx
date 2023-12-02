"use client";
import React from "react";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FieldValues, useForm } from "react-hook-form";
import { Button } from "@/app/components/UI/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "@/app/components/JWTAuth/AuthContext";
import { toast } from "react-toastify";

const PostForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
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
    createPost(formData);
  };

  const queryClient = useQueryClient();

  const { mutate: createPost } = useMutation({
    mutationKey: ["createPost"],
    mutationFn: async (data: FieldValues) => {
      let headers = (await getHeaders()) as {
        "Content-Type": string;
        Authorization: string;
      };
      headers["Content-Type"] = "multipart/form-data";
      const { data: post } = await toast.promise(
        axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/nutritional_post/create`,
          data,
          {
            headers: headers,
          }
        ),
        {
          pending: "Creating post...",
          success: "Post created!",
          error: "Error creating post",
        }
      );
      return post;
    },
    onError: (error: any) => {
      if (error.response.data?.msg === "Post already exists") {
        toast.error("Post may already exists");
      }
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({
        queryKey: ["posts", getValues("Category")],
      });
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

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="create-post-form"
      ref={formRef}
    >
      <input
        type="text"
        {...register("Title", { required: true })}
        placeholder="Title"
      />
      {errors.Title && <p className="form-error">This field is required</p>}
      <select {...register("Category", { required: true })} name="Category">
        <option className="" value="">
          Select Category
        </option>
        {categories?.map((category) => (
          <option key={category._id} value={category._id}>
            {category.Name}
          </option>
        ))}
      </select>
      {errors.Category && <p className="form-error">This field is required</p>}
      <input
        type="number"
        {...register("AverageKcal", { required: true })}
        placeholder="Average Kcal"
      />
      {errors.AverageKcal && (
        <p className="form-error">
          This field is required and should be whole numbers
        </p>
      )}
      <div className="mt-4 relative w-full">
        <label
          htmlFor="Image"
          className="flex flex-col items-center w-full border-2 border-gray-300 rounded-md text-blue-200 font-bold text-xl py-16 "
        >
          <FontAwesomeIcon icon={faUpload} />
          <span ref={labelSpanRef}>upload image</span>
        </label>
        <input
          className="absolute w-full border-2 h-full top-0 left-0 opacity-0 hover:cursor-pointer"
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
      />
      {errors.Content && <p className="form-error">This field is required</p>}
      <Button
        variant="darkBlue"
        hover="hoverLightBlue"
        size="fillWidth"
        className="rounded-xl py-4 mt-4"
        type="submit"
      >
        Submit
      </Button>
    </form>
  );
};

export default PostForm;
