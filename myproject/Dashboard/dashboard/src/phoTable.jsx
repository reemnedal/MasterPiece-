import Tableuser from "./TableUSer";

function TablePho() {
    return (  


        <>
        <br />
    <div class="flex  items-center justify-center m-0 ">
  <div class="overflow-x-auto">
    <h1 className="text-2xl text-[#704e81]">Photographer Data</h1>
    <table class="min-w-full bg-white shadow-md rounded-xl ">
      <thead>
        <tr class="bg-blue-gray-100 text-gray-700">
          <th class="py-3 px-4 text-left">Photographer Name</th>
          <th class="py-3 px-4 text-left">Email</th>
          <th class="py-3 px-4 text-left">Password</th>
          <th class="py-3 px-4 text-left">Phone</th>
          <th class="py-3 px-4 text-left">Address</th>
        </tr>
      </thead>
      <tbody class="text-blue-gray-900">
        <tr class="border-b border-blue-gray-200">
          <td class="py-3 px-4">Alaa</td>
          <td class="py-3 px-4">alaa@gmail.com</td>
          <td class="py-3 px-4">1234</td>
          <td class="py-3 px-4">Amman</td>
          <td class="py-3 px-4">
            <a href="#" class="font-medium text-blue-600 hover:text-blue-800">Messages/Delete</a>
          </td>
        </tr>
        <tr class="border-b border-blue-gray-200">
          <td class="py-3 px-4">Rahaf</td>
          <td class="py-3 px-4">rahaf@gmail.com</td>
          <td class="py-3 px-4">12234</td>
          <td class="py-3 px-4">Zarqaa</td>
          <td class="py-3 px-4">
            <a href="#" class="font-medium text-blue-600 hover:text-blue-800">Messages/Delete</a>
          </td>
        </tr>
        <tr class="border-b border-blue-gray-200">
          <td class="py-3 px-4">Rana</td>
          <td class="py-3 px-4">rana@gmail.com</td>
          <td class="py-3 px-4">1234</td>
          <td class="py-3 px-4">Amman</td>
          <td class="py-3 px-4">
            <a href="#" class="font-medium text-blue-600 hover:text-blue-800">Messages/Delete</a>
          </td>
        </tr>
         <tr class="border-b border-blue-gray-200">
          <td class="py-3 px-4 font-medium">Total Photographers</td>
          <td class="py-3 px-4"></td>
          <td class="py-3 px-4"></td>
          <td class="py-3 px-4 font-medium">3</td>
          <td class="py-3 px-4"></td>
        </tr>
      </tbody>
    </table>
    <div class="w-full pt-5 px-4 mb-8 mx-auto ">
      <div class="text-sm text-gray-700 py-1 text-center">
       </div>
    </div>
  </div>
</div>
<Tableuser/>
        
        </>
    );
}

export default TablePho;


