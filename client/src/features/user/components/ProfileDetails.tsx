import { useEffect, useState } from "react";
import InfoField from "./InfoField";
import InputField from "./InputField";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import type { EditUserInput, PublicUser } from "../../../types/user";
import { updateUser } from "../userState/user.thunk";
import { validateEditInputs } from "../user.validation";
import { showToast } from "../../toastSlice";
import {updateUserByAdmin} from '../userState/admin.thunk' 

/* --------------------- Profile Details --------------------- */

const ProfileDetails = ({user}:{user:PublicUser}) => {

  const isAdmin = useAppSelector(state=>state.user.data?._id !== user._id)

  const {updateError}=useAppSelector(state=>state.user)
  const [isEdit, setEdit] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
  const dispatch = useAppDispatch()
  const [form, setForm] = useState<EditUserInput>({
    name:"",
    email:"",
    phone:""
  });
  const [errors, setErrors] = useState<EditUserInput>({
    name:'',
    email:"",
    phone:""
  });
    
  useEffect(()=>{
    if(!user) return
    const setUser=()=>{
      setForm({
        name:user.name??'',
        email:user.email??'',
        phone:user.phone??''
      })
    }
    setUser()
  },[user])

  const handleEdit = async () =>{
    setSubmitted(true)
    const validationErrors = validateEditInputs(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    if(isAdmin){
      const result = await dispatch(updateUserByAdmin({data:form,userId:user._id}));
      if (updateUserByAdmin.fulfilled.match(result)) setEdit(false)
        else dispatch(showToast(updateError||'User updation failed','error'))  
    }else{
      const result = await dispatch(updateUser(form));
      if (updateUser.fulfilled.match(result)) setEdit(false)
        else dispatch(showToast(updateError||'User updation failed','error'))  
    }
  }

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;

  const nextForm = {
    ...form,
    [name]: value,
  };

  setForm(nextForm);

  if (isSubmitted) {
    const validationErrors = validateEditInputs(nextForm);
    setErrors(validationErrors);
  }
};

  return (
    <div
      className="bg-linear-to-br from-purple-950/50 via-indigo-950/50 to-gray-950/70
               backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl
               p-12"
    >
      <h2 className="text-3xl font-semibold mb-10 bg-linear-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
        {`${isEdit?"Update Profile":"Profile Information"}`}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
        {isEdit ? (
          <>
            <InputField error={errors.name} onChange={handleChange} name="name" type='text' label="Full Name" value={form.name} />
            <InputField error={errors.email} onChange={handleChange} name="email" type='email' label="Email Address" value={form.email} />
            <InputField error={errors.phone} onChange={handleChange} name="phone" type='phone' label="Phone Number" value={form.phone} />
          </>
        ) : (
          <>
            <InfoField label="Full Name" value={user?.name} />
            <InfoField label="Email Address" value={user?.email} />
            <InfoField label="Phone Number" value={user?.phone} />
          </>
        )}
        <InfoField label="Role" value={user?.role} capitalize />
        <InfoField label="Account Status" value={user?.status} capitalize />
        <InfoField
          label="Last Updated"
          value={
            user?.updatedAt
              ? new Date(user.updatedAt).toLocaleString("en-GB", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })
              : "—"
          }
        />
      </div>
      <div className="mt-10 pt-6 border-t border-white/10 text-sm text-gray-400">
        <div className="flex justify-end gap-2">
          {!isEdit ? (
            <button
              onClick={() => setEdit(true)}
              className="bg-purple-700 p-3 rounded text-white font-bold"
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={()=>setEdit(false)}
              className="border border-purple-700 py-3 px-7 rounded text-white font-bold">
                Cancel
                </button>
              <button
                onClick={handleEdit}
                className="bg-purple-700 py-3 px-7 rounded text-white font-bold"
              >
                Save
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
