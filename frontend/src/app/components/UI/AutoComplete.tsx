"use client";

import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useForm, FieldValues, UseFormRegister } from "react-hook-form";
import { cn } from "@/app/utils/classMerge";

interface props extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
  options: string[];
  register: UseFormRegister<FieldValues>;
  className?: string;
  containerDivClassName?: string;
  fetchedData?: string;
  extraOnChangeFn?: (value: string) => void;
}

const AutoComplete: React.FC<props> = ({
  children,
  register,
  options,
  className,
  containerDivClassName,
  fetchedData,
  extraOnChangeFn,
  ...props
}) => {
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
      <div ref={ref} className={cn("relative", containerDivClassName)}>
        <input
          className={className}
          {...register}
          {...props}
          onClick={() => setDisplay(true)}
          onChange={(e) => {
            setSearch(e.target.value);
            setDisplay(true);
            if (extraOnChangeFn) {
              extraOnChangeFn(e.target.value);
            }
          }}
          value={search}
        />
        {display && (
          <div className="absolute z-10 w-full bg-white border-2 rounded-lg rounded-t-none -mt-1 border-gray-300 max-h-[200px] overflow-y-scroll">
            {options
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
                      extraOnChangeFn && extraOnChangeFn(option);
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
