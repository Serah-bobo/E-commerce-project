import { useForm } from 'react-hook-form';
import { useState } from 'react';
//details interface
interface formData{
    phone:string;
    firstName?:string;
    lastName:string;
    address:string;
    postalCode?:string;
    country:string;
    city:string;
    billAddress?:string;
}

const CheckoutPage = () => {
        const {
            reset,
            handleSubmit,
            register,
            setValue,
            formState:{errors,isSubmitting}
        }=useForm<formData>({
            defaultValues:{
                country:"Kenya"
            },
            mode:"onTouched"
        })
        const [sameBilling,setSameBilling]=useState(true);
        //handle submit function
        const onSubmit=async(data:formData)=>{
            console.log("data",data)
            await new Promise((resolve)=>
                setTimeout(resolve,2000))
            reset();
        }
  return (
   <>
    <div className="p-6">
         {/*phone*/}
            <h2 className="mb-2 text-xl font-semibold">Contact</h2>
      <input
        {...register("phone", 
            { required: "Phone number is required", 
                pattern: 
                { value: /^07\d{8}$/,
                 message: "Invalid phone number" } })}
                 type="text"
                placeholder="Phone Number (07xxxxxxxx)"
                className="w-full p-2 mb-1 border rounded"
      />
      {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
        </div>
                 {/*country*/}
                 <div className='p-6'>
                 <h2 className="mt-1 mb-4 text-xl font-semibold">Delivery</h2>
                    <select {...register("country")} 
                    className="w-full p-2 mb-4 border rounded">
                    <option value="Kenya">Kenya</option>
                    </select>
                 </div>
            
            {/*name*/}
            <div className="grid grid-cols-2 gap-4 p-6">
        <input {...register("firstName")} 
        type="text" placeholder="First name (optional)" 
        className="p-2 border rounded" />
        <input {...register("lastName",
             { required: "Last name is required" })} 
             type="text" placeholder="Last name" 
             className="p-2 border rounded" />
      </div>
      {errors.lastName && <p className="text-sm text-red-500">{errors.lastName.message}</p>}
            {/*address*/}
            <div className='p-6'>
            <input {...register("address", 
                { required: "Address is required" })}
                 type="text" placeholder="Address" 
                 className="w-full p-2 my-2 border rounded" />
            {errors.address && <p className="text-sm text-red-500">{errors.address.message}</p>}
            </div>
            
                {/*address*/}
                <div className="grid grid-cols-2 gap-4 p-6">
                <input {...register("city", 
                    { required: "City is required" })} 
                    type="text" placeholder="City" 
                    className="p-2 border rounded" />
                <input {...register("postalCode")}
                 type="text" 
                 placeholder="Postal code (optional)"
                  className="p-2 border rounded" />
            </div>
            {errors.city && <p className="text-sm text-red-500">{errors.city.message}</p>}
                    {/*billing*/}
                    <label className="flex items-center p-6 my-4">
                    <input
                    type="checkbox"
                    className="mr-2"
                    onChange={() => {
                        setSameBilling(!sameBilling);
                        if (!sameBilling) setValue("billAddress", "");
                    }}
                    checked={sameBilling}
                    />
                    Billing address same as shipping
                </label>
                    {/*billing grid*/ }
                    {!sameBilling && (
                    <div>
                    <h2 className="mb-4 text-xl font-semibold">Billing Address</h2>
                     {/*country*/}
                 <div className='p-6 mt-1'>
                 <h2 className="mb-4 text-xl font-semibold">Delivery</h2>
                    <select {...register("country")} 
                    className="w-full p-2 mb-4 border rounded">
                    <option value="Kenya">Kenya</option>
                    </select>
                 </div>
             {/*name*/}
             <div className="grid grid-cols-2 gap-4 p-6">
        <input {...register("firstName")} 
        type="text" placeholder="First name (optional)" 
        className="p-2 border rounded" />
        <input {...register("lastName",
             { required: "Last name is required" })} 
             type="text" placeholder="Last name" 
             className="p-2 border rounded" />
      </div>
      {errors.lastName && <p className="text-sm text-red-500">{errors.lastName.message}</p>}
            {/*address*/}
            <div className='p-6'>
            <input {...register("address", 
                { required: "Address is required" })}
                 type="text" placeholder="Address" 
                 className="w-full p-2 my-2 border rounded" />
            {errors.address && <p className="text-sm text-red-500">{errors.address.message}</p>}
            </div>
            
                {/*address*/}
                <div className="grid grid-cols-2 gap-4 p-6">
                <input {...register("city", 
                    { required: "City is required" })} 
                    type="text" placeholder="City" 
                    className="p-2 border rounded" />
                <input {...register("postalCode")}
                 type="text" 
                 placeholder="Postal code (optional)"
                  className="p-2 border rounded" />
            </div>
            {errors.city && <p className="text-sm text-red-500">{errors.city.message}</p>}
                    </div>
                )}
      
            <button
                onClick={handleSubmit(onSubmit)}
                className="w-full p-2 mt-4 text-white bg-blue-500 rounded disabled:opacity-50"
                disabled={isSubmitting}
            >
                {isSubmitting ? "Processing..." : "Complete Order"}
            </button>
   </>
   
    
                 
  )
}

export default CheckoutPage

