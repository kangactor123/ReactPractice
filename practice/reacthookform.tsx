import React, { useState } from "react";
import {useForm} from "react-hook-form";
import styled from "styled-components";

/* function ToDoList() {
    const [toDo, setToDo] = useState("");
    const [toDoError, setToDoError] = useState("");
    const onChange = (event:React.FormEvent<HTMLInputElement>) => {
        const {currentTarget: {value}} = event;
        setToDo(value);
        setToDoError("");
    };
    const onSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (toDo.length < 10) {
            return setToDoError("To do should be longer");
        }
        console.log("submit");
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} value={toDo} placeholder="Write a to do" />
                <button >Add</button>
                {toDoError !== "" ? toDoError : null}
            </form>
        </div>

    );
} */

interface IForm {
    email:string;
    lastName:string;
    userName:string;
    firstName:string;
    password:string;
    password1:string;
    extraError?:string;
}

const ErrorMessage = styled.span`
    color:red;
    font-size:16px;
`

//register : onChange, state
//watch() : 변하는 값을 추적할 수 있다.
function ToDoList() {
    const {register, handleSubmit, formState:{errors}, setError} = useForm<IForm>({
        defaultValues: {
            email:"@naver.com"
        }
    });
    const onValid = (data:IForm)=>{
        if (data.password !== data.password1) {
            return setError("password1", {message:"Password is not the same."},{shouldFocus:true});
        }
        setError("extraError", {message:"Server offline"})
    };
    return (
        <div>
            <form style={{display:"flex",flexDirection:"column"}} onSubmit={handleSubmit(onValid)}>
                <input {...register("email", 
                {   required:"Email is required",
                    pattern:{
                        value:/^[A-Za-z0-9._%+-]+@naver.com$/,
                        message:"Only naver.com emails allowed"
                    }
                })} 
                placeholder="Email"/>
                <ErrorMessage>
                    {errors?.email?.message}
                </ErrorMessage>
                <input {...register("firstName",
                {   required:"First name is required",
                    validate: {
                        noNico: (value) => value.includes('nico')?`${value} is not validated`:true,
                        noSwear: (value) => value.includes('fuck')?`Swear are now allowed`:true,
                    }
                })} placeholder="FirstName"/>
                <ErrorMessage>
                    {errors?.firstName?.message}
                </ErrorMessage>
                <input {...register("lastName", {required:"Last name is required"})} placeholder="LastName"/>
                <ErrorMessage>
                    {errors?.lastName?.message}
                </ErrorMessage>
                <input {...register("userName", {required:"Username is required", minLength:10})} placeholder="UserName"/>
                <ErrorMessage>
                    {errors?.userName?.message}
                </ErrorMessage>
                <input {...register("password", 
                {   required:"password is required", 
                    minLength:{
                        value:5,
                        message:"should be longer than 5"
                    
                }})} 
                placeholder="Password"/>
                 <ErrorMessage>
                    {errors?.password?.message}
                </ErrorMessage>
                <input {...register("password1", 
                {   required:"password is required", 
                    minLength:{
                        value:5,
                        message:"should be longer than 5"
                }})} 
                placeholder="Password1"/>
                 <ErrorMessage>
                    {errors?.password1?.message}
                </ErrorMessage>
                <button >Add</button>
                <ErrorMessage>
                    {errors?.extraError?.message}
                </ErrorMessage>
            </form>
        </div>

    );
}

export default ToDoList;
