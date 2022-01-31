import { useForm } from "react-hook-form";
import styled from "styled-components";

const Error = styled.span`
  color: red;
`;
// import { useForm } from "react-hook-form";

// function ToDoList() {
//   const [toDo, setToDo] = useState("");
//   const [toDoError, setToDoError] = useState("");
//   const onChange = (event: React.FormEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = event;
//     setToDo(value);
//     setToDoError("");
//   };
//   const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     if (toDo.length < 10) {
//       return setToDoError("To Do should be longer");
//     }
//     console.log("submit");
//   };
//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input onChange={onChange} value={toDo} placeholder="Write a to do" />
//         <button>Add</button>
//         {toDoError !== "" ? toDoError : null}
//       </form>
//     </div>
//   );
// }

interface IForm {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  password1: string;
  extraError?: string;
}

//watch : form의 입력값들의 변화를 관찰 할 수 있게 해주는 함수
//handleSubmit : validation
//useForm({defaultValues:{~~~}})
//setError
function ToDoList() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    },
  });
  //유효성 검사해주는 함수 (handleSubmit의 매개변수로 넘어감)
  //validation을 custom 하는 방법 setError()
  const onValid = (data: IForm) => {
    if (data.password !== data.password1) {
      setError(
        "password1",
        { message: "Password are not the same" },
        { shouldFocus: true }
      );
      //input에 바로 focus {shouldFocus:true}
    }
    setError("extraError", { message: "server down" });
  };
  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("email", {
            required: "email required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "@naver.com ok",
            }, //정규식으로 패턴검사
          })}
          placeholder="Email"
        />
        <Error>{errors?.email?.message}</Error>
        <input
          {...register("firstName", {
            required: "first name is required",
            validate: {
              //유효성 검사 (객체로 넘겨줄 수 있음)
              noNico: (value) =>
                !value.includes("nico") ? true : "nico is not allowed",
              noDonghee: (value) =>
                !value.includes("donghee") ? true : "donghee is not allowed",
            },
          })}
          placeholder="First Name"
        />
        <Error>{errors?.firstName?.message}</Error>

        <input
          {...register("lastName", {
            required: true,
            minLength: { value: 10, message: "min Legth" },
          })}
          placeholder="Last Name"
        />
        <Error>{errors?.lastName?.message}</Error>

        <input
          {...register("username", { required: true })}
          placeholder="Username"
        />
        <Error>{errors?.username?.message}</Error>

        <input
          {...register("password", { required: true })}
          placeholder="Password"
        />
        <Error>{errors?.password?.message}</Error>

        <input
          {...register("password1", { required: true })}
          placeholder="Password1"
        />
        <Error>{errors?.password1?.message}</Error>
        <button>Add</button>
        <Error>{errors?.extraError?.message}</Error>
      </form>
    </div>
  );
}

export default ToDoList;
