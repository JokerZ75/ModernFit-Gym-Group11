"use client";

import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useForm, FieldValues, UseFormRegister } from "react-hook-form";

interface props extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
  options: string[];
  register: UseFormRegister<FieldValues>;
  className?: string;
  fetchedData?: string;
}

const AutoComplete: React.FC<props> = ({
  children,
  register,
  options,
  className,
  fetchedData,
  ...props
}) => {
  const [option, setOption] = React.useState<string[]>(options);
  const [display, setDisplay] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkIfClickedOutside = (ev: MouseEvent) => {
      if (
        display &&
        ref.current &&
        !ref.current.contains(ev.target as HTMLDivElement)
      ) {
        setDisplay(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [display, ref]);

  useEffect(() => {
    if (fetchedData) {
      setSearch(fetchedData);
    }
  }, [fetchedData]);

  return (
    <>
      <div ref={ref} className="relative">
        <input
          className={className}
          {...register}
          {...props}
          onClick={() => setDisplay(true)}
          onChange={(e) => {
            setSearch(e.target.value);
            setDisplay(true);
          }}
          value={search}
        />
        {display && (
          <div className="absolute z-10 w-full bg-white border-2 rounded-lg rounded-t-none -mt-1 border-gray-300">
            {option
              .filter((options) => {
                if (search === "") {
                  return options;
                } else if (
                  options.toLowerCase().includes(search.toLowerCase())
                ) {
                  return options;
                }
              })
              .map((option, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      setSearch(option);
                      setDisplay(false);
                    }}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                  >
                    {option}
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </>
  );
};

export default AutoComplete;
