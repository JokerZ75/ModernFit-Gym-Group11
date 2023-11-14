export default function Account(){
    return (
        <div className="py-5 m-auto md:w-3/4">
            <div className="flex mx-4 flex-col m-auto justify-center md:flex-row gap-10">
            <div className="md:flex-col">
            <h1 className="text-4xl text-left text-sky-300" >My account</h1>
            <p>This account and your activity diary is public to gym trainers and nutritionists.</p>
            <img src="https://placehold.co/200x200" className="block rounded-full m-4 ml-auto mr-auto " alt="account profile picture" />
            <h2 className="text-2xl text-left text-sky-300">Access pin: xxxxxxx</h2>
            </div>
            <div className="md:flex-col">
            <h2 className="text-2xl text-left text-sky-300">Details</h2>
            <div className="">
            <form className="flex flex-col">
                <input className = "form_acc md:h-8"type="text" placeholder="Gym location" />
                <input className = "form_acc md:h-8" type="text" placeholder="Name" />
                <input  className = "form_acc md:h-8"type="text" placeholder="Email" />
                <input  className = "form_acc md:h-8"type="text" placeholder="Phone number" />
                <input  className = "form_acc md:h-8"type="text" placeholder="Height (cm)" />
                <input  className = "form_acc md:h-8"type="text" placeholder="Weight (lbs)" />
                <input  className = "form_acc md:h-8"type="text" placeholder="Gym goals" />
                
                <input className="bg-blue-400 text-xl rounded-lg px-36 py-10 m-2 text-center text-white hover: cursor-pointer md:py-5" type="submit" value="Save" />
                
            </form>
            <form className="flex flex-col">
                <input  className = "form_acc md:h-8    " type="text" placeholder="Username (type to delete)" />
                
                <input className="bg-orange-600 text-xl rounded-lg px-36 py-10 m-2 text-white hover: cursor-pointer md:py-5" type="submit" value="Delete" />
            
            </form>
            </div>
            </div>
            </div>
        </div>

    )
}