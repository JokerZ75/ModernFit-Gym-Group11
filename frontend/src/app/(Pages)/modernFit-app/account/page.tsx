import EditAccountForm from "./components/EditAccountForm";
import DeleteAccountForm from "./components/DeleteAccountForm";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { cookies } from "next/headers";
import axios from "axios";
import ProfileImage from "./components/ProfileImage";

type userType = {
  _id?: string;
  Access_pin?: number;
  Name: string;
  Email: string;
  Phone_number: number;
  Profile_picture?: string;
  Height: number;
  Weight: number;
  Branch_id: string;
  Gym_Goals: string;
};

const Account: React.FC = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("_auth_token")?.value;
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60,
      },
    },
  });

  await queryClient.prefetchQuery({
    queryKey: ["gymLocations"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/branch/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data as any[];
    },
  });

  const account = await queryClient.fetchQuery({
    queryKey: ["accountDetails"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data as userType;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="py-5 m-auto md:w-3/4">
        <div className="flex mx-4 flex-col m-auto justify-center md:flex-row">
          <div className="md:flex-col mb-5">
            <h1 className="text-4xl font-bold text-left text-blue-200">
              my account
            </h1>
            <p>
              This account and your activity diary is public to gym trainers and
              nutritionists.
            </p>
            <p className="md:hidden italic text-center">
              (click profile image to update it)
            </p>
            <ProfileImage />
            <h2 className="text-3xl font-bold text-left text-blue-200">
              access pin: {account?.Access_pin}
            </h2>
          </div>
          <div className="md:flex-col md:ml-8">
            <h2 className="text-3xl font-bold text-left text-blue-200 mb-2">
              details
            </h2>
            <div className="flex flex-col">
              <EditAccountForm />
              <DeleteAccountForm />
            </div>
          </div>
        </div>
      </main>
    </HydrationBoundary>
  );
};

export default Account;
