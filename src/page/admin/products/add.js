import { add } from "../../../api/products";
import axios from "axios";
import Validator from '../../../utils/validator';

import toastr from "toastr";
import "toastr/build/toastr.min.css";


import HeaderAdmin from "../../../components/header_admin";
import NavAdmin from "../../../components/nav_admin";

const AddProduct = {
  render() {
    return /* html */ `
    ${HeaderAdmin.render()}
    <main class="app__admin flex flex-col md:flex-row">
    ${NavAdmin.render()}
    <div class='bg-gray-800 font-sans leading-normal tracking-normal mt-12 w-full'>
            <div>
                <div class="bg-gray-800 pt-3">
                    <div class="flex items-center justify-between rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
                        <h1 class="font-bold pl-2">Add Product</h1>
                        <a href="/admin/news/products" class="btn bg-white-800 rounded border py-2 px-3.5">
                        Back
                    </a>
                    </div>
                </div>
            </div>
            <div class="md:grid md:grid-cols-2 md:gap-6">
            <div class="mt-5 md:mt-0 md:col-span-2">
                <form action="#" method="" id='form'>
                    <div class="shadow sm:rounded-md sm:overflow-hidden">
                        <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                        <div class="">
                            <div class="col-span-3 sm:col-span-2">
                            <label for="name" class="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <div class="mt-1 flex rounded-md shadow-sm">
                                <input type="text" name="name" id="name" class="py-3 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="Name">
                            </div>
                            </div>
                        </div>
                        <div class="">
                            <div class="col-span-3 sm:col-span-2">
                            <label for="image" class="block text-sm font-medium text-gray-700">
                                Image
                            </label>
                            <div class="mt-1 flex rounded-md shadow-sm">
                                <input type="file" name="image" id="image" class="py-3 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="Title">
                            </div>
                            <img src="" class="imgPreview w-[5%] mx-[auto]"/>
                            </div>
                        </div>
                        <div class="">
                            <div class="col-span-3 sm:col-span-2">
                            <label for="image-model" class="block text-sm font-medium text-gray-700">
                                Image model
                            </label>
                            <div class="mt-1 flex rounded-md shadow-sm">
                                <input type="file" name="image-model" id="image-model" class="py-3 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="Image model">
                            </div>
                            <img src="" class="imgModalPreview w-[5%] mx-[auto]"/>

                            </div>
                        </div>
                        <div class="">
                            <div class="col-span-3 sm:col-span-2">
                            <label for="price" class="block text-sm font-medium text-gray-700">
                                Price
                            </label>
                            <div class="mt-1 flex rounded-md shadow-sm">
                                <input type="text" name="price" id="price" class="py-3 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="Price">
                            </div>
                            </div>
                        </div>
                        <div class="">
                            <div class="col-span-3 sm:col-span-2">
                                <label for="image-model" class="block text-sm font-medium text-gray-700">
                                    Category
                                </label>
                                <div>
                                    <input type="radio" class="category" name="drone" value="1">
                                    <label for="huey">Women's</label>
                                </div>
                                <div>
                                    <input type="radio" class="category" name="drone" value="2">
                                    <label for="huey">Men</label>
                                </div>
                            </div>
                        </div>
            
                        <div>
                            <label for="desc" class="block text-sm font-medium text-gray-700">
                            Description
                            </label>
                            <div class="mt-1">
                            <textarea id="desc" name="desc" rows="3" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="Description"></textarea>
                            </div>
                        </div>
                        </div>
                        <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                        <button type="submit" class="btn inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Save
                        </button>
                        </div>
                    </div>
                </form>
            </div>
            </div>
        </div>
      </div>
      </div>
      </main>
        `;
  },

  afterRender() {
    HeaderAdmin.afterRender();

    const btn = document.querySelector("#form");
    const imgPost = document.querySelector("#image");
    const imgModel = document.querySelector("#image-model");
    const categories = document.querySelectorAll(".category");
    const imgPreview = document.querySelector('.imgPreview');
    const imgModalPreview = document.querySelector('.imgModalPreview');
    
    let upImage;
    let upImageModel;
    let category;
    imgPost.addEventListener("change", async (e) => {
      const file = e.target.files[0]; 
      imgPreview.src = URL.createObjectURL(e.target.files[0]);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "bov8hqvd");
      const { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/nvquyet/image/upload",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-formendcoded",
          },
        }
      );
      upImage = data;
    });

    imgModel.addEventListener("change", async (e) => {
        const file = e.target.files[0]; 
        console.log(file);

        imgModalPreview.src = URL.createObjectURL(file);


        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "bov8hqvd");
        const { data } = await axios.post(
          "https://api.cloudinary.com/v1_1/nvquyet/image/upload",
          formData,
          {
            headers: {
              "Content-Type": "application/x-www-formendcoded",
            },
          }
        );
        upImageModel = data;
      });

    categories.forEach(cate=> {
        cate.addEventListener('click',(e)=> {
            category = e.target.value;
        })
    })

    btn.addEventListener("submit", async (e) => {
        e.preventDefault();
        try {
            await add({
                name: document.querySelector("#name").value,
                desc: document.querySelector("#desc").value,
                price: document.querySelector("#price").value,
                categoryId: Number(category),
                img: upImage.url,
                imgModel: upImageModel.url,
              });
              toastr.success('Successfully!');
              setTimeout(() => {
                  document.location.href = "/#/admin/products";
              }, 1000);
        } catch (error) {
            toastr.error(error.message);
        }
      });
  },
};
export default AddProduct;
