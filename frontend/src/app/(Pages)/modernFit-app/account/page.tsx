import { Button } from "@/app/components/UI/Button";
import EditAccountForm from "./components/EditAccountForm";
import AutoComplete from "@/app/components/UI/AutoComplete";

const Account: React.FC = () => {
  return (
    <main className="py-5 m-auto md:w-3/4">
      <div className="flex mx-4 flex-col m-auto justify-center md:flex-row">
        <div className="md:flex-col mb-5">
          <h1 className="text-4xl font-bold text-left text-blue-200">my account</h1>
          <p>
            This account and your activity diary is public to gym trainers and
            nutritionists.
          </p>
          <img
            src="https://placehold.co/200x200"
            className="block rounded-full m-4 ml-auto mr-auto "
            alt="account profile picture"
          />
          <h2 className="text-3xl font-bold text-left text-blue-200">
            access pin: xxxxxxx
          </h2>
        </div>
        <div className="md:flex-col">
          <h2 className="text-3xl font-bold text-left text-blue-200 mb-2">details</h2>
          <div className="">
            <EditAccountForm />
            <AutoComplete />
            <form className="flex flex-col">
              <input
                className="form_acc md:h-8    "
                type="text"
                placeholder="Username (type to delete)"
              />
              <input
                className="bg-orange-600 text-xl rounded-lg px-36 py-10 m-2 text-white hover: cursor-pointer md:py-5"
                type="submit"
                value="Delete"
              />
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Account;
