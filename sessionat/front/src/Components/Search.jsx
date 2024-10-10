function Search() {
    return (  

        <>

        <div class=" m-32 ">
                <div class=" transition duration-500 ease-in-out transform scale-100 translate-x-0 translate-y-0 opacity-100">
            <div class="mb-12 space-y-5 md:mb-16 md:text-center">
                <div
                    class="inline-block px-3 py-1 text-sm font-semibold text-[#704e81] rounded-lg md:text-center text-cn bg-[ #704e81] bg-opacity-60 hover:cursor-pointer hover:bg-opacity-40">
                 </div>
                <h1 class="mb-5 text-3xl font-semibold text-[#704e81] md:text-center md:text-5xl">
                   Find Your Favourite Photographer
                </h1>
                <p class="text-xl text-[#704e81] md:text-center md:text-2xl">
                Explore Our Network of Professional Photographers
                 </p>
            </div>
        </div>

        <div class="max-w-2xl mx-auto ">

	<form class="flex items-center">   
        <label for="simple-search" class="sr-only">Search</label>
        <div class="relative w-full">
            <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
            </div>
            <input type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required/>
        </div>
        <button type="submit" class="p-2.5 ml-2 text-sm font-medium text-white bg-[#704e81] rounded-lg border border-[#704e81] hover:bg-[#704e81] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></button>
    </form>

	 
    <script src="https://unpkg.com/flowbite@1.4.0/dist/flowbite.js"></script>
</div>
</div>
        </>
    );
}

export default Search;