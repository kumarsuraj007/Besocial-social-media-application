import { useContext } from "react";
import { UserContext } from "../../context/user.context";

const Profile = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <div class="flex h-screen w-full justify-center pt-[50px]">
      <div class="w-[160vh]">
        <div class="shadow-sm rounded-lg py-3">
          <div class="md:w-[100vh] w-[50vh] photo-wrapper p-2 flex mx-auto justify-around">
            <img
              class=" object-contain md:w-[300px] md:h-[300px] h-[150px] w-[150px] border-2 rounded-full"
              src={currentUser?.photo}
            />
            <h3 class="md:text-5xl text-2xl text-gray-900 font-medium leading-8 flex items-center">
              {currentUser?.username}
            </h3>
          </div>
        </div>
        <div className=" mt-10 flex flex-wrap md:px-4 px-5 gap-4">
            <img className="h-[200px] object-contain rounded-md" src="https://images.unsplash.com/photo-1687360441470-6c9b3807749d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1931&q=80" alt="" />
            <img className="h-[200px] object-contain rounded-md" src="https://images.unsplash.com/photo-1687360441470-6c9b3807749d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1931&q=80" alt="" />
            <img className="h-[200px] object-contain rounded-md" src="https://images.unsplash.com/photo-1687360441470-6c9b3807749d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1931&q=80" alt="" />
           
        </div>
      </div>
    </div>
  );
};

export default Profile;
