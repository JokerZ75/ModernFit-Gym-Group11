export default function Nutriinfo(){
    return (
        <div className="flex m-auto flex-col">
            <h1 className="m-auto text-4xl text-sky-300">Info categories</h1>
            <div className="flex justify-center m-auto md:flex-row flex-wrap">
            <p className="p-16 m-10 text-2xl text-center w-2/3 text-cyan-50 bg-opacity-80 bg-blue-400 rounded-3xl md:w-1/3 md:text-3xl">Meats</p>
            <p className="p-16 m-10 text-2xl text-center w-2/3 text-cyan-50 bg-opacity-80 bg-gray-400 rounded-3xl md:w-1/3 md:text-3xl">Grains, nuts and seeds</p>
            <p className="p-16 m-10 text-2xl text-center w-2/3 text-cyan-50 bg-opacity-80 bg-orange-400 rounded-3xl md:w-1/3 md:text-3xl">Dairys</p>
            <p className="p-16 m-10 text-2xl text-center w-2/3 text-cyan-50 bg-opacity-80 bg-green-400 rounded-3xl md:w-1/3 md:text-3xl">Seafoods</p>
            <p className="p-16 m-10 text-2xl text-center w-2/3 text-cyan-50 bg-opacity-80 bg-red-400 rounded-3xl md:w-1/3 md:text-3xl">Fruits</p>
            <p className="p-16 m-10 text-2xl text-center w-2/3 text-cyan-50 bg-opacity-80 bg-pink-400 rounded-3xl md:w-1/3 md:text-3xl">Eggs</p>
            <p className="p-16 m-10 text-2xl text-center w-2/3 text-cyan-50 bg-opacity-80 bg-purple-400 rounded-3xl md:w-1/3 md:text-3xl">Vegetables</p>

            </div>
        </div>
    )
    }