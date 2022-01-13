import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";
import styled from "styled-components";
import { idText } from "typescript";

/*
const [toDos, setToDos] = useRecoilState(toDoState);
    const {
        register,
        handleSubmit,
        formState:{errors},
        setValue
    } = useForm<IForm>()
    const handleValid = ({toDo}:IForm) => {
        setToDos(oldToDos => [{text:toDo, id:Date.now(), category:"TO_DO"},...oldToDos])
        setValue("toDo","");
    } //데이터가 유효할 때 호출되는 다른 함수
*/

interface IForm {
    toDo:string;
}

interface IToDo {
    text:string;
    id: number;
    category:"TO_DO"|"DONE"|"DOING";
}

const Error = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    padding:10px 0;
    padding-bottom:0;
    color: ${props => props.theme.textColor};
    font-size:18px;
`;

const InputTodo = styled.input`
    border:0;
    border-radius:15px;
    min-width:350px;
    height:30px;
    background-color:#e6fdfd;
    color: blue;
    padding-left:15px;
`
const AddButton = styled.button`
    border:0;
    margin:0 10px;
    border-radius:15px;
    min-width:80px;
    height:25px;
    &:hover {
        cursor:pointer;
    }
`;

const TodoForm = styled.form`
    padding:10px;
`

function CreateToDo() {
    const { register, handleSubmit, setValue, formState:{errors} } = useForm();
    const category = useRecoilValue(categoryState);
    const setToDo = useSetRecoilState(toDoState);
    const handleValid = ({toDo}:IForm) => {
        const newTodo = {text:toDo, id:Date.now(), category};
        setToDo(oldToDos => {
            const allTodos = [...oldToDos, newTodo];
            const stringifyTodos = JSON.stringify(allTodos);
            localStorage.setItem("ToDos", stringifyTodos);
            return allTodos;
        });
        setValue("toDo","");
    }
    return (
        <TodoForm onSubmit={handleSubmit(handleValid)}>
            <InputTodo {...register("toDo", {
                required: "Please write a to Do",
                minLength: {
                    value: 5,
                    message: "To Do should be longer than 5"
                }
            })} placeholder="Write a to do" />
            <AddButton >Add</AddButton><br/>
            <Error>{errors?.toDo?.message}</Error>
        </TodoForm>
    );
}

/*
interface ILogin {
    id:string;
    pw:string;
    name:string;
    age:number;
    email:string;
}

export function LoginForm() {
    const {register, handleSubmit, setValue, setError, formState:{errors}} = useForm<ILogin>();
    const handleValid = (data:ILogin) => {
        if (data.id.length > 20) {
            return setError("id", {message:"ID is too long"}, {shouldFocus:true});
        }
    };
    return (
        <TodoForm onSubmit={handleSubmit(handleValid)}>
            <InputTodo {...register("id", {
                required:"ID is Required",
                minLength: {
                    value:7,
                    message:"ID must be longer than 7 words"
                },
                validate: {
                    noSwear: (value)=> value.includes('fuck')?"Not allowed Swear in ID":true,
                    noNico: (value) => value.includes('nico')?"Not allowed NICO in ID":true
                }
            })}/>
            <InputTodo {...register("pw", {
                required:"pw is Required",
                minLength: {
                    value:10,
                    message:"pw must be longer than 7 words"
                },
                validate: {
                    noSwear: (value)=> value.includes('fuck')?"Not allowed Swear in ID":true,
                    noNico: (value) => value.includes('nico')?"Not allowed NICO in ID":true
                }
            })}/>
        </TodoForm>
    );
}
*/

export default CreateToDo;