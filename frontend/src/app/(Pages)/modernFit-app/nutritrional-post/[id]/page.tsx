"use client";
import React, { useState } from 'react';
import { HydrationBoundary, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from 'axios';
import { cookies } from "next/headers";

const NutritionPost: React.FC<{ params: { id: string } }> = ({ params }) => {
  const cookieStore = cookies();
  const token = cookieStore.get("_auth_token")?.value;
  const queryClient = useQueryClient();

  const { data: post } = useQuery({
    queryKey: ["nutritional_post", params.id],
    queryFn: async () => {
      const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/nutritional_post/post/${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );
      return data;
    },
  });

  const { data: categories } = useQuery<string[]>({
    queryKey: ["mealcategories", params.id],
    queryFn: async () => {
      const { data } = await axios.get<string[]>(
          `${process.env.NEXT_PUBLIC_API_URL}/mealcategory/nutritional_post/${post?.category}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );
      return data;
    },
  });

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    averageKcal: 0,
    content: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // endpoint
  };

  return (
      <HydrationBoundary>
        <div>
          <h1>Nutritional Information</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Title</label>
              <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div>
              <label>Category</label>
              <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="">Select Category</option>
                {categories?.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                ))}
              </select>
            </div>
            <div>
              <label>Average Kcal</label>
              <input
                  type="number"
                  value={formData.averageKcal}
                  onChange={(e) => setFormData({ ...formData, averageKcal: Number(e.target.value) })}
              />
            </div>
            <div>
              <label>Content</label>
              <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              />
            </div>
            <button type="submit">Submit</button>
          </form>

          <div>
            {post && (
                <div key={post.id}>
                  <h2>{post.title}</h2>
                  <p>Category: {post.category}</p>
                  <p>Average Kcal: {post.averageKcal}</p>
                  <p>{post.content}</p>
                </div>
            )}
          </div>
        </div>
      </HydrationBoundary>
  );
};

export default NutritionPost;
