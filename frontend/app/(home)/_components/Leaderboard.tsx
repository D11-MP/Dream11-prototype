export default function Leaderboard() {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md max-w-sm">
      <p className="text-gray-400 text-sm pb-1">Leaderboard</p>
      <div className="flex justify-evenly items-end mt-2">
        <div className="flex flex-col w-1/3 px-2">
          <div className="flex flex-col items-center">
            <img
              src="https://via.placeholder.com/50"
              alt="avatar"
              className="rounded-full"
            />
            <div>Name</div>
          </div>
          <div className="h-20 rounded-t-2xl bg-gradient-to-t from-grayGradient2 to-grayGradient w-full mt-auto text-center pt-4">
            <strong className="text-lg text-gray-600">2nd</strong>
            <p className="text-xs pt-2">Rs 30,000</p>
          </div>
        </div>

        <div className="flex flex-col w-1/3 px-2">
          <div className="flex flex-col items-center">
            <img
              src="https://via.placeholder.com/50"
              alt="avatar"
              className="rounded-full"
            />
            <div>Name</div>
          </div>
          <div className="h-24 rounded-t-2xl bg-gradient-to-t from-yellowGradient to-yellowGradient2 w-full mt-auto text-center pt-6">
            <strong className="text-lg text-yellow-600">1st</strong>
            <p className="text-xs pt-4">Rs 50,000</p>
          </div>
        </div>

        <div className="flex flex-col w-1/3 px-2">
          <div className="flex flex-col items-center">
            <img
              src="https://via.placeholder.com/50"
              alt="avatar"
              className="rounded-full"
            />
            <div>Name</div>
          </div>
          <div className="h-16 rounded-t-2xl bg-gradient-to-t from-redGradient to-redGradient2 w-full mt-auto text-center pt-2">
            <strong className="text-lg text-red-700">3rd</strong>
            <p className="text-xs">Rs 10,000</p>
          </div>
        </div>
      </div>
      <p className="py-4 text-center text-gray-700 text-sm">
        Leaderboard of the last Match
      </p>
    </div>
  );
}
